import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const navbarTexts = {
  en: {
    brand: 'Educational Semioparticipatory Framework',
    brandAcronym: 'ESF',
    group: {
      framework: 'The Framework',
      start: 'Start',
      aboutUs: 'About us',
      works: 'Works',
    },
    language: 'Language',
  },
  pt_BR: {
    brand: 'Framework Semioparticipativo Educacional',
    brandAcronym: 'FSE',
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
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, setLanguage, LANGUAGES } = useLanguage();
  const t = navbarTexts[language];

  const currentLanguage = LANGUAGES.find((lang) => lang.code === language);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen && !event.target.closest('.dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLanguageDropdownOpen]);

  return (
    <nav
      className='navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top'
      style={{
        zIndex: 1000,
      }}
    >
      <div className='container'>
        <a
          className='navbar-brand d-flex align-items-center fw-bold text-decoration-none text-white'
          href='#'
          title={t.brand}
        >
          <span
            className='me-3 p-2 bg-primary text-white d-flex align-items-center justify-content-center'
            style={{
              height: '32px',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            {t.brandAcronym}
          </span>
          <span className='d-none d-md-inline text-dark'>{t.brand}</span>
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
              <span className='form-label me-2 mb-0'>{t.language}:</span>
              <div className='dropdown'>
                <button
                  className='btn btn-outline-secondary dropdown-toggle d-flex align-items-center'
                  type='button'
                  onClick={() =>
                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                  }
                  aria-expanded={isLanguageDropdownOpen}
                  style={{ minWidth: '140px' }}
                >
                  <span className='me-2' style={{ fontSize: '1.2em' }}>
                    {currentLanguage?.flag}
                  </span>
                  <span className='d-none d-sm-inline'>
                    {currentLanguage?.label.split(' ')[0]}
                  </span>
                </button>
                <ul
                  className={`dropdown-menu${
                    isLanguageDropdownOpen ? ' show' : ''
                  }`}
                  style={{ minWidth: '160px' }}
                >
                  {LANGUAGES.map((lang) => (
                    <li key={lang.code}>
                      <button
                        className={`dropdown-item d-flex align-items-center${
                          lang.code === language ? ' active' : ''
                        }`}
                        type='button'
                        onClick={() => handleLanguageChange(lang.code)}
                      >
                        <span className='me-2' style={{ fontSize: '1.2em' }}>
                          {lang.flag}
                        </span>
                        <span>{lang.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
