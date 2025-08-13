import SemioticAccordion from './SemioticAccordion';
import BottomToolbar from './BottomToolbar';
import { useLanguage } from '../hooks/useLanguage';
import { useSemioticData } from '../hooks/useSemioticData';
import { useAnswers } from '../hooks/useAnswers';
import { useExport } from '../hooks/useExport';

const sectionTexts = {
  en: {
    title: 'Start',
    intro:
      "Ready to start?\nClick the blocks below to show the questions. For each one, click the question and answer it. It's simple and fast — just answer.",
  },
  pt_BR: {
    title: 'Iniciar',
    intro:
      'Pronto para começar?\nClique nos blocos abaixo para mostrar as perguntas. Em cada um, Clique na pergunta e responda. É simples e rápido — só ler e responder.',
  },
};

export default function StartSection() {
  const { language } = useLanguage();
  const { semioticLadderGrouping } = useSemioticData();
  const { answers, updateAnswer, importAnswers } = useAnswers();
  const {
    handleExport,
    exportOnlyAnswered,
    setExportOnlyAnswered,
    exportEngOnlyAnswered,
    setExportEngOnlyAnswered,
  } = useExport();

  const text = sectionTexts[language];

  return (
    <section className='pt-5 border-top' id='start'>
      <div className='container mb-5'>
        <h2 className='mb-3'>{text.title}</h2>
        <p className='mb-4' style={{ whiteSpace: 'pre-line' }}>
          {text.intro}
        </p>
        <SemioticAccordion
          grouping={semioticLadderGrouping}
          language={language}
          answers={answers}
          onAnswerChange={updateAnswer}
        />
      </div>
      <BottomToolbar
        answers={answers}
        onImportXML={importAnswers}
        onExport={handleExport}
        language={language}
        exportOnlyAnswered={exportOnlyAnswered}
        setExportOnlyAnswered={setExportOnlyAnswered}
        exportEngOnlyAnswered={exportEngOnlyAnswered}
        setExportEngOnlyAnswered={setExportEngOnlyAnswered}
      />
    </section>
  );
}
