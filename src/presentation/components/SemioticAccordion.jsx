/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import SemioticStepAccordion from './SemioticStepAccordion';

const SemioticAccordion = ({ grouping, language, answers, onAnswerChange }) => {
  return (
    <div className='accordion' id='semioticAccordion'>
      {Object.entries(grouping).map(([groupKey, group]) => (
        <div key={groupKey} className='mb-4'>
          <h3>{group.tag.names[language]}</h3>
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
};

export default SemioticAccordion;
