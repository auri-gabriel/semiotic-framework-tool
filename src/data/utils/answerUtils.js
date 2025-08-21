/**
 * Utility functions for handling answer data
 */

/**
 * Checks if an answer is considered "answered" (not empty/null/undefined)
 * @param {any} answer - The answer value to check
 * @returns {boolean} True if answer is considered answered
 */
export function isAnswered(answer) {
  if (answer === null || answer === undefined) return false;
  if (typeof answer === 'string') {
    // Remove HTML tags and whitespace to check if there's actual content
    const cleanText = answer.replace(/<[^>]*>/g, '').trim();
    return cleanText.length > 0;
  }
  return Boolean(answer);
}

/**
 * Filters questions to only include answered ones
 * @param {Array} questions - Array of question objects
 * @param {Object} answers - Answers object with questionId as key
 * @returns {Array} Filtered array of questions that have answers
 */
export function getAnsweredQuestions(questions, answers) {
  return questions.filter((q) => isAnswered(answers[q.id]));
}

/**
 * Counts the number of answered questions
 * @param {Array} questions - Array of question objects
 * @param {Object} answers - Answers object with questionId as key
 * @returns {number} Number of answered questions
 */
export function countAnsweredQuestions(questions, answers) {
  return questions.filter((q) => isAnswered(answers[q.id])).length;
}

/**
 * Generates document overview statistics
 * @param {Array} questions - Array of question objects
 * @param {Object} answers - Answers object with questionId as key
 * @param {string} language - Language code for localized text
 * @returns {Object} Overview statistics
 */
export function generateDocumentOverview(questions, answers, language) {
  const totalQuestions = questions.length;
  const answeredQuestions = countAnsweredQuestions(questions, answers);
  const unansweredQuestions = totalQuestions - answeredQuestions;
  const completionPercentage =
    totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;

  const texts = {
    pt_BR: {
      title: 'Visão Geral do Documento',
      totalQuestions: 'Total de questões',
      answeredQuestions: 'Questões respondidas',
      unansweredQuestions: 'Questões não respondidas',
      completionRate: 'Taxa de completude',
    },
    en: {
      title: 'Document Overview',
      totalQuestions: 'Total questions',
      answeredQuestions: 'Answered questions',
      unansweredQuestions: 'Unanswered questions',
      completionRate: 'Completion rate',
    },
  };

  const text = texts[language] || texts.en;

  return {
    title: text.title,
    stats: {
      totalQuestions: { label: text.totalQuestions, value: totalQuestions },
      answeredQuestions: {
        label: text.answeredQuestions,
        value: answeredQuestions,
      },
      unansweredQuestions: {
        label: text.unansweredQuestions,
        value: unansweredQuestions,
      },
      completionRate: {
        label: text.completionRate,
        value: `${completionPercentage}%`,
      },
    },
  };
}

/**
 * Generates document overview statistics grouped by sections
 * @param {Object} grouping - Grouping structure (layers or semiotic steps)
 * @param {Object} answers - Answers object with questionId as key
 * @param {string} language - Language code for localized text
 * @param {string} documentType - Type of document ('semiotic' or 'engineering')
 * @returns {Object} Overview statistics grouped by sections
 */
export function generateGroupedDocumentOverview(
  grouping,
  answers,
  language,
  documentType
) {
  const texts = {
    pt_BR: {
      title: 'Visão Geral do Documento',
      totalQuestions: 'Total de questões',
      answeredQuestions: 'Questões respondidas',
      completionRate: 'Taxa de completude',
      semioticTitle: 'Progresso por Etapa Semiótica',
      engineeringTitle: 'Progresso por Camada de Engenharia',
    },
    en: {
      title: 'Document Overview',
      totalQuestions: 'Total questions',
      answeredQuestions: 'Answered questions',
      completionRate: 'Completion rate',
      semioticTitle: 'Progress by Semiotic Step',
      engineeringTitle: 'Progress by Engineering Layer',
    },
  };

  const text = texts[language] || texts.en;
  const sectionTitle =
    documentType === 'semiotic' ? text.semioticTitle : text.engineeringTitle;

  // Calculate overall statistics
  const allQuestions =
    documentType === 'semiotic'
      ? Object.values(grouping).flatMap((group) =>
          Object.values(group.steps).flatMap((step) => step.questions)
        )
      : Object.values(grouping).flatMap((layer) => layer.questions);

  const totalQuestions = allQuestions.length;
  const answeredQuestions = countAnsweredQuestions(allQuestions, answers);
  const completionPercentage =
    totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;

  // Calculate statistics per section
  const sections = [];

  if (documentType === 'semiotic') {
    // For semiotic ladder, group by semiotic steps within each group
    Object.entries(grouping).forEach(([, groupProps]) => {
      Object.entries(groupProps.steps).forEach(([, stepProps]) => {
        const stepQuestions = stepProps.questions;
        const stepAnswered = countAnsweredQuestions(stepQuestions, answers);
        const stepCompletion =
          stepQuestions.length > 0
            ? Math.round((stepAnswered / stepQuestions.length) * 100)
            : 0;

        sections.push({
          name: stepProps.tag.names[language],
          totalQuestions: stepQuestions.length,
          answeredQuestions: stepAnswered,
          completionRate: `${stepCompletion}%`,
        });
      });
    });
  } else {
    // For engineering layers, group by layers
    Object.entries(grouping)
      .sort(([, a], [, b]) => a.tag.order - b.tag.order)
      .forEach(([, layer]) => {
        const layerQuestions = layer.questions;
        const layerAnswered = countAnsweredQuestions(layerQuestions, answers);
        const layerCompletion =
          layerQuestions.length > 0
            ? Math.round((layerAnswered / layerQuestions.length) * 100)
            : 0;

        sections.push({
          name: layer.tag.names[language],
          totalQuestions: layerQuestions.length,
          answeredQuestions: layerAnswered,
          completionRate: `${layerCompletion}%`,
        });
      });
  }

  return {
    title: text.title,
    overallStats: {
      totalQuestions: { label: text.totalQuestions, value: totalQuestions },
      answeredQuestions: {
        label: text.answeredQuestions,
        value: answeredQuestions,
      },
      completionRate: {
        label: text.completionRate,
        value: `${completionPercentage}%`,
      },
    },
    sectionTitle,
    sections,
  };
}
