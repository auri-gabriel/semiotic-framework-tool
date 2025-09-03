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
    clearAnswers: 'Clear Answers Only',
    clearAnswersDesc: 'Delete all saved responses but keep custom definitions',
    clearAll: 'Clear All & Reset',
    clearAllDesc: 'Delete all saved responses and reset definitions to default',
    clearAnswersConfirmTitle: 'Clear Answers Only',
    clearAnswersConfirmMessage:
      'Are you sure you want to delete all your responses? Your custom definitions will be preserved.',
    clearAllConfirmTitle: 'Clear All & Reset Definitions',
    clearAllConfirmMessage:
      'Are you sure you want to delete all your responses and reset definitions to default? This action cannot be undone.',
    clearConfirmButton: 'Yes, Clear',
    clearAllConfirmButton: 'Yes, Clear All',
    cancelButton: 'Cancel',
  },
  pt_BR: {
    title: 'Iniciar',
    intro:
      'Pronto para começar?\nClique nos blocos abaixo para mostrar as perguntas. Em cada um, Clique na pergunta e responda. É simples e rápido — só ler e responder.',
    newFormSuggestion:
      'Começando um novo projeto? Tente limpar todas as respostas antigas primeiro.',
    clearAnswers: 'Limpar Apenas Respostas',
    clearAnswersDesc:
      'Excluir todas as respostas salvas mas manter definições personalizadas',
    clearAll: 'Limpar Tudo e Resetar',
    clearAllDesc:
      'Excluir todas as respostas salvas e resetar definições para o padrão',
    clearAnswersConfirmTitle: 'Limpar Apenas Respostas',
    clearAnswersConfirmMessage:
      'Tem certeza de que deseja excluir todas as suas respostas? Suas definições personalizadas serão preservadas.',
    clearAllConfirmTitle: 'Limpar Tudo e Resetar Definições',
    clearAllConfirmMessage:
      'Tem certeza de que deseja excluir todas as suas respostas e resetar as definições para o padrão? Esta ação não pode ser desfeita.',
    clearConfirmButton: 'Sim, Limpar',
    clearAllConfirmButton: 'Sim, Limpar Tudo',
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
  const [clearType, setClearType] = useState('answers'); // 'answers' or 'all'

  const t = texts[language];

  const handleClearAnswersClick = () => {
    setClearType('answers');
    setShowClearModal(true);
  };

  const handleClearAllClick = () => {
    setClearType('all');
    setShowClearModal(true);
  };

  const handleClearConfirm = () => {
    if (clearType === 'answers') {
      clearAnswers();
    } else {
      clearAnswers();
      resetToDefaultDefinitions();
    }
    setShowClearModal(false);
  };

  const handleClearCancel = () => {
    setShowClearModal(false);
  };

  const getCurrentModalTexts = () => {
    if (clearType === 'answers') {
      return {
        title: t.clearAnswersConfirmTitle,
        message: t.clearAnswersConfirmMessage,
        confirmButton: t.clearConfirmButton,
      };
    } else {
      return {
        title: t.clearAllConfirmTitle,
        message: t.clearAllConfirmMessage,
        confirmButton: t.clearAllConfirmButton,
      };
    }
  };

  const modalTexts = getCurrentModalTexts();

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

        {/* Clear Buttons */}
        <div className='mb-4 text-start d-flex gap-2 flex-wrap'>
          <button
            type='button'
            className='btn btn-warning'
            onClick={handleClearAnswersClick}
            title={t.clearAnswersDesc}
          >
            <i className='bi bi-eraser me-2' aria-hidden='true'></i>
            {t.clearAnswers}
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={handleClearAllClick}
            title={t.clearAllDesc}
          >
            <i className='bi bi-trash me-2' aria-hidden='true'></i>
            {t.clearAll}
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
            <div
              className={`modal-header ${
                clearType === 'answers' ? 'bg-warning' : 'bg-danger'
              } text-white border-0`}
            >
              <h5
                className={`modal-title fw-bold ${
                  clearType === 'answers' ? '' : 'text-white'
                }`}
                id='clearModalLabel'
              >
                <i
                  className='bi bi-exclamation-triangle-fill me-2'
                  aria-hidden='true'
                ></i>
                {modalTexts.title}
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
                    className={`${
                      clearType === 'answers' ? 'bg-warning' : 'bg-danger'
                    } bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center`}
                    style={{ width: '48px', height: '48px' }}
                  >
                    <i
                      className={`bi ${
                        clearType === 'answers'
                          ? 'bi-eraser text-warning'
                          : 'bi-trash text-danger'
                      } fs-4`}
                      aria-hidden='true'
                    ></i>
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <p className='mb-0 text-dark' style={{ lineHeight: '1.6' }}>
                    {modalTexts.message}
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
                className={`btn ${
                  clearType === 'answers' ? 'btn-warning' : 'btn-danger'
                }`}
                onClick={handleClearConfirm}
              >
                <i
                  className={`bi ${
                    clearType === 'answers' ? 'bi-eraser' : 'bi-trash'
                  } me-2`}
                  aria-hidden='true'
                ></i>
                {modalTexts.confirmButton}
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
