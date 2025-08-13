import { useMemo } from 'react';
import SemioticAccordion from './SemioticAccordion';
import BottomToolbar from './BottomToolbar';
import ProgressIndicator from './ProgressIndicator';

const sectionTexts = {
  en: {
    title: 'Start Your Assessment',
    intro:
      'Ready to begin your semiotic analysis? Click the sections below to explore questions organized by the different levels of the semiotic framework. Answer each question thoughtfully to build a comprehensive understanding of your educational software project.',
    instructions: [
      'Click on each semiotic level to expand the questions',
      'Read each question carefully and provide thoughtful responses',
      'Your progress is automatically saved as you work',
      'Export your results when complete',
    ],
    instructionsTitle: 'How to Use This Tool',
  },
  pt_BR: {
    title: 'Inicie sua Avaliação',
    intro:
      'Pronto para começar sua análise semiótica? Clique nas seções abaixo para explorar perguntas organizadas pelos diferentes níveis do framework semiótico. Responda cada pergunta cuidadosamente para construir uma compreensão abrangente do seu projeto de software educacional.',
    instructions: [
      'Clique em cada nível semiótico para expandir as perguntas',
      'Leia cada pergunta cuidadosamente e forneça respostas reflexivas',
      'Seu progresso é salvo automaticamente enquanto trabalha',
      'Exporte seus resultados quando finalizar',
    ],
    instructionsTitle: 'Como Usar Esta Ferramenta',
  },
};

export default function StartSection({
  semioticLadderGrouping,
  language,
  answers,
  onAnswerChange,
  onImportXML,
  onExport,
  exportOnlyAnswered,
  setExportOnlyAnswered,
  exportEngOnlyAnswered,
  setExportEngOnlyAnswered,
}) {
  const text = sectionTexts[language];

  const progressData = useMemo(() => {
    const allQuestions = Object.values(semioticLadderGrouping)
      .flatMap((group) => Object.values(group.steps))
      .flatMap((step) => step.questions);

    const answeredQuestions = allQuestions.filter(
      (q) => answers[q.id] && answers[q.id].trim() !== ''
    );

    return {
      total: allQuestions.length,
      answered: answeredQuestions.length,
    };
  }, [semioticLadderGrouping, answers]);

  return (
    <section className='py-5 bg-light' id='start'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-lg-10'>
            <div className='text-center mb-5 fade-in'>
              <h2 className='display-6 fw-bold text-primary mb-3'>
                {text.title}
              </h2>
              <p
                className='lead text-muted mb-4 mx-auto'
                style={{ maxWidth: '600px' }}
              >
                {text.intro}
              </p>

              {progressData.total > 0 && (
                <div className='mb-4'>
                  <ProgressIndicator
                    current={progressData.answered}
                    total={progressData.total}
                    language={language}
                    className='mx-auto'
                    style={{ maxWidth: '400px' }}
                  />
                </div>
              )}
            </div>

            <div className='row mb-5'>
              <div className='col-12 col-md-8 mx-auto'>
                <div className='card border-0 shadow-sm fade-in-delay'>
                  <div className='card-body p-4'>
                    <h5 className='card-title text-primary mb-3'>
                      <i className='bi bi-lightbulb me-2'></i>
                      {text.instructionsTitle}
                    </h5>
                    <ul className='list-unstyled mb-0'>
                      {text.instructions.map((instruction, index) => (
                        <li
                          key={index}
                          className='mb-2 d-flex align-items-start'
                        >
                          <span
                            className='badge bg-primary rounded-pill me-3 mt-1'
                            style={{ minWidth: '24px' }}
                          >
                            {index + 1}
                          </span>
                          <span className='text-muted'>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='fade-in-delay'>
              <SemioticAccordion
                grouping={semioticLadderGrouping}
                language={language}
                answers={answers}
                onAnswerChange={onAnswerChange}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomToolbar
        answers={answers}
        onImportXML={onImportXML}
        onExport={onExport}
        language={language}
        exportOnlyAnswered={exportOnlyAnswered}
        setExportOnlyAnswered={setExportOnlyAnswered}
        exportEngOnlyAnswered={exportEngOnlyAnswered}
        setExportEngOnlyAnswered={setExportEngOnlyAnswered}
      />
    </section>
  );
}
