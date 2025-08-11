import QuestionAccordion from './QuestionAccordion';

function SemioticStepAccordion({
  groupKey,
  stepKey,
  step,
  language,
  answers,
  onAnswerChange,
}) {
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
          {step.tag.names[language]}
        </button>
      </h2>
      <div
        id={`collapse-${groupKey}-${stepKey}`}
        className='accordion-collapse collapse'
        aria-labelledby={`heading-${groupKey}-${stepKey}`}
      >
        <div className='accordion-body bg-white'>
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
