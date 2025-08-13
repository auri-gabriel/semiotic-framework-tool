import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const navbarTexts = {
  en: {
    group: {
      framework: 'The Framework',
      start: 'Start',
      aboutUs: 'About us',
      works: 'Works',
    },
    language: 'Language',
  },
  pt_BR: {
    group: {
      framework: 'O Framework',
      start: 'Iniciar',
      aboutUs: 'Sobre nós',
      works: 'Trabalhos',
    },
    language: 'Idioma',
  },
};

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { language, setLanguage, LANGUAGES } = useLanguage();
  const t = navbarTexts[language];

  return (
    <nav
      className='navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top'
      style={{
        zIndex: 1000,
      }}
    >
      <div className='container'>
        <a className='navbar-brand' href='#'>
          <span role='img' aria-label='tool'>
            🛠️
          </span>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          aria-controls='navbarSupportedContent'
          aria-expanded={!isCollapsed}
          aria-label='Toggle navigation'
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`collapse navbar-collapse${isCollapsed ? '' : ' show'}`}
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item d-flex align-items-center'>
              <a className='nav-link' href='#framework'>
                {t.group.framework}
              </a>
            </li>
            <li className='nav-item d-flex align-items-center'>
              <a className='nav-link' href='#start'>
                {t.group.start}
              </a>
            </li>
            <li className='nav-item d-flex align-items-center'>
              <a className='nav-link' href='#sobre-nos'>
                {t.group.aboutUs}
              </a>
            </li>
            <li className='nav-item d-flex align-items-center'>
              <a className='nav-link' href='#works'>
                {t.group.works}
              </a>
            </li>
            <li className='nav-item d-flex align-items-center ms-3'>
              <label htmlFor='lang-select' className='form-label me-2 mb-0'>
                {t.language}:
              </label>
              <select
                id='lang-select'
                className='form-select d-inline-block w-auto'
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
