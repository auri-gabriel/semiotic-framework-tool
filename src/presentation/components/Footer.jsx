import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const copyrightTexts = {
  en: '© 2025 GEInfoEdu. All Rights Reserved.',
  pt_BR: '© 2025 GEInfoEdu. Todos os direitos reservados.',
};

const Footer = () => {
  const { language } = useLanguage();
  return (
    <footer className='bg-dark text-white text-center py-5'>
      <div className='container'>
        <small>{copyrightTexts[language]}</small>
      </div>
    </footer>
  );
};

export default Footer;
