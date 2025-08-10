import { useEffect, useState } from 'react';
import { getQuestionsGroupedBySemiotics } from './business/SemioticLadderManager';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt_BR', label: 'Português (Brasil)' },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [semioticLadderGrouping, setSemioticLadderGrouping] = useState({});
  const [language, setLanguage] = useState('en');
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function fetchData() {
      const semioticLadderGroupingData = await getQuestionsGroupedBySemiotics();
      setLoading(false);
      setSemioticLadderGrouping(semioticLadderGroupingData);
    }
    fetchData();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='container py-4 px-3 mx-auto'>
      <div className='mb-4'>
        <label htmlFor='lang-select' className='form-label me-2'>
          Language:
        </label>
        <select
          id='lang-select'
          className='form-select d-inline-block w-auto'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <Accordion
        grouping={semioticLadderGrouping}
        language={language}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />
    </div>
  );
}

function Accordion({ grouping, language, answers, onAnswerChange }) {
  return (
    <div className='accordion' id='semioticAccordion'>
      {Object.entries(grouping).map(([groupKey, group]) => (
        <div key={groupKey} className='mb-4'>
          <h2>{group.tag.names[language]}</h2>
          <div className='accordion' id={`accordion-${groupKey}`}>
            {Object.entries(group.steps).map(([stepKey, step]) => (
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
                    {step.tag.names[language]}
                  </button>
                </h2>
                <div
                  id={`collapse-${groupKey}-${stepKey}`}
                  className='accordion-collapse collapse'
                  aria-labelledby={`heading-${groupKey}-${stepKey}`}
                >
                  <div className='accordion-body'>
                    <div
                      className='accordion'
                      id={`accordion-${groupKey}-${stepKey}-questions`}
                    >
                      {step.questions.map((q) => (
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
                              {q.texts[language]}
                            </button>
                          </h2>
                          <div
                            id={`collapse-${groupKey}-${stepKey}-q${q.id}`}
                            className='accordion-collapse collapse'
                            aria-labelledby={`heading-${groupKey}-${stepKey}-q${q.id}`}
                          >
                            <div className='accordion-body'>
                              <label
                                htmlFor={`answer-${q.id}`}
                                className='form-label'
                              >
                                {language === 'en'
                                  ? 'Your answer:'
                                  : 'Sua resposta:'}
                              </label>
                              <input
                                id={`answer-${q.id}`}
                                className='form-control'
                                type='text'
                                value={answers[q.id] || ''}
                                onChange={(e) =>
                                  onAnswerChange(q.id, e.target.value)
                                }
                              />
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
