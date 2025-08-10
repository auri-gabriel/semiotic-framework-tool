function QuestionAccordion({
  groupKey,
  stepKey,
  question,
  language,
  answer,
  onAnswerChange,
}) {
  return (
    <div className='accordion-item'>
      <h2
        className='accordion-header'
        id={`heading-${groupKey}-${stepKey}-q${question.id}`}
      >
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse-${groupKey}-${stepKey}-q${question.id}`}
          aria-expanded='false'
          aria-controls={`collapse-${groupKey}-${stepKey}-q${question.id}`}
        >
          {question.texts[language]}
        </button>
      </h2>
      <div
        id={`collapse-${groupKey}-${stepKey}-q${question.id}`}
        className='accordion-collapse collapse'
        aria-labelledby={`heading-${groupKey}-${stepKey}-q${question.id}`}
      >
        <div className='accordion-body'>
          <label htmlFor={`answer-${question.id}`} className='form-label'>
            {language === 'en' ? 'Your answer:' : 'Sua resposta:'}
          </label>
          <textarea
            id={`answer-${question.id}`}
            className='form-control'
            value={answer}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            rows={6}
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionAccordion;
