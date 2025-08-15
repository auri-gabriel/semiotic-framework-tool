import React from 'react';
import { useTranslation } from 'react-i18next';

function LoadingSpinner() {
  const { t } = useTranslation();

  return (
    <div className='d-flex flex-column align-items-center justify-content-center py-5'>
      <div className='spinner-border text-primary mb-3' role='status'>
        <span className='visually-hidden'>{t('loading.loading')}</span>
      </div>
      <div className='fw-semibold text-secondary'>{t('loading.loading')}</div>
    </div>
  );
}

export default LoadingSpinner;
