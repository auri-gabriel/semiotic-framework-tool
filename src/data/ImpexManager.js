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

    const title = language === 'pt_BR' ? 'Escada Semiótica' : 'Semiotic Ladder';
    doc.setFontSize(18);
    doc.text(title, 10, 15);

    let y = 25;
    Object.entries(grouping).forEach(([groupName, questions]) => {
      doc.setFontSize(14);
      doc.text(groupName, 10, y);
      y += 8;
      questions.forEach((q) => {
        const answer = answers[q.id];
        if (!onlyAnswered || answer) {
          doc.setFontSize(12);
          doc.text(`Q: ${q.text[language] || q.text.en}`, 12, y);
          y += 6;
          doc.setFontSize(11);
          doc.text(
            `A: ${
              answer
                ? answer
                : language === 'pt_BR'
                ? '(sem resposta)'
                : '(no answer)'
            }`,
            14,
            y
          );
          y += 8;
        }
      });
      y += 4;
      if (y > 270) {
        doc.addPage();
        y = 15;
      }
    });

    // Use save() which triggers download synchronously
    doc.save(`${title}.pdf`);
  } else if (format === 'docx') {
    const docxModule = await import('docx');
    // Vite/ESM: use .default
    const { Document, Packer, Paragraph, TextRun } = docxModule.default;

    const title = language === 'pt_BR' ? 'Escada Semiótica' : 'Semiotic Ladder';
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: title, bold: true, size: 36 })],
              spacing: { after: 300 },
            }),
            ...Object.entries(grouping).flatMap(([groupName, questions]) => [
              new Paragraph({
                children: [
                  new TextRun({ text: groupName, bold: true, size: 28 }),
                ],
                spacing: { after: 200 },
              }),
              ...questions
                .filter((q) => !onlyAnswered || answers[q.id])
                .flatMap((q) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Q: ${q.text[language] || q.text.en}`,
                        bold: true,
                        size: 24,
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `A: ${
                          answers[q.id]
                            ? answers[q.id]
                            : language === 'pt_BR'
                            ? '(sem resposta)'
                            : '(no answer)'
                        }`,
                        size: 22,
                      }),
                    ],
                    spacing: { after: 150 },
                  }),
                ]),
            ]),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `${title}.docx`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
}
