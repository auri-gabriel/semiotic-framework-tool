import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const texts = {
  en: {
    copyright: '© 2025 GEInfoEdu. All Rights Reserved.',
  },
  pt_BR: {
    copyright: '© 2025 GEInfoEdu. Todos os direitos reservados.',
  },
};

const FooterSection = () => {
  const { language } = useLanguage();
  const t = texts[language];
  return (
    <footer className='bg-dark text-white text-center py-5'>
      <div className='container'>
        <small>{t.copyright}</small>
      </div>
    </footer>
  );
};

export default FooterSection;
