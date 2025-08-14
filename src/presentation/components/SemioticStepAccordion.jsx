import QuestionAccordion from './QuestionAccordion';

const semioticStepTexts = {
  en: {
    info: 'Info',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
  },
  pt_BR: {
    info: 'Informações',
    expandAll: 'Expandir Todas',
    collapseAll: 'Recolher Todas',
  },
};

function SemioticStepAccordion({
  groupKey,
  stepKey,
  step,
  language,
  answers,
  onAnswerChange,
}) {
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
            <span>{step.tag.names[language]}</span>
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
          <div className='d-flex gap-2 mb-3'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-toggle='collapse'
              data-bs-target={`#collapse-${groupKey}-${stepKey}-info`}
            >
              <i className='bi bi-info-circle-fill me-2'></i>
              {semioticStepTexts[language].info}
            </button>

            <button
              type='button'
              className='btn btn-outline-primary btn-sm'
              onClick={expandAllQuestions}
            >
              <i className='bi bi-arrows-expand me-1'></i>
              {semioticStepTexts[language].expandAll}
            </button>

            <button
              type='button'
              className='btn btn-outline-secondary btn-sm'
              onClick={collapseAllQuestions}
            >
              <i className='bi bi-arrows-collapse me-1'></i>
              {semioticStepTexts[language].collapseAll}
            </button>
          </div>

          <div
            className='collapse alert alert-light alert-dismissible fade'
            id={`collapse-${groupKey}-${stepKey}-info`}
            role='alert'
          >
            {step.tag?.texts?.[language]}
            <button
              type='button'
              className='btn-close'
              data-bs-toggle='collapse'
              data-bs-target={`#collapse-${groupKey}-${stepKey}-info`}
              aria-label='Close'
            ></button>
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
                language={language}
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
