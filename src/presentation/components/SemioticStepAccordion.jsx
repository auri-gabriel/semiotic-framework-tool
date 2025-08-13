import { useMemo } from 'react';
import QuestionAccordion from './QuestionAccordion';

const semioticStepTexts = {
  en: {
    info: 'Information',
    showInfo: 'Show Information',
    hideInfo: 'Hide Information',
    questions: 'questions',
    answered: 'answered',
    of: 'of',
  },
  pt_BR: {
    info: 'Informações',
    showInfo: 'Mostrar Informações',
    hideInfo: 'Ocultar Informações',
    questions: 'perguntas',
    answered: 'respondidas',
    of: 'de',
  },
};

function SemioticStepAccordion({
  groupKey,
  stepKey,
  step,
  stepIndex,
  language,
  answers,
  onAnswerChange,
}) {
  const t = semioticStepTexts[language];

  const stepProgress = useMemo(() => {
    const answeredQuestions = step.questions.filter(
      (q) => answers[q.id] && answers[q.id].trim() !== ''
    );
    return {
      total: step.questions.length,
      answered: answeredQuestions.length,
      percentage:
        step.questions.length > 0
          ? Math.round((answeredQuestions.length / step.questions.length) * 100)
          : 0,
    };
  }, [step.questions, answers]);

  const isComplete =
    stepProgress.answered === stepProgress.total && stepProgress.total > 0;

  return (
    <div className='accordion-item border-0 mb-1'>
      <h2 className='accordion-header' id={`heading-${groupKey}-${stepKey}`}>
        <button
          className='accordion-button collapsed bg-white border-0 py-3'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse-${groupKey}-${stepKey}`}
          aria-expanded='false'
          aria-controls={`collapse-${groupKey}-${stepKey}`}
        >
          <div className='d-flex align-items-center justify-content-between w-100 me-3'>
            <div className='d-flex align-items-center'>
              <div
                className={`rounded me-3 d-flex align-items-center justify-content-center ${
                  isComplete
                    ? 'bg-success'
                    : stepProgress.answered > 0
                    ? 'bg-warning'
                    : 'bg-light border'
                }`}
                style={{ width: '32px', height: '32px', minWidth: '32px' }}
              >
                {isComplete ? (
                  <i className='bi bi-check text-white'></i>
                ) : stepProgress.answered > 0 ? (
                  <i className='bi bi-clock text-white'></i>
                ) : (
                  <span className='text-muted small fw-bold'>
                    {stepIndex + 1}
                  </span>
                )}
              </div>
              <div>
                <div className='fw-semibold text-dark'>
                  {step.tag.names[language]}
                </div>
                <small className='text-muted'>
                  {stepProgress.answered} {t.of} {stepProgress.total}{' '}
                  {t.questions} {t.answered}
                </small>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <span
                className={`badge me-3 ${
                  isComplete
                    ? 'bg-success'
                    : stepProgress.answered > 0
                    ? 'bg-warning'
                    : 'bg-secondary'
                }`}
              >
                {stepProgress.percentage}%
              </span>
            </div>
          </div>
        </button>
      </h2>
      <div
        id={`collapse-${groupKey}-${stepKey}`}
        className='accordion-collapse collapse'
        aria-labelledby={`heading-${groupKey}-${stepKey}`}
      >
        <div className='accordion-body bg-light p-4'>
          {step.tag?.texts?.[language] && (
            <div className='mb-4'>
              <button
                type='button'
                className='btn btn-outline-primary btn-sm'
                data-bs-toggle='collapse'
                data-bs-target={`#collapse-${groupKey}-${stepKey}-info`}
                aria-expanded='false'
                aria-controls={`collapse-${groupKey}-${stepKey}-info`}
              >
                <i className='bi bi-info-circle me-2'></i>
                {t.showInfo}
              </button>

              <div
                className='collapse mt-3'
                id={`collapse-${groupKey}-${stepKey}-info`}
              >
                <div className='alert alert-info border-0 shadow-sm'>
                  <div className='d-flex justify-content-between align-items-start'>
                    <div className='flex-grow-1'>
                      <h6 className='alert-heading'>
                        <i className='bi bi-lightbulb me-2'></i>
                        {t.info}
                      </h6>
                      <div className='mb-0'>{step.tag.texts[language]}</div>
                    </div>
                    <button
                      type='button'
                      className='btn-close ms-3'
                      data-bs-toggle='collapse'
                      data-bs-target={`#collapse-${groupKey}-${stepKey}-info`}
                      aria-label='Close'
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className='accordion'
            id={`accordion-${groupKey}-${stepKey}-questions`}
          >
            {step.questions.map((q, questionIndex) => (
              <QuestionAccordion
                key={q.id}
                groupKey={groupKey}
                stepKey={stepKey}
                question={q}
                questionIndex={questionIndex}
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
