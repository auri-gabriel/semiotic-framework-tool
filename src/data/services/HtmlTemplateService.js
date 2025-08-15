/**
 * Service for generating HTML templates for documents
 */
export class HtmlTemplateService {
  /**
   * Generates common CSS styles for documents
   * @returns {string} CSS styles as string
   */
  static getDocumentStyles() {
    return `
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
    break-inside: avoid;
  }
  
  /* Ensure groups don't break */
  .group {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
  }
  
  /* Ensure steps don't break */
  .step {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
  }
  
  /* Ensure questions don't break */
  .question {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
  }
  
  /* Prevent titles from being orphaned */
  .group-title {
    page-break-after: avoid !important;
    break-after: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  
  .step-title {
    page-break-after: avoid !important;
    break-after: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  
  .question-text {
    page-break-after: avoid !important;
    break-after: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  
  /* Ensure answer text stays with question */
  .answer-text {
    page-break-before: avoid !important;
    break-before: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
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
  break-inside: avoid;
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
  page-break-after: avoid;
  break-after: avoid;
}

.step {
  margin-bottom: 24px;
  margin-left: 16px;
  page-break-inside: avoid;
  break-inside: avoid;
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
  page-break-after: avoid;
  break-after: avoid;
}

.question {
  margin-bottom: 16px;
  margin-left: 24px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.question-text {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
  line-height: 1.4;
  letter-spacing: -0.005em;
  page-break-after: avoid;
  break-after: avoid;
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
  page-break-before: avoid;
  break-before: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
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

/* List styles for proper formatting */
ul, ol {
  margin: 16px 0;
  padding-left: 24px;
}

ul li {
  list-style-type: disc;
  margin-bottom: 8px;
  line-height: 1.5;
}

ol li {
  list-style-type: decimal;
  margin-bottom: 8px;
  line-height: 1.5;
}

/* Nested list styles */
ul ul, ol ul {
  margin: 8px 0;
  padding-left: 20px;
}

ul ul li {
  list-style-type: circle;
}

ol ol, ul ol {
  margin: 8px 0;
  padding-left: 20px;
}

/* Better print spacing */
@media print {
  /* Force block display for better control */
  * {
    box-sizing: border-box;
  }
  
  .group { 
    margin-bottom: 20px;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
    overflow: visible !important;
  }
  .step { 
    margin-bottom: 16px;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
    overflow: visible !important;
  }
  .question { 
    margin-bottom: 12px;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
    overflow: visible !important;
  }
  .group-title {
    background: #f8f8f8 !important;
    page-break-after: avoid !important;
    break-after: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
  }
  .step-title {
    page-break-after: avoid !important;
    break-after: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
  }
  .question-text {
    page-break-after: avoid !important;
    break-after: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
  }
  .answer-text {
    background: #ffffff !important;
    border-color: #e0e0e0 !important;
    page-break-before: avoid !important;
    break-before: avoid !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    display: block !important;
  }
  
  /* Additional orphan and widow control */
  p, div {
    orphans: 3;
    widows: 3;
  }
}
</style>
`;
  }

  /**
   * Fixes ReactQuill HTML formatting issues
   * @param {string} html - HTML content to fix
   * @returns {string} Fixed HTML content
   */
  static fixReactQuillHtml(html) {
    if (!html) return html;

    // Fix bullet lists that are incorrectly rendered as <ol><li data-list="bullet">
    // Convert them to proper <ul><li>
    let fixedHtml = html.replace(
      /<ol>\s*<li\s+data-list="bullet"[^>]*>/gi,
      '<ul><li>'
    );

    // Fix closing ol tags for bullet lists
    fixedHtml = fixedHtml.replace(
      /<\/li>\s*<\/ol>/gi,
      (match, offset, string) => {
        // Check if this is part of a bullet list by looking backwards
        const beforeMatch = string.substring(0, offset);
        const lastUlIndex = beforeMatch.lastIndexOf('<ul>');
        const lastOlIndex = beforeMatch.lastIndexOf('<ol>');

        // If the most recent list opening was <ul>, close with </ul>
        if (lastUlIndex > lastOlIndex) {
          return '</li></ul>';
        }
        return match; // Keep original if it's a real ordered list
      }
    );

    // Clean up any remaining data-list attributes
    fixedHtml = fixedHtml.replace(/\s+data-list="[^"]*"/gi, '');

    // Clean up any ql-ui spans that might be left over
    fixedHtml = fixedHtml.replace(/<span\s+class="ql-ui"[^>]*><\/span>/gi, '');

    return fixedHtml;
  }

  /**
   * Escapes HTML for safe display
   * @param {string} text - Text to escape
   * @returns {string} Escaped HTML
   */
  static escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Generates a complete HTML document
   * @param {Object} params - Parameters for HTML generation
   * @param {string} params.title - Document title
   * @param {string} params.content - Main content HTML
   * @param {string} params.language - Language code
   * @returns {string} Complete HTML document
   */
  static generateHtmlDocument({ title, content, language }) {
    return `
    <!DOCTYPE html>
    <html lang="${language === 'pt_BR' ? 'pt-BR' : 'en'}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${this.escapeHtml(title)}</title>
      ${this.getDocumentStyles()}
    </head>
    <body>
      <div class="document-container">
        <div class="header">
          <h1 class="document-title">${this.escapeHtml(title)}</h1>
        </div>
        
        <div class="content">
          ${content}
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

  /**
   * Generates HTML for a question and answer
   * @param {Object} question - Question object
   * @param {string} answer - Answer text
   * @param {string} language - Language code
   * @returns {string} Question HTML
   */
  static generateQuestionHtml(question, answer, language) {
    const questionText = question.texts[language] || question.texts.en;

    // Fix ReactQuill HTML formatting issues and use fixed content
    const fixedAnswer = answer ? this.fixReactQuillHtml(answer) : null;

    const answerText = fixedAnswer
      ? fixedAnswer
      : language === 'pt_BR'
      ? '(sem resposta)'
      : '(no answer)';

    return `
      <div class="question avoid-break" style="page-break-inside: avoid !important; break-inside: avoid !important; display: block;">
        <div class="question-text" style="page-break-after: avoid !important; break-after: avoid !important;">${this.escapeHtml(
          questionText
        )}</div>
        <div class="answer-text ${
          !fixedAnswer ? 'no-answer' : ''
        }" style="page-break-before: avoid !important; break-before: avoid !important; page-break-inside: avoid !important; break-inside: avoid !important;">
          ${answerText}
        </div>
      </div>
    `;
  }
}
