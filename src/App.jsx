import 'bootstrap-icons/font/bootstrap-icons.css';
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

// Centralized translations for UI
const translations = {
  en: {
    loading: 'Loading...',
    iniciar: 'Start',
    framework: 'The Framework',
    aboutUs: 'About us',
    works: 'Works',
    export: 'Export',
    import: 'Import',
    exportJSON: 'Export JSON',
    exportCSV: 'Export CSV',
    exportXML: 'Export XML',
    importXML: 'Import XML',
    language: 'Language',
    copyright: '© 2025 GEInfoEdu. All Rights Reserved.',
    group: {
      framework: 'The Framework',
      iniciar: 'Start',
      aboutUs: 'About us',
      works: 'Works',
    },
    aboutUsText: 'This project is part of the GEInfoEdu Research Group',
    students: 'Students involved in the project:',
    hero: {
      title: 'The Framework',
      text: "In the development of software for the educational domain, a number of aspects must be taken into account, related to human information functions and the Information Technology (IT) Platform. Based on Ronald Stamper's Semiotic Framework, this framework adopts the Participatory Design approach, integrating Software Engineering in the development of software solutions for the Educational Domain.",
    },
  },
  pt_BR: {
    loading: 'Carregando...',
    iniciar: 'Iniciar',
    framework: 'O Framework',
    aboutUs: 'Sobre nós',
    works: 'Trabalhos',
    export: 'Exportar',
    import: 'Importar',
    exportJSON: 'Exportar JSON',
    exportCSV: 'Exportar CSV',
    exportXML: 'Exportar XML',
    importXML: 'Importar XML',
    language: 'Idioma',
    copyright: '© 2025 GEInfoEdu. Todos os direitos reservados.',
    group: {
      framework: 'O Framework',
      iniciar: 'Iniciar',
      aboutUs: 'Sobre nós',
      works: 'Trabalhos',
    },
    aboutUsText: 'Este projeto é parte do Grupo de Pesquisa GEInfoEdu',
    students: 'Estudantes envolvidos no projeto:',
    hero: {
      title: 'O Framework',
      text: 'No desenvolvimento de software para o domínio educacional, uma série de aspectos deve ser levada em conta, relacionadas às funções humanas da informação e à Plataforma de Tecnologia da Informação (TI). Baseado no Framework Semiótico de Ronald Stamper, este framework adota a abordagem do Design Participativo integrando a Engenharia de Software no desenvolvimento de soluções em software para o Domínio Educacional.',
    },
  },
};

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

  if (loading) return <div>{translations[language].loading}</div>;

  return (
    <div>
      <Navbar
        language={language}
        setLanguage={setLanguage}
        LANGUAGES={LANGUAGES}
        translations={translations}
      />
      <Hero language={language} translations={translations} />
      <div className='container py-4 px-3 mx-auto' id='iniciar'>
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
          language={language}
          translations={translations}
        />
      </div>
      <AboutUs language={language} translations={translations} />
      <Works language={language} translations={translations} />
      <Footer language={language} translations={translations} />
    </div>
  );
}

export default App;
