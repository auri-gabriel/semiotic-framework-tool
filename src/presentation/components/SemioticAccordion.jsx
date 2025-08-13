import { useMemo } from 'react';
import SemioticStepAccordion from './SemioticStepAccordion';

function SemioticAccordion({ grouping, language, answers, onAnswerChange }) {
  // Calculate progress for each group
  const groupProgress = useMemo(() => {
    const progress = {};
    Object.entries(grouping).forEach(([groupKey, group]) => {
      const allQuestions = Object.values(group.steps).flatMap(
        (step) => step.questions
      );
      const answeredQuestions = allQuestions.filter(
        (q) => answers[q.id] && answers[q.id].trim() !== ''
      );
      progress[groupKey] = {
        total: allQuestions.length,
        answered: answeredQuestions.length,
        percentage:
          allQuestions.length > 0
            ? Math.round((answeredQuestions.length / allQuestions.length) * 100)
            : 0,
      };
    });
    return progress;
  }, [grouping, answers]);

  return (
    <div className='semiotic-accordion-container'>
      {Object.entries(grouping).map(([groupKey, group], index) => {
        const progress = groupProgress[groupKey];
        const isComplete =
          progress.answered === progress.total && progress.total > 0;

        return (
          <div
            key={groupKey}
            className='mb-5 fade-in'
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className='d-flex align-items-center justify-content-between mb-3'>
              <div className='d-flex align-items-center'>
                <div
                  className={`rounded-circle me-3 d-flex align-items-center justify-content-center ${
                    isComplete ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{ width: '48px', height: '48px', minWidth: '48px' }}
                >
                  {isComplete ? (
                    <i className='bi bi-check-lg text-white fs-5'></i>
                  ) : (
                    <span className='text-white fw-bold'>{index + 1}</span>
                  )}
                </div>
                <div>
                  <h3 className='mb-1 text-primary'>
                    {group.tag.names[language]}
                  </h3>
                  <small className='text-muted'>
                    {progress.answered} of {progress.total} questions completed
                  </small>
                </div>
              </div>
              <div className='text-end'>
                <div
                  className={`badge ${
                    isComplete
                      ? 'bg-success'
                      : progress.answered > 0
                      ? 'bg-warning'
                      : 'bg-secondary'
                  } mb-1`}
                >
                  {progress.percentage}%
                </div>
                <div
                  className='progress'
                  style={{ width: '80px', height: '6px' }}
                >
                  <div
                    className={`progress-bar ${
                      isComplete ? 'bg-success' : 'bg-primary'
                    }`}
                    role='progressbar'
                    style={{ width: `${progress.percentage}%` }}
                    aria-valuenow={progress.percentage}
                    aria-valuemin='0'
                    aria-valuemax='100'
                  ></div>
                </div>
              </div>
            </div>

            <div className='card border-0 shadow-sm'>
              <div className='card-body p-0'>
                <div className='accordion' id={`accordion-${groupKey}`}>
                  {Object.entries(group.steps).map(
                    ([stepKey, step], stepIndex) => (
                      <SemioticStepAccordion
                        key={stepKey}
                        groupKey={groupKey}
                        stepKey={stepKey}
                        step={step}
                        stepIndex={stepIndex}
                        language={language}
                        answers={answers}
                        onAnswerChange={onAnswerChange}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SemioticAccordion;
