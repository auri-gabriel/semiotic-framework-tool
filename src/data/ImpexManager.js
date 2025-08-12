import definitionsXML from '../assets/definitions/definitions.xml?raw';

export function exportAnswersAsXML(answers) {
  // answers: { [questionId]: answer }
  const answersXML = `<answers>\n${Object.entries(answers)
    .map(
      ([k, v]) =>
        `  <answer id="${k}">${String(v).replace(
          /[<>&]/g,
          (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])
        )}</answer>`
    )
    .join('\n')}\n</answers>`;

  // Remove XML declaration from definitions if present
  const cleanedDefinitions = definitionsXML.replace(/<\?xml.*?\?>\s*/i, '');

  // Compose final XML with declaration, definitions, and answers
  const data =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<exported-semiotic-framework>\n` +
    cleanedDefinitions.trim() +
    '\n' +
    answersXML +
    '\n</exported-semiotic-framework>';

  return {
    data,
    mimeType: 'application/xml',
    fileName: 'answers.xml',
  };
}

export function importAnswersFromXML(xmlString) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'application/xml');
  const answerNodes = xml.getElementsByTagName('answer');
  const imported = {};
  for (let node of answerNodes) {
    imported[node.getAttribute('id')] = node.textContent;
  }
  return imported;
}

export async function exportSemioticLadderDoc({
  grouping,
  answers,
  onlyAnswered,
  language,
  format = 'pdf',
}) {
  if (format === 'pdf') {
    const jsPDFModule = await import('jspdf');
    // Vite/ESM: use .default
    const jsPDF = jsPDFModule.default;
    const doc = new jsPDF();

    // PDF configuration
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;

    const title = language === 'pt_BR' ? 'Escada Semiótica' : 'Semiotic Ladder';

    // Helper function to add text with word wrapping
    function addWrappedText(text, x, y, maxWidth, fontSize = 12) {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + lines.length * (fontSize * 0.35); // Return new Y position
    }

    // Helper function to check if we need a new page
    function checkPageBreak(currentY, neededHeight = 15) {
      if (currentY + neededHeight > pageHeight - margin) {
        doc.addPage();
        return margin + 10; // Reset Y position with top margin
      }
      return currentY;
    }

    // Add title
    let y = margin + 10;
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(title, margin, y);
    doc.setFont(undefined, 'normal');
    y += 15;

    // Add a line under the title
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Process groups
    Object.entries(grouping).forEach(([groupId, groupProps]) => {
      y = checkPageBreak(y, 25);

      // Group title
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      y = addWrappedText(
        groupProps.tag.names[language],
        margin,
        y,
        maxWidth,
        16
      );
      doc.setFont(undefined, 'normal');
      y += 5;

      // Process steps within group
      Object.entries(groupProps.steps).forEach(([stepId, stepProps]) => {
        y = checkPageBreak(y, 20);

        // Step title
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        y = addWrappedText(
          stepProps.tag.names[language],
          margin + 5,
          y,
          maxWidth - 5,
          14
        );
        doc.setFont(undefined, 'normal');
        y += 3;

        // Process questions within step
        stepProps.questions.forEach((q) => {
          const answer = answers[q.id];
          if (!onlyAnswered || answer) {
            y = checkPageBreak(y, 25);

            // Question text
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            const questionText = q.texts[language] || q.texts.en;
            y = addWrappedText(
              `${questionText}`,
              margin + 10,
              y,
              maxWidth - 10,
              12
            );
            doc.setFont(undefined, 'normal');
            y += 2;

            // Answer text
            doc.setFontSize(11);
            const answerText = answer
              ? answer
              : language === 'pt_BR'
              ? '(sem resposta)'
              : '(no answer)';
            y = addWrappedText(
              `${answerText}`,
              margin + 15,
              y,
              maxWidth - 15,
              11
            );
            y += 8;
          }
        });

        y += 3; // Space between steps
      });

      y += 5; // Space between groups

      // Add separator line between groups (except for last group)
      const groupKeys = Object.keys(grouping);
      const isLastGroup = groupId === groupKeys[groupKeys.length - 1];
      if (!isLastGroup) {
        y = checkPageBreak(y, 5);
        doc.setLineWidth(0.2);
        doc.line(margin + 5, y, pageWidth - margin - 5, y);
        y += 8;
      }
    });

    // Add footer with page numbers if multiple pages
    const totalPages = doc.getNumberOfPages();
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.text(
          `Page ${i} of ${totalPages}`,
          pageWidth - margin - 20,
          pageHeight - 10
        );
      }
    }

    // Use save() which triggers download synchronously
    doc.save(`${title}.pdf`);
  } else if (format === 'docx') {
    alert('This function is currenlty unsupported!');
    //   const docxModule = await import('docx');
    //   // Vite/ESM: use .default
    //   const { Document, Packer, Paragraph, TextRun } = docxModule.default;
    //   const title = language === 'pt_BR' ? 'Escada Semiótica' : 'Semiotic Ladder';
    //   const doc = new Document({
    //     sections: [
    //       {
    //         properties: {},
    //         children: [
    //           new Paragraph({
    //             children: [new TextRun({ text: title, bold: true, size: 36 })],
    //             spacing: { after: 300 },
    //           }),
    //           ...Object.entries(grouping).flatMap(([groupName, questions]) => [
    //             new Paragraph({
    //               children: [
    //                 new TextRun({ text: groupName, bold: true, size: 28 }),
    //               ],
    //               spacing: { after: 200 },
    //             }),
    //             ...questions
    //               .filter((q) => !onlyAnswered || answers[q.id])
    //               .flatMap((q) => [
    //                 new Paragraph({
    //                   children: [
    //                     new TextRun({
    //                       text: `Q: ${q.text[language] || q.text.en}`,
    //                       bold: true,
    //                       size: 24,
    //                     }),
    //                   ],
    //                 }),
    //                 new Paragraph({
    //                   children: [
    //                     new TextRun({
    //                       text: `A: ${
    //                         answers[q.id]
    //                           ? answers[q.id]
    //                           : language === 'pt_BR'
    //                           ? '(sem resposta)'
    //                           : '(no answer)'
    //                       }`,
    //                       size: 22,
    //                     }),
    //                   ],
    //                   spacing: { after: 150 },
    //                 }),
    //               ]),
    //           ]),
    //         ],
    //       },
    //     ],
    //   });
    //   const blob = await Packer.toBlob(doc);
    //   const fileName = `${title}.docx`;
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = fileName;
    //   document.body.appendChild(a);
    //   a.click();
    //   setTimeout(() => {
    //     document.body.removeChild(a);
    //     URL.revokeObjectURL(url);
    //   }, 100);
  }
}
