/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import { isAnswered } from '../utils/answerUtils.js';

/**
 * Service for generating HTML templates for documents
 */
export class HtmlTemplateService {
  /**
   * Generates a stable HTML id from arbitrary parts
   * @param {...string|number} parts - Values to compose the id from
   * @returns {string} Safe HTML id
   */
  static createId(...parts) {
    const normalized = parts
      .filter((part) => part !== undefined && part !== null && part !== '')
      .map((part) =>
        String(part)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
      )
      .filter(Boolean)
      .join('-');

    return normalized || 'section';
  }

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

.content {
  display: block;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

.metadata {
  margin-top: 16px;
  display: grid;
  gap: 10px;
}

.metadata-title {
  margin: 0;
}

.metadata-item {
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-left: 3px solid #666666;
  padding: 10px 12px;
}

.metadata-label {
  font-size: 12px;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.metadata-value {
  font-size: 14px;
  color: #1a1a1a;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
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

.item-description {
  font-size: 13px;
  color: #4a4a4a;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-left: 3px solid #999999;
  padding: 10px 12px;
  margin: -4px 0 12px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.5;
}

.question-list,
.sections-grid {
  list-style: none;
  margin: 0;
  padding: 0;
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

.answer-text > :first-child {
  margin-top: 0;
}

.answer-text > :last-child {
  margin-bottom: 0;
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

.overview {
  margin-bottom: 32px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 24px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.overview-title {
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  background: white;
  border: 1px solid #dee2e6;
  border-left: 3px solid #6c757d;
  padding: 12px 16px;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stat-value {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #212529;
  letter-spacing: -0.01em;
}

.sections-overview {
  margin-top: 24px;
}

.sections-title {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.section-item {
  background: white;
  padding: 12px 16px;
  border: 1px solid #dee2e6;
  border-left: 3px solid #6c757d;
}

.section-name {
  font-size: 13px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 8px;
  line-height: 1.3;
}

.section-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6c757d;
}

.section-completion {
  font-weight: 600;
  color: #212529;
}

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

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    doc.querySelectorAll('span.ql-ui').forEach((span) => span.remove());

    doc.querySelectorAll('ol').forEach((list) => {
      const items = Array.from(list.children).filter(
        (child) => child.tagName === 'LI',
      );

      if (!items.length) {
        return;
      }

      const isBulletList = items.every(
        (item) => item.getAttribute('data-list') === 'bullet',
      );

      items.forEach((item) => item.removeAttribute('data-list'));

      if (!isBulletList) {
        return;
      }

      const bulletList = doc.createElement('ul');
      list.replaceWith(bulletList);
      items.forEach((item) => bulletList.appendChild(item));
    });

    doc.querySelectorAll('li[data-list]').forEach((item) => {
      item.removeAttribute('data-list');
    });

    doc.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href) {
        return;
      }

      const normalizedHref = this.normalizeHref(href);
      if (normalizedHref !== href) {
        anchor.setAttribute('href', normalizedHref);
      }

      if (/^https?:/i.test(normalizedHref)) {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener noreferrer');
      }
    });

    return doc.body.innerHTML;
  }

  /**
   * Normalizes anchor href values to avoid relative/local links in exports
   * @param {string} html - HTML content with anchors
   * @returns {string} HTML with normalized href values
   */
  static normalizeAnchorHrefs(html) {
    if (!html) return html;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const anchors = doc.querySelectorAll('a[href]');

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href) return;

      const normalizedHref = this.normalizeHref(href);
      if (normalizedHref !== href) {
        anchor.setAttribute('href', normalizedHref);
      }
    });

    return doc.body.innerHTML;
  }

  /**
   * Normalizes a single href value for exported documents
   * @param {string} href - Anchor href value
   * @returns {string} Normalized href
   */
  static normalizeHref(href) {
    const trimmedHref = href.trim();
    if (!trimmedHref) return href;

    if (/^#/.test(trimmedHref)) {
      return trimmedHref;
    }

    if (/^[a-z][a-z0-9+.-]*:/i.test(trimmedHref)) {
      return trimmedHref;
    }

    if (trimmedHref.startsWith('//')) {
      return `https:${trimmedHref}`;
    }

    if (/^www\./i.test(trimmedHref)) {
      return `https://${trimmedHref}`;
    }

    const looksLikeDomain =
      /^([a-z0-9-]+\.)+[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i.test(trimmedHref) &&
      !trimmedHref.includes('@');

    if (looksLikeDomain) {
      return `https://${trimmedHref}`;
    }

    return trimmedHref;
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
   * Opens generated HTML in a new tab for debugging/preview (development only)
   * @param {string} htmlContent - Complete HTML document to preview
   * @param {string} title - Title for the preview window
   */
  static previewHtml(htmlContent, title = 'HTML Preview') {
    // // Only allow preview in development environment
    // if (!import.meta.env.DEV) {
    //   console.warn('HTML preview is only available in development environment');
    //   return;
    // }

    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();
    previewWindow.document.title = title;
  }

  /**
   * Downloads generated HTML as a file
   * @param {string} htmlContent - Complete HTML document to download
   * @param {string} filename - Name of the file to download (default: 'document.html')
   */
  static downloadHtml(htmlContent, filename = 'document.html') {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }

  /**
   * Generates a complete HTML document
   * @param {Object} params - Parameters for HTML generation
   * @param {string} params.title - Document title
   * @param {string} params.content - Main content HTML
   * @param {string} params.language - Language code
   * @returns {string} Complete HTML document
   */
  static generateHtmlDocument({ title, content, language, projectMetadata }) {
    const labels =
      language === 'pt_BR'
        ? {
            projectTitle: 'Título do Projeto',
            focalProblem: 'Problema Focal',
            authorship: 'Autoria',
            metadata: 'Metadados do projeto',
            generatedOn: 'Gerado em',
            notInformed: '(não informado)',
          }
        : {
            projectTitle: 'Project Title',
            focalProblem: 'Focal Problem',
            authorship: 'Authorship',
            metadata: 'Project metadata',
            generatedOn: 'Generated on',
            notInformed: '(not provided)',
          };

    const projectTitle = projectMetadata?.title || '';
    const focalProblem = projectMetadata?.focalProblem || '';
    const authorship = projectMetadata?.authorship || '';
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    const generatedAt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate(),
    )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
      now.getSeconds(),
    )}`;

    const metadataHtml = `
      <section class="project-metadata" aria-labelledby="project-metadata-title">
        <h2 class="metadata-title visually-hidden" id="project-metadata-title">${this.escapeHtml(
          labels.metadata,
        )}</h2>
        <dl class="metadata">
        <div class="metadata-item">
          <dt class="metadata-label">${this.escapeHtml(labels.projectTitle)}</dt>
          <dd class="metadata-value">${
            projectTitle
              ? this.escapeHtml(projectTitle)
              : this.escapeHtml(labels.notInformed)
          }</dd>
        </div>
        <div class="metadata-item">
          <dt class="metadata-label">${this.escapeHtml(labels.focalProblem)}</dt>
          <dd class="metadata-value">${
            focalProblem
              ? this.escapeHtml(focalProblem)
              : this.escapeHtml(labels.notInformed)
          }</dd>
        </div>
        <div class="metadata-item">
          <dt class="metadata-label">${this.escapeHtml(labels.authorship)}</dt>
          <dd class="metadata-value">${
            authorship
              ? this.escapeHtml(authorship)
              : this.escapeHtml(labels.notInformed)
          }</dd>
        </div>
        </dl>
      </section>
    `;

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
        <header class="header">
          <h1 class="document-title">${this.escapeHtml(title)}</h1>
          ${metadataHtml}
        </header>
        
        <main class="content">
          ${content}
        </main>
        
        <footer class="footer">
          <p>${this.escapeHtml(labels.generatedOn)} ${generatedAt}</p>
        </footer>
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
   * @param {Object} options - Rendering options
   * @param {string} options.headingTag - Heading tag name for the question text
   * @param {string} options.id - Stable HTML id for the question heading
   * @returns {string} Question HTML
   */
  static generateQuestionHtml(question, answer, language, options = {}) {
    const questionText = question.texts[language] || question.texts.en;
    const headingTag = options.headingTag || 'h3';
    const questionId =
      options.id || this.createId('question', question.id || questionText);
    const answerLabel = language === 'pt_BR' ? 'Resposta' : 'Answer';

    // Check if answer is actually answered
    const hasAnswer = isAnswered(answer);

    // Fix ReactQuill HTML formatting issues and use fixed content
    const fixedAnswer = hasAnswer ? this.fixReactQuillHtml(answer) : null;

    const answerText = fixedAnswer
      ? fixedAnswer
      : `<p>${this.escapeHtml(
          language === 'pt_BR' ? '(sem resposta)' : '(no answer)',
        )}</p>`;

    return `
      <li class="question avoid-break">
        <article aria-labelledby="${questionId}">
          <${headingTag} class="question-text" id="${questionId}">${this.escapeHtml(
            questionText,
          )}</${headingTag}>
          <div class="answer-text ${!hasAnswer ? 'no-answer' : ''}">
            <p class="visually-hidden">${this.escapeHtml(answerLabel)}</p>
            ${answerText}
          </div>
        </article>
      </li>
    `;
  }

  /**
   * Generates optional description HTML block for steps/layers
   * @param {Object} params - Description params
   * @param {Object} params.item - Item object containing texts/descriptions
   * @param {boolean} params.includeDescriptions - Whether to include descriptions
   * @param {string} params.language - Language code
   * @returns {string} Description HTML or empty string
   */
  static generateItemDescriptionHtml({ item, includeDescriptions, language }) {
    if (!includeDescriptions || !item) {
      return '';
    }

    const descriptionText =
      item.texts?.[language] ||
      item.texts?.en ||
      item.descriptions?.[language] ||
      item.descriptions?.en ||
      '';

    if (!descriptionText?.trim()) {
      return '';
    }

    return `<div class="item-description">${this.escapeHtml(descriptionText.trim())}</div>`;
  }

  /**
   * Generates HTML for document overview section with grouped statistics
   * @param {Object} overview - Overview data with overall stats and sections
   * @returns {string} Overview HTML
   */
  static generateOverviewHtml(overview) {
    // Return empty string if overview is null/undefined
    if (!overview) {
      return '';
    }

    // Generate overall statistics
    const overallStatsHtml = Object.entries(overview.overallStats)
      .map(
        ([, stat]) => `
        <div class="stat-item">
          <dt class="stat-label">${this.escapeHtml(stat.label)}</dt>
          <dd class="stat-value">${this.escapeHtml(stat.value.toString())}</dd>
        </div>
      `,
      )
      .join('');

    // Generate sections statistics
    const sectionsHtml = overview.sections
      .map(
        (section) => `
        <li class="section-item">
          <article>
          <h4 class="section-name">${this.escapeHtml(section.name)}</h4>
          <div class="section-stats">
            <span>${section.answeredQuestions}/${section.totalQuestions}</span>
            <span class="section-completion">${this.escapeHtml(
              section.completionRate,
            )}</span>
          </div>
          </article>
        </li>
      `,
      )
      .join('');

    return `
      <section class="overview avoid-break" aria-labelledby="overview-title">
        <h2 class="overview-title" id="overview-title">${this.escapeHtml(overview.title)}</h2>
        <dl class="overview-stats">
          ${overallStatsHtml}
        </dl>
        <section class="sections-overview" aria-labelledby="overview-sections-title">
          <h3 class="sections-title" id="overview-sections-title">${this.escapeHtml(
            overview.sectionTitle,
          )}</h3>
          <ul class="sections-grid">
            ${sectionsHtml}
          </ul>
        </section>
      </section>
    `;
  }
}
