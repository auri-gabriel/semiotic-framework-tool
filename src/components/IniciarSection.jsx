import SemioticAccordion from './SemioticAccordion';
import BottomToolbar from './BottomToolbar';

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

export default function IniciarSection({
  semioticLadderGrouping,
  language,
  answers,
  onAnswerChange,
  onImportXML,
  onExport,
  translations,
}) {
  const text = sectionTexts[language];

  return (
    <section className='py-5 border-top' id='iniciar'>
      <div className='container'>
        <h2 className='mb-3'>{text.title}</h2>
        <p className='mb-4' style={{ whiteSpace: 'pre-line' }}>
          {text.intro}
        </p>
        <SemioticAccordion
          grouping={semioticLadderGrouping}
          language={language}
          answers={answers}
          onAnswerChange={onAnswerChange}
        />
        <BottomToolbar
          answers={answers}
          onImportXML={onImportXML}
          onExport={onExport}
          language={language}
          translations={translations}
        />
      </div>
    </section>
  );
}
