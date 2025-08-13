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
  onExportStart,
  onExportEnd,
}) {
  if (format === 'pdf') {
    if (onExportStart) onExportStart();
    const title = language === 'pt_BR' ? 'Escada Semiótica' : 'Semiotic Ladder';

    // Generate HTML content
    const htmlContent = generateHTML({
      grouping,
      answers,
      onlyAnswered,
      language,
      title,
    });
    await printWithHtml2Pdf(htmlContent, title);
    if (onExportEnd) onExportEnd();
  }
}

function generateHTML({ grouping, answers, onlyAnswered, language, title }) {
  const styles = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@page {
  size: A4;
  margin: 20mm;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page-break {
    page-break-before: always;
  }
  .avoid-break {
    page-break-inside: avoid;
  }
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  line-height: 1.5;
  color: #1a1a1a;
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.document-container {
  max-width: 100%;
  margin: 0 auto;
  background: white;
}

.header {
  text-align: left;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #000000;
}

.document-title {
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.group {
  margin-bottom: 32px;
  page-break-inside: avoid;
}

.group:not(:last-child) {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 24px;
}

.group-title {
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 20px;
  background: #f8f8f8;
  padding: 16px;
  border: none;
  border-left: 4px solid #000000;
  letter-spacing: -0.01em;
}

.step {
  margin-bottom: 24px;
  margin-left: 16px;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #d1d1d1;
  border-left: 3px solid #666666;
}

.question {
  margin-bottom: 16px;
  margin-left: 24px;
  page-break-inside: avoid;
}

.question-text {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
  line-height: 1.4;
  letter-spacing: -0.005em;
}

.answer-text {
  font-size: 13px;
  color: #4a4a4a;
  background: #ffffff;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-left: 3px solid #666666;
  margin-left: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-weight: 400;
  line-height: 1.5;
}

.no-answer {
  font-style: italic;
  color: #8a8a8a;
  background: #fafafa;
  border-left-color: #cccccc;
}

.footer {
  margin-top: 48px;
  text-align: left;
  font-size: 11px;
  color: #8a8a8a;
  border-top: 1px solid #e5e5e5;
  padding-top: 16px;
  font-weight: 400;
}

/* Better print spacing */
@media print {
  .group { 
    margin-bottom: 20px; 
  }
  .step { 
    margin-bottom: 16px; 
  }
  .question { 
    margin-bottom: 12px; 
  }
  .group-title {
    background: #f8f8f8 !important;
  }
  .answer-text {
    background: #ffffff !important;
    border-color: #e0e0e0 !important;
  }
}
</style>
`;

  const groups = Object.entries(grouping)
    .map(([groupId, groupProps]) => {
      const steps = Object.entries(groupProps.steps)
        .map(([stepId, stepProps]) => {
          const questions = stepProps.questions
            .filter((q) => !onlyAnswered || answers[q.id])
            .map((q) => {
              const answer = answers[q.id];
              const questionText = q.texts[language] || q.texts.en;
              const answerText = answer
                ? answer
                : language === 'pt_BR'
                ? '(sem resposta)'
                : '(no answer)';

              return `
            <div class="question">
              <div class="question-text">${escapeHtml(questionText)}</div>
              <div class="answer-text ${!answer ? 'no-answer' : ''}">
                ${answerText}
              </div>
            </div>
          `;
            })
            .join('');

          if (!questions) return '';

          return `
        <div class="step">
          <div class="step-title">${escapeHtml(
            stepProps.tag.names[language]
          )}</div>
          ${questions}
        </div>
      `;
        })
        .join('');

      if (!steps) return '';

      return `
      <div class="group avoid-break">
        <div class="group-title">${escapeHtml(
          groupProps.tag.names[language]
        )}</div>
        ${steps}
      </div>
    `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="${language === 'pt_BR' ? 'pt-BR' : 'en'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapeHtml(title)}</title>
      ${styles}
    </head>
    <body>
      <div class="document-container">
        <div class="header">
          <h1 class="document-title">${escapeHtml(title)}</h1>
        </div>
        
        <div class="content">
          ${groups}
        </div>
        
        <div class="footer">
          <p>Generated on ${new Date().toLocaleDateString(
            language === 'pt_BR' ? 'pt-BR' : 'en-US'
          )}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Method 1: Native browser print
function printHTML(htmlContent, filename) {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for content to load, then print
  printWindow.onload = function () {
    setTimeout(() => {
      printWindow.print();
      // Note: Browser will handle the PDF generation when user chooses "Save as PDF"
    }, 100);
  };
}

async function printWithHtml2Pdf(htmlContent, filename) {
  const html2pdf = (await import('html2pdf.js')).default;

  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.top = '-9999px';
  tempDiv.style.left = '-9999px';
  tempDiv.style.backgroundColor = 'white';
  tempDiv.style.width = '794px'; // optional, for A4 layout

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // Grab all style tags
  let styleContent = '';
  doc.head
    .querySelectorAll('style')
    .forEach((s) => (styleContent += s.innerHTML));

  tempDiv.innerHTML = `
    <style>${styleContent}</style>
    <div class="document-container">
      ${doc.body.innerHTML}
    </div>
  `;

  document.body.appendChild(tempDiv);

  await new Promise((res) => setTimeout(res, 200));

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      backgroundColor: '#ffffff',
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf()
      .set(opt)
      .from(tempDiv.querySelector('.document-container'))
      .save();
  } finally {
    document.body.removeChild(tempDiv);
  }
}
