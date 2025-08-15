import SemioticStepAccordion from './SemioticStepAccordion';

function SemioticAccordion({ grouping, language, answers, onAnswerChange }) {
  return (
    <div className='accordion' id='semioticAccordion'>
      {Object.entries(grouping).map(([groupKey, group]) => (
        <div key={groupKey} className='mb-4'>
          <h2>{group.tag.names[language]}</h2>
          <div className='accordion' id={`accordion-${groupKey}`}>
            {Object.entries(group.steps).map(([stepKey, step]) => (
              <SemioticStepAccordion
                key={stepKey}
                groupKey={groupKey}
                stepKey={stepKey}
                step={step}
                language={language}
                answers={answers}
                onAnswerChange={onAnswerChange}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SemioticAccordion;
