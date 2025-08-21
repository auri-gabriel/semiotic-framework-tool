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
