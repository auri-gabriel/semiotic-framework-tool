import React from 'react';
import { useTranslation } from 'react-i18next';

function ExportOverlay({ isExporting }) {
  const { t } = useTranslation();

  if (!isExporting) return null;

  return (
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
          <span className='visually-hidden'>{t('export.exporting')}</span>
        </div>
        <div className='fw-semibold text-light'>{t('export.exportingPDF')}</div>
      </div>
    </div>
  );
}

export default ExportOverlay;
