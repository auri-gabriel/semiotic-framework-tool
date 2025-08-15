import React, { useState } from 'react';
import SemioticAccordion from '../components/SemioticAccordion';
import BottomToolbar from '../components/BottomToolbar';
import { useLanguage } from '../hooks/useLanguage';
import { useSemioticData } from '../hooks/useSemioticData';
import { useAnswers } from '../hooks/useAnswers';
import { useExport } from '../hooks/useExport';
import SectionTitle from '../components/SectionTitle';

const texts = {
  en: {
    title: 'Start',
    intro:
      "Ready to start?\nClick the blocks below to show the questions. For each one, click the question and answer it. It's simple and fast — just answer.",
    newFormSuggestion:
      'Starting a new project? Try clearing all the old responses first.',
    clearResponses: 'Clear All Responses',
    clearResponsesDesc: 'Delete all saved responses and reset definitions',
    clearConfirmTitle: 'Clear All Responses',
    clearConfirmMessage:
      'Are you sure you want to delete all your responses and reset definitions to default? This action cannot be undone.',
    clearConfirmButton: 'Yes, Clear All',
    cancelButton: 'Cancel',
  },
  pt_BR: {
    title: 'Iniciar',
    intro:
      'Pronto para começar?\nClique nos blocos abaixo para mostrar as perguntas. Em cada um, Clique na pergunta e responda. É simples e rápido — só ler e responder.',
    newFormSuggestion:
      'Começando um novo projeto? Tente limpar todas as respostas antigas primeiro.',
    clearResponses: 'Limpar Todas as Respostas',
    clearResponsesDesc:
      'Excluir todas as respostas salvas e resetar definições',
    clearConfirmTitle: 'Limpar Todas as Respostas',
    clearConfirmMessage:
      'Tem certeza de que deseja excluir todas as suas respostas e resetar as definições para o padrão? Esta ação não pode ser desfeita.',
    clearConfirmButton: 'Sim, Limpar Tudo',
    cancelButton: 'Cancelar',
  },
};

export default function StartSection() {
  const { language } = useLanguage();
  const { semioticLadderGrouping } = useSemioticData();
  const {
    answers,
    updateAnswer,
    importAnswers,
    clearAnswers,
    resetToDefaultDefinitions,
  } = useAnswers();
  const {
    handleExport,
    exportOnlyAnswered,
    setExportOnlyAnswered,
    exportEngOnlyAnswered,
    setExportEngOnlyAnswered,
  } = useExport();

  const [showClearModal, setShowClearModal] = useState(false);

  const t = texts[language];

  const handleClearClick = () => {
    setShowClearModal(true);
  };

  const handleClearConfirm = () => {
    clearAnswers();
    resetToDefaultDefinitions();
    setShowClearModal(false);
  };

  const handleClearCancel = () => {
    setShowClearModal(false);
  };

  return (
    <section className='pt-5 border-top' id='start'>
      <div className='container mb-5'>
        <SectionTitle title={t.title} />
        <p className='mb-4' style={{ whiteSpace: 'pre-line' }}>
          {t.intro}
        </p>

        {/* New Form Suggestion */}
        <div className='mb-3'>
          <p className='text-muted mb-0'>
            <i className='bi bi-info-circle me-2' aria-hidden='true'></i>
            {t.newFormSuggestion}
          </p>
        </div>

        {/* Clear All Responses Button */}
        <div className='mb-4 text-start'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={handleClearClick}
            title={t.clearResponsesDesc}
          >
            <i className='bi bi-trash me-2' aria-hidden='true'></i>
            {t.clearResponses}
          </button>
        </div>

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

      {/* Clear Confirmation Modal */}
      <div
        className={`modal fade ${showClearModal ? 'show' : ''}`}
        style={{ display: showClearModal ? 'block' : 'none' }}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='clearModalLabel'
        aria-hidden={!showClearModal}
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content border-0 shadow-lg'>
            <div className='modal-header bg-danger text-white border-0'>
              <h5 className='modal-title fw-bold' id='clearModalLabel'>
                <i
                  className='bi bi-exclamation-triangle-fill me-2'
                  aria-hidden='true'
                ></i>
                {t.clearConfirmTitle}
              </h5>
              <button
                type='button'
                className='btn-close btn-close-white'
                aria-label='Close'
                onClick={handleClearCancel}
              ></button>
            </div>
            <div className='modal-body px-4 py-4'>
              <div className='d-flex align-items-start'>
                <div className='flex-shrink-0 me-3'>
                  <div
                    className='bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center'
                    style={{ width: '48px', height: '48px' }}
                  >
                    <i
                      className='bi bi-trash text-danger fs-4'
                      aria-hidden='true'
                    ></i>
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <p className='mb-0 text-dark' style={{ lineHeight: '1.6' }}>
                    {t.clearConfirmMessage}
                  </p>
                </div>
              </div>
            </div>
            <div className='modal-footer border-0 px-4 pb-4'>
              <button
                type='button'
                className='btn btn-outline-secondary me-2'
                onClick={handleClearCancel}
              >
                {t.cancelButton}
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={handleClearConfirm}
              >
                <i className='bi bi-trash me-2' aria-hidden='true'></i>
                {t.clearConfirmButton}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal backdrop */}
      {showClearModal && (
        <div
          className='modal-backdrop fade show'
          onClick={handleClearCancel}
        ></div>
      )}
    </section>
  );
}
