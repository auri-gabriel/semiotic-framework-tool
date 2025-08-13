import { useState, useEffect } from 'react';

const navbarTexts = {
  en: {
    group: {
      framework: 'Framework',
      start: 'Start',
      aboutUs: 'About Us',
      works: 'Works',
    },
    language: 'Language',
    brand: 'Semiotic Framework Tool',
  },
  pt_BR: {
    group: {
      framework: 'Framework',
      start: 'Iniciar',
      aboutUs: 'Sobre Nós',
      works: 'Trabalhos',
    },
    language: 'Idioma',
    brand: 'Ferramenta Framework Semiótico',
  },
};

const Navbar = ({ language, setLanguage, LANGUAGES }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const t = navbarTexts[language];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light sticky-top ${
        scrolled ? 'shadow' : ''
      }`}
      style={{
        zIndex: 1000,
        transition: 'all 0.3s ease-in-out',
        backgroundColor: scrolled
          ? 'rgba(255, 255, 255, 0.98)'
          : 'rgba(255, 255, 255, 0.95)',
      }}
    >
      <div className='container'>
        <a
          className='navbar-brand d-flex align-items-center'
          href='#'
          onClick={handleNavLinkClick}
        >
          <div
            className='me-2 d-flex align-items-center justify-content-center bg-primary text-white rounded'
            style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
          >
            <i className='bi bi-diagram-3'></i>
          </div>
          <div className='d-flex flex-column'>
            <span
              className='fw-bold text-primary'
              style={{ fontSize: '1.1rem' }}
            >
              {t.brand}
            </span>
          </div>
        </a>

        <button
          className='navbar-toggler border-0'
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
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center'>
            <li className='nav-item'>
              <a
                className='nav-link px-3 py-2'
                href='#framework'
                onClick={handleNavLinkClick}
              >
                <i className='bi bi-house-door me-1'></i>
                {t.group.framework}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link px-3 py-2'
                href='#start'
                onClick={handleNavLinkClick}
              >
                <i className='bi bi-play-circle me-1'></i>
                {t.group.start}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link px-3 py-2'
                href='#sobre-nos'
                onClick={handleNavLinkClick}
              >
                <i className='bi bi-people me-1'></i>
                {t.group.aboutUs}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link px-3 py-2'
                href='#works'
                onClick={handleNavLinkClick}
              >
                <i className='bi bi-briefcase me-1'></i>
                {t.group.works}
              </a>
            </li>
            <li className='nav-item ms-lg-3'>
              <div className='d-flex align-items-center bg-light rounded px-3 py-2'>
                <label
                  htmlFor='lang-select'
                  className='form-label me-2 mb-0 text-muted small'
                >
                  <i className='bi bi-globe me-1'></i>
                  {t.language}:
                </label>
                <select
                  id='lang-select'
                  className='form-select form-select-sm border-0 bg-transparent'
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ minWidth: '120px' }}
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
