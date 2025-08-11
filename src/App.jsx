import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { getQuestionsGroupedBySemiotics } from './business/SemioticLadderManager';
import { exportAnswersAsXML, importAnswersFromXML } from './data/ImpexManager';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Works from './components/Works';
import Footer from './components/Footer';
import IniciarSection from './components/IniciarSection';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt_BR', label: 'Português (Brasil)' },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [semioticLadderGrouping, setSemioticLadderGrouping] = useState({});
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('answers');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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
    if (format === 'xml') {
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
      const imported = importAnswersFromXML(xmlString);
      setAnswers(imported);
    } catch (e) {
      alert('Failed to import XML.');
    }
  };

  if (loading) {
    const loadingText = language === 'pt_BR' ? 'Carregando...' : 'Loading...';
    return (
      <div className='d-flex flex-column align-items-center justify-content-center py-5'>
        <div className='spinner-border text-primary mb-3' role='status'>
          <span className='visually-hidden'>{loadingText}</span>
        </div>
        <div className='fw-semibold text-secondary'>{loadingText}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar
        language={language}
        setLanguage={setLanguage}
        LANGUAGES={LANGUAGES}
      />
      <Hero language={language} />
      <IniciarSection
        semioticLadderGrouping={semioticLadderGrouping}
        language={language}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        onImportXML={handleImportXML}
        onExport={handleExport}
      />
      <AboutUs language={language} />
      <Works language={language} />
      <Footer language={language} />
    </div>
  );
}
export default App;
