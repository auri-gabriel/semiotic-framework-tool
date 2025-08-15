import React, { useState } from 'react';
import SemioticAccordion from '../components/SemioticAccordion';
import BottomToolbar from '../components/BottomToolbar';
import { useTranslation } from 'react-i18next';
import { useSemioticData } from '../hooks/useSemioticData';
import { useAnswers } from '../hooks/useAnswers';
import { useExport } from '../hooks/useExport';
import SectionTitle from '../components/SectionTitle';

function StartSection() {
  const { t, i18n } = useTranslation();
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
        <SectionTitle title={t('start.title')} />
        <p className='mb-4' style={{ whiteSpace: 'pre-line' }}>
          {t('start.intro')}
        </p>

        {/* New Form Suggestion */}
        <div className='mb-3'>
          <p className='text-muted mb-0'>
            <i className='bi bi-info-circle me-2' aria-hidden='true'></i>
            {t('start.newFormSuggestion')}
          </p>
        </div>

        {/* Clear All Responses Button */}
        <div className='mb-4 text-start'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={handleClearClick}
            title={t('start.clearResponsesDesc')}
          >
            <i className='bi bi-trash me-2' aria-hidden='true'></i>
            {t('start.clearResponses')}
          </button>
        </div>

        <SemioticAccordion
          grouping={semioticLadderGrouping}
          language={i18n.language}
          answers={answers}
          onAnswerChange={updateAnswer}
        />
      </div>
      <BottomToolbar
        answers={answers}
        onImportXML={importAnswers}
        onExport={handleExport}
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
                {t('start.clearConfirmTitle')}
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
                    {t('start.clearConfirmMessage')}
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
                {t('start.cancelButton')}
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={handleClearConfirm}
              >
                <i className='bi bi-trash me-2' aria-hidden='true'></i>
                {t('start.clearConfirmButton')}
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

export default StartSection;
