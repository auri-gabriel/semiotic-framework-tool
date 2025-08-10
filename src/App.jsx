import { useEffect, useState } from 'react';
import { getQuestionsGroupedBySemiotics } from './business/SemioticLadderManager';

function App() {
  const [loading, setLoading] = useState(true);
  const [semioticLadderGrouping, setSemioticLadderGrouping] = useState({});

  useEffect(() => {
    async function fetchData() {
      const semioticLadderGroupingData = await getQuestionsGroupedBySemiotics();
      setLoading(false);
      setSemioticLadderGrouping(semioticLadderGroupingData);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='container py-4 px-3 mx-auto'>
      <Accordion grouping={semioticLadderGrouping} />
    </div>
  );
}

function Accordion({ grouping }) {
  return (
    <div className='accordion' id='semioticAccordion'>
      {Object.entries(grouping).map(([groupKey, group]) => (
        <div key={groupKey} className='mb-4'>
          <h2>{group.tag.names.en}</h2>
          <div className='accordion' id={`accordion-${groupKey}`}>
            {Object.entries(group.steps).map(([stepKey, step], idx) => (
              <div className='accordion-item' key={stepKey}>
                <h2
                  className='accordion-header'
                  id={`heading-${groupKey}-${stepKey}`}
                >
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#collapse-${groupKey}-${stepKey}`}
                    aria-expanded='false'
                    aria-controls={`collapse-${groupKey}-${stepKey}`}
                  >
                    {step.tag.names.en}
                  </button>
                </h2>
                <div
                  id={`collapse-${groupKey}-${stepKey}`}
                  className='accordion-collapse collapse'
                  aria-labelledby={`heading-${groupKey}-${stepKey}`}
                  data-bs-parent={`#accordion-${groupKey}`}
                >
                  <div className='accordion-body'>
                    <div
                      className='accordion'
                      id={`accordion-${groupKey}-${stepKey}-questions`}
                    >
                      {step.questions.map((q, qIdx) => (
                        <div className='accordion-item' key={q.id}>
                          <h2
                            className='accordion-header'
                            id={`heading-${groupKey}-${stepKey}-q${q.id}`}
                          >
                            <button
                              className='accordion-button collapsed'
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target={`#collapse-${groupKey}-${stepKey}-q${q.id}`}
                              aria-expanded='false'
                              aria-controls={`collapse-${groupKey}-${stepKey}-q${q.id}`}
                            >
                              {q.texts.en}
                            </button>
                          </h2>
                          <div
                            id={`collapse-${groupKey}-${stepKey}-q${q.id}`}
                            className='accordion-collapse collapse'
                            aria-labelledby={`heading-${groupKey}-${stepKey}-q${q.id}`}
                            data-bs-parent={`#accordion-${groupKey}-${stepKey}-questions`}
                          >
                            <div className='accordion-body'>
                              <strong>EN:</strong> {q.texts.en}
                              <br />
                              <strong>PT-BR:</strong> {q.texts.pt_BR}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
