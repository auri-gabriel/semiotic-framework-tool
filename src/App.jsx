import { useEffect, useState } from 'react';
import { getQuestionsGroupedBySemiotics } from './business/SemioticLadderManager';
import SemioticAccordion from './components/SemioticAccordion';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt_BR', label: 'Português (Brasil)' },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [semioticLadderGrouping, setSemioticLadderGrouping] = useState({});
  const [language, setLanguage] = useState('en');
  const [answers, setAnswers] = useState(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem('answers');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    async function fetchData() {
      const semioticLadderGroupingData = await getQuestionsGroupedBySemiotics();
      setLoading(false);
      setSemioticLadderGrouping(semioticLadderGroupingData);
    }
    fetchData();
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

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
      <SemioticAccordion
        grouping={semioticLadderGrouping}
        language={language}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />
    </div>
  );
}

export default App;
