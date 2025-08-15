import React from 'react';
import { useTranslation } from 'react-i18next';
import QuestionAccordion from './QuestionAccordion';

function SemioticStepAccordion({
  groupKey,
  stepKey,
  step,
  answers,
  onAnswerChange,
}) {
  const { t, i18n } = useTranslation();

  // Helper function to check if a question has a meaningful answer
  const hasAnswer = (answer) => {
    if (!answer) return false;
    const plainText = answer.replace(/<[^>]*>/g, '').trim();
    return plainText.length > 0;
  };

  // Calculate answered questions count
  const answeredCount = step.questions.filter((q) =>
    hasAnswer(answers[q.id])
  ).length;
  const totalCount = step.questions.length;

  // Functions to handle expand/collapse all questions
  const expandAllQuestions = () => {
    step.questions.forEach((q) => {
      const collapseElement = document.getElementById(
        `collapse-${groupKey}-${stepKey}-q${q.id}`
      );
      const buttonElement = document.querySelector(
        `[data-bs-target="#collapse-${groupKey}-${stepKey}-q${q.id}"]`
      );

      if (
        collapseElement &&
        buttonElement &&
        !collapseElement.classList.contains('show')
      ) {
        collapseElement.classList.add('show');
        buttonElement.classList.remove('collapsed');
        buttonElement.setAttribute('aria-expanded', 'true');
      }
    });
  };

  const collapseAllQuestions = () => {
    step.questions.forEach((q) => {
      const collapseElement = document.getElementById(
        `collapse-${groupKey}-${stepKey}-q${q.id}`
      );
      const buttonElement = document.querySelector(
        `[data-bs-target="#collapse-${groupKey}-${stepKey}-q${q.id}"]`
      );

      if (
        collapseElement &&
        buttonElement &&
        collapseElement.classList.contains('show')
      ) {
        collapseElement.classList.remove('show');
        buttonElement.classList.add('collapsed');
        buttonElement.setAttribute('aria-expanded', 'false');
      }
    });
  };

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id={`heading-${groupKey}-${stepKey}`}>
        <button
          className='accordion-button collapsed bg-white'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse-${groupKey}-${stepKey}`}
          aria-expanded='false'
          aria-controls={`collapse-${groupKey}-${stepKey}`}
        >
          <div className='d-flex justify-content-between align-items-center w-100'>
            <span>{step.tag.names[i18n.language]}</span>
            <span className='badge bg-secondary mx-2'>
              {answeredCount}/{totalCount}
            </span>
          </div>
        </button>
      </h2>
      <div
        id={`collapse-${groupKey}-${stepKey}`}
        className='accordion-collapse collapse'
        aria-labelledby={`heading-${groupKey}-${stepKey}`}
      >
        <div className='accordion-body bg-white'>
          {step.tag?.texts?.[i18n.language] && (
            <div className='alert alert-light mb-3' role='alert'>
              <div className='d-flex align-items-start'>
                <i
                  className='bi bi-info-circle-fill text-primary me-2'
                  aria-hidden='true'
                ></i>
                <div>{step.tag.texts[i18n.language]}</div>
              </div>
            </div>
          )}

          <div className='d-flex gap-2 mb-3'>
            <button
              type='button'
              className='btn btn-outline-primary btn-sm'
              onClick={expandAllQuestions}
            >
              <i className='bi bi-arrows-expand me-1' aria-hidden='true'></i>
              {t('accordion.expandAll')}
            </button>

            <button
              type='button'
              className='btn btn-outline-secondary btn-sm'
              onClick={collapseAllQuestions}
            >
              <i className='bi bi-arrows-collapse me-1' aria-hidden='true'></i>
              {t('accordion.collapseAll')}
            </button>
          </div>

          <div
            className='accordion'
            id={`accordion-${groupKey}-${stepKey}-questions`}
          >
            {step.questions.map((q) => (
              <QuestionAccordion
                key={q.id}
                groupKey={groupKey}
                stepKey={stepKey}
                question={q}
                language={i18n.language}
                answer={answers[q.id] || ''}
                onAnswerChange={onAnswerChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SemioticStepAccordion;
