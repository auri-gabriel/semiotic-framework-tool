import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const texts = {
  en: {
    copyright: '© 2025 GEInfoEdu.',
    licensedUnder: 'Licensed under',
    github: 'Source code on GitHub',
  },
  pt_BR: {
    copyright: '© 2025 GEInfoEdu.',
    licensedUnder: 'Licenciado sob',
    github: 'Código-fonte no GitHub',
  },
};

const FooterSection = () => {
  const { language } = useLanguage();
  const t = texts[language];
  return (
    <footer className='bg-dark text-white text-center py-5'>
      <div className='container'>
        <small className='d-flex flex-column gap-1'>
          <span>{t.copyright}</span>
          <span>
            {t.licensedUnder}{' '}
            <a
              href='https://www.gnu.org/licenses/gpl-3.0.html'
              target='_blank'
              rel='noreferrer'
              className='link-light'
            >
              GNU GPL v3
            </a>
          </span>
          <a
            href='https://github.com/auri-gabriel/semiotic-framework-tool'
            target='_blank'
            rel='noreferrer'
            className='link-light'
          >
            {t.github}
          </a>
        </small>
      </div>
    </footer>
  );
};

export default FooterSection;
