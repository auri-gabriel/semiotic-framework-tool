import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { getQuestionsGroupedBySemiotics } from './business/SemioticLadderManager';
import SemioticAccordion from './components/SemioticAccordion';
import BottomToolbar from './components/BottomToolbar';
import {
  exportAnswersAsXML,
  importAnswersFromXML,
  exportSemioticLadderDoc,
  exportEngineeringLayers,
} from './data/ImpexManager';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Works from './components/Works';
import Footer from './components/Footer';
import StartSection from './components/StartSection';

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
  const [exportOnlyAnswered, setExportOnlyAnswered] = useState(false);
  const [exportEngOnlyAnswered, setExportEngOnlyAnswered] = useState(false);
  const [exporting, setExporting] = useState(false);

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

  const handleExport = async (format, options = {}) => {
    let exportObj;
    if (format === 'xml') {
      exportObj = exportAnswersAsXML(answers);
      if (exportObj) {
        const blob = new Blob([exportObj.data], { type: exportObj.mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = exportObj.fileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
    if (format === 'semiotic-ladder') {
      setExporting(true);
      await exportSemioticLadderDoc({
        grouping: semioticLadderGrouping,
        answers,
        onlyAnswered: options.onlyAnswered,
        language,
        format: options.format,
        onExportStart: () => setExporting(true),
        onExportEnd: () => setExporting(false),
      });
      setExporting(false);
    }
    if (format === 'engineering-layers') {
      setExporting(true);
      try {
        await exportEngineeringLayers({
          questions: Object.values(semioticLadderGrouping)
            .flatMap((group) => Object.values(group.steps))
            .flatMap((step) => step.questions),
          answers,
          onlyAnswered: options.onlyAnswered,
          language,
          format: options.format,
          onExportStart: () => setExporting(true),
          onExportEnd: () => setExporting(false),
        });
      } finally {
        setExporting(false);
      }
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
    <div className='min-vh-100 d-flex flex-column'>
      {/* Overlay for exporting */}
      {exporting && (
        <div
          className='position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center'
          style={{
            background: 'rgba(0,0,0,0.6)',
            zIndex: 2000,
            pointerEvents: 'all',
          }}
        >
          <div className='bg-secondary shadow-lg p-5 d-flex flex-column align-items-center'>
            <div className='spinner-border text-light mb-3' role='status'>
              <span className='visually-hidden'>
                {language === 'pt_BR' ? 'Exportando...' : 'Exporting...'}
              </span>
            </div>
            <div className='fw-semibold text-light'>
              {language === 'pt_BR' ? 'Exportando PDF...' : 'Exporting PDF...'}
            </div>
          </div>
        </div>
      )}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        LANGUAGES={LANGUAGES}
      />
      <main className='flex-grow-1'>
        <Hero language={language} />
        <StartSection
          semioticLadderGrouping={semioticLadderGrouping}
          language={language}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onImportXML={handleImportXML}
          onExport={handleExport}
          exportOnlyAnswered={exportOnlyAnswered}
          setExportOnlyAnswered={setExportOnlyAnswered}
          exportEngOnlyAnswered={exportEngOnlyAnswered}
          setExportEngOnlyAnswered={setExportEngOnlyAnswered}
        />
        <AboutUs language={language} />
        <Works language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}
export default App;
