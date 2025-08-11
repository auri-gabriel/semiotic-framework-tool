import { useEffect, useState } from 'react';
import { getQuestionsGroupedBySemiotics } from './business/SemioticLadderManager';
import SemioticAccordion from './components/SemioticAccordion';
import BottomToolbar from './components/BottomToolbar';
import {
  exportAnswersAsJSON,
  exportAnswersAsCSV,
  exportAnswersAsXML,
} from './data/ExportManager';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Works from './components/Works';
import Footer from './components/Footer';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt_BR', label: 'Português (Brasil)' },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [semioticLadderGrouping, setSemioticLadderGrouping] = useState({});
  const [language, setLanguage] = useState('en');
  const [answers, setAnswers] = useState(() => {
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

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleExport = (format) => {
    let exportObj;
    if (format === 'json') {
      exportObj = exportAnswersAsJSON(answers);
    } else if (format === 'csv') {
      exportObj = exportAnswersAsCSV(answers);
    } else if (format === 'xml') {
      exportObj = exportAnswersAsXML(answers);
    }
    if (exportObj) {
      const blob = new Blob([exportObj.data], { type: exportObj.mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = exportObj.fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImportXML = (xmlString) => {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, 'application/xml');
      const answerNodes = xml.getElementsByTagName('answer');
      const imported = {};
      for (let node of answerNodes) {
        imported[node.getAttribute('id')] = node.textContent;
      }
      setAnswers(imported);
    } catch (e) {
      alert('Failed to import XML.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Hero />

      <div className='container py-4 px-3 mx-auto' id='iniciar'>
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
        <BottomToolbar
          answers={answers}
          onImportXML={handleImportXML}
          onExport={handleExport}
        />
      </div>

      <AboutUs />
      <Works />
      <Footer />
    </div>
  );
}

export default App;
