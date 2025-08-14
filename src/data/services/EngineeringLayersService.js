import { HtmlTemplateService } from './HtmlTemplateService.js';
import { PdfService } from './PdfService.js';
import { XmlService } from './XmlService.js';

/**
 * Service for generating Engineering Layers documents
 */
export class EngineeringLayersService {
  /**
   * Exports Engineering Layers document as PDF
   * @param {Object} params - Export parameters
   * @param {Array} params.questions - Questions array
   * @param {Object} params.answers - User answers
   * @param {boolean} params.onlyAnswered - Include only answered questions
   * @param {string} params.language - Language code
   * @param {string} params.format - Export format (default: 'pdf')
   * @param {Function} params.onExportStart - Callback when export starts
   * @param {Function} params.onExportEnd - Callback when export ends
   */
  static async exportDocument({
    questions,
    answers,
    onlyAnswered,
    language,
    format = 'pdf',
    onExportStart,
    onExportEnd,
  }) {
    if (format === 'pdf') {
      if (onExportStart) onExportStart();

      const title =
        language === 'pt_BR'
          ? 'Camadas de Engenharia de Software'
          : 'Software Engineering Layers';

      const engineeringTags = XmlService.getEngineeringTags();
      const layers = this.groupQuestionsByEngineeringLayer(
        questions,
        engineeringTags
      );
      const content = this.generateContent({
        layers,
        answers,
        onlyAnswered,
        language,
      });

      const htmlContent = HtmlTemplateService.generateHtmlDocument({
        title,
        content,
        language,
      });

      await PdfService.generatePdf(htmlContent, title);

      if (onExportEnd) onExportEnd();
    }
  }

  /**
   * Groups questions by engineering layer
   * @param {Array} questions - Questions array
   * @param {Object} engineeringTags - Engineering tags lookup
   * @returns {Object} Questions grouped by layer
   */
  static groupQuestionsByEngineeringLayer(questions, engineeringTags) {
    return questions.reduce((acc, q) => {
      // Use the engineeringTags property we added in XmlReader
      q.engineeringTags.forEach((tagId) => {
        if (!acc[tagId]) {
          acc[tagId] = {
            tag: engineeringTags[tagId],
            questions: [],
          };
        }
        acc[tagId].questions.push(q);
      });
      return acc;
    }, {});
  }

  /**
   * Generates content for Engineering Layers document
   * @param {Object} params - Generation parameters
   * @returns {string} Generated HTML content
   */
  static generateContent({ layers, answers, onlyAnswered, language }) {
    const layersContent = Object.entries(layers)
      .sort(([, a], [, b]) => a.tag.order - b.tag.order)
      .map(([, layer]) => {
        const questions = layer.questions
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
          <div class="group avoid-break" style="page-break-inside: avoid !important; break-inside: avoid !important; display: block;">
            <div class="group-title" style="page-break-after: avoid !important; break-after: avoid !important;">${HtmlTemplateService.escapeHtml(
              layer.tag.names[language]
            )}</div>
            ${questions}
          </div>
        `;
      })
      .join('');

    return layersContent;
  }
}
