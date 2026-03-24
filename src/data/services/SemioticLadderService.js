/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import { HtmlTemplateService } from './HtmlTemplateService.js';
import { PdfService } from './PdfService.js';
import {
  isAnswered,
  generateGroupedDocumentOverview,
} from '../utils/answerUtils.js';
import { buildExportFileBaseName } from '../utils/exportFileNameUtils.js';

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
    withoutOverview,
    includeDescriptions,
    language,
    projectMetadata,
    format = 'pdf',
    onExportStart,
    onExportEnd,
  }) {
    if (onExportStart) onExportStart();

    const title = language === 'pt_BR' ? 'Escada Semiótica' : 'Semiotic Ladder';

    const overview = withoutOverview
      ? null
      : generateGroupedDocumentOverview(
          grouping,
          answers,
          language,
          'semiotic',
        );
    const content = this.generateContent({
      grouping,
      answers,
      onlyAnswered,
      includeDescriptions,
      language,
      overview,
    });
    const htmlContent = HtmlTemplateService.generateHtmlDocument({
      title,
      content,
      language,
      projectMetadata,
    });

    const fileBaseName = buildExportFileBaseName(
      projectMetadata,
      new Date(),
      'semiotic-ladder',
    );

    if (format === 'pdf') {
      await PdfService.generatePdf(htmlContent, fileBaseName);
    } else if (format === 'html') {
      HtmlTemplateService.downloadHtml(htmlContent, `${fileBaseName}.html`);
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
  static generateContent({
    grouping,
    answers,
    onlyAnswered,
    includeDescriptions,
    language,
    overview,
  }) {
    const overviewHtml = HtmlTemplateService.generateOverviewHtml(overview);

    const groups = Object.entries(grouping)
      .map(([, groupProps], groupIndex) => {
        const groupTitle =
          groupProps.tag.names[language] || groupProps.tag.names.en;
        const groupId = HtmlTemplateService.createId(
          'semiotic-group',
          groupIndex + 1,
          groupTitle,
        );

        const steps = Object.entries(groupProps.steps)
          .map(([, stepProps], stepIndex) => {
            const stepTitle =
              stepProps.tag.names[language] || stepProps.tag.names.en;
            const stepId = HtmlTemplateService.createId(
              'semiotic-step',
              groupIndex + 1,
              stepIndex + 1,
              stepTitle,
            );

            const questions = stepProps.questions
              .filter((q) => !onlyAnswered || isAnswered(answers[q.id]))
              .map((q, questionIndex) => {
                return HtmlTemplateService.generateQuestionHtml(
                  q,
                  answers[q.id],
                  language,
                  {
                    headingTag: 'h4',
                    id: HtmlTemplateService.createId(
                      'semiotic-question',
                      groupIndex + 1,
                      stepIndex + 1,
                      questionIndex + 1,
                      q.id,
                    ),
                  },
                );
              })
              .join('');

            if (!questions) return '';

            const descriptionHtml =
              HtmlTemplateService.generateItemDescriptionHtml({
                item: stepProps.tag,
                includeDescriptions,
                language,
              });

            return `
              <article class="step avoid-break" aria-labelledby="${stepId}">
                <h3 class="step-title" id="${stepId}">${HtmlTemplateService.escapeHtml(
                  stepTitle,
                )}</h3>
                ${descriptionHtml}
                <ol class="question-list">
                  ${questions}
                </ol>
              </article>
            `;
          })
          .join('');

        if (!steps) return '';

        return `
          <section class="group avoid-break" aria-labelledby="${groupId}">
            <h2 class="group-title" id="${groupId}">${HtmlTemplateService.escapeHtml(
              groupTitle,
            )}</h2>
            ${steps}
          </section>
        `;
      })
      .join('');

    return overviewHtml + groups;
  }
}
