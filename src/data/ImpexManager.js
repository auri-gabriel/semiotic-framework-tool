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
    const title = language === 'pt_BR' ? 'Escada Semiótica' : 'Semiotic Ladder';

    // Generate HTML content
    const htmlContent = generateHTML({
      grouping,
      answers,
      onlyAnswered,
      language,
      title,
    });
    printHTML(htmlContent, title);
  }
}

function generateHTML({ grouping, answers, onlyAnswered, language, title }) {
  const styles = `
    <style>
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
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 100%;
        margin: 0;
        padding: 0;
      }
      
      .document-container {
        max-width: 100%;
        margin: 0 auto;
        background: white;
      }
      
      .header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 15px;
        border-bottom: 2px solid #2c3e50;
      }
      
      .document-title {
        font-size: 24px;
        font-weight: bold;
        color: #2c3e50;
        margin: 0;
      }
      
      .group {
        margin-bottom: 25px;
        page-break-inside: avoid;
      }
      
      .group:not(:last-child) {
        border-bottom: 1px solid #ddd;
        padding-bottom: 20px;
      }
      
      .group-title {
        font-size: 18px;
        font-weight: bold;
        color: #34495e;
        margin-bottom: 15px;
        background: #f8f9fa;
        padding: 10px;
        border-left: 4px solid #3498db;
      }
      
      .step {
        margin-bottom: 20px;
        margin-left: 15px;
      }
      
      .step-title {
        font-size: 16px;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 10px;
        padding: 8px;
        background: #ecf0f1;
        border-left: 3px solid #95a5a6;
      }
      
      .question {
        margin-bottom: 15px;
        margin-left: 20px;
        page-break-inside: avoid;
      }
      
      .question-text {
        font-size: 14px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 5px;
        line-height: 1.4;
      }
      
      .answer-text {
        font-size: 13px;
        color: #555;
        background: #f9f9f9;
        padding: 10px;
        border-radius: 4px;
        border-left: 3px solid #3498db;
        margin-left: 10px;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      
      .no-answer {
        font-style: italic;
        color: #7f8c8d;
        background: #fafafa;
        border-left-color: #bdc3c7;
      }
      
      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 12px;
        color: #7f8c8d;
        border-top: 1px solid #ddd;
        padding-top: 10px;
      }
      
      /* Better print spacing */
      @media print {
        .group { margin-bottom: 15px; }
        .step { margin-bottom: 12px; }
        .question { margin-bottom: 10px; }
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
