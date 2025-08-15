import React, { createContext } from 'react';
import { LANGUAGES } from '../constants/languages';

const LanguageContext = createContext();

export function LanguageProvider({ children, language, setLanguage }) {
  const value = {
    language,
    setLanguage,
    LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext };
