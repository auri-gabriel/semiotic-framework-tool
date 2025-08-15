import React from 'react';
import { useTranslation } from 'react-i18next';
import SemioticStepAccordion from './SemioticStepAccordion';

function SemioticAccordion({ grouping, answers, onAnswerChange }) {
  const { t, i18n } = useTranslation();

  return (
    <div className='accordion' id='semioticAccordion'>
      {Object.entries(grouping).map(([groupKey, group]) => (
        <div key={groupKey} className='mb-4'>
          <h2>{group.tag.names[i18n.language]}</h2>
          <div className='accordion' id={`accordion-${groupKey}`}>
            {Object.entries(group.steps).map(([stepKey, step]) => (
              <SemioticStepAccordion
                key={stepKey}
                groupKey={groupKey}
                stepKey={stepKey}
                step={step}
                language={i18n.language}
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
