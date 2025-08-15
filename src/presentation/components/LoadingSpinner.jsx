import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const texts = {
  en: {
    loading: 'Loading...',
  },
  pt_BR: {
    loading: 'Carregando...',
  },
};

export function LoadingSpinner({ fallbackLanguage = 'en' }) {
  let language = fallbackLanguage;

  try {
    const languageContext = useLanguage();
    language = languageContext.language;
  } catch {
    // Fall back to default language if context is not available
    console.warn('LanguageContext not available, using fallback language');
  }

  const t = texts[language];

  return (
    <div className='d-flex flex-column align-items-center justify-content-center py-5'>
      <div className='spinner-border text-primary mb-3' role='status'>
        <span className='visually-hidden'>{t.loading}</span>
      </div>
      <div className='fw-semibold text-secondary'>{t.loading}</div>
    </div>
  );
}
