import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export function LoadingSpinner({ fallbackLanguage = 'en' }) {
  let language = fallbackLanguage;

  try {
    const languageContext = useLanguage();
    language = languageContext.language;
  } catch {
    // Fall back to default language if context is not available
    console.warn('LanguageContext not available, using fallback language');
  }

  const loadingText = language === 'pt_BR' ? 'Carregando...' : 'Loading...';

  return (
    <div className='d-flex flex-column align-items-center justify-content-center py-5'>
      <div className='spinner-border text-primary mb-3' role='status'>
        <span className='visually-hidden'>{loadingText}</span>
      </div>
      <div className='fw-semibold text-secondary'>{loadingText}</div>
    </div>
  );
}
