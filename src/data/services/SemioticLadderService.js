import { HtmlTemplateService } from './HtmlTemplateService.js';
import { PdfService } from './PdfService.js';
import { XmlService } from './XmlService.js';

/**
 * Service for generating Semiotic Ladder documents
 */
export class SemioticLadderService {
  /**
   * Exports Semiotic Ladder document as PDF
   * @param {Object} params - Export parameters
   * @param {Object} params.grouping - Grouping structure
   * @param {Object} params.answers - User answers
   * @param {boolean} params.onlyAnswered - Include only answered questions
   * @param {string} params.language - Language code
   * @param {string} params.format - Export format (default: 'pdf')
   * @param {Function} params.onExportStart - Callback when export starts
   * @param {Function} params.onExportEnd - Callback when export ends
   */
  static async exportDocument({
    grouping,
    answers,
    onlyAnswered,
    language,
    format = 'pdf',
    onExportStart,
    onExportEnd,
  }) {
    if (onExportStart) onExportStart();

    const title = language === 'pt_BR' ? 'Escada Semiótica' : 'Semiotic Ladder';
    const content = this.generateContent({
      grouping,
      answers,
      onlyAnswered,
      language,
    });
    const htmlContent = HtmlTemplateService.generateHtmlDocument({
      title,
      content,
      language,
    });

    if (format === 'pdf') {
      await PdfService.generatePdf(htmlContent, title);
    } else if (format === 'preview') {
      HtmlTemplateService.previewHtml(htmlContent, title);
    }

    if (onExportEnd) onExportEnd();
  }

  /**
   * Generates content for Semiotic Ladder document
   * @param {Object} params - Generation parameters
   * @returns {string} Generated HTML content
   */
  static generateContent({ grouping, answers, onlyAnswered, language }) {
    const groups = Object.entries(grouping)
      .map(([, groupProps]) => {
        const steps = Object.entries(groupProps.steps)
          .map(([, stepProps]) => {
            const questions = stepProps.questions
              .filter((q) => !onlyAnswered || answers[q.id])
              .map((q) => {
                return HtmlTemplateService.generateQuestionHtml(
                  q,
                  answers[q.id],
                  language
                );
              })
              .join('');

            if (!questions) return '';

            return `
              <div class="step avoid-break" style="page-break-inside: avoid !important; break-inside: avoid !important; display: block;">
                <div class="step-title" style="page-break-after: avoid !important; break-after: avoid !important;">${HtmlTemplateService.escapeHtml(
                  stepProps.tag.names[language]
                )}</div>
                ${questions}
              </div>
            `;
          })
          .join('');

        if (!steps) return '';

        return `
          <div class="group avoid-break" style="page-break-inside: avoid !important; break-inside: avoid !important; display: block;">
            <div class="group-title" style="page-break-after: avoid !important; break-after: avoid !important;">${HtmlTemplateService.escapeHtml(
              groupProps.tag.names[language]
            )}</div>
            ${steps}
          </div>
        `;
      })
      .join('');

    return groups;
  }
}
