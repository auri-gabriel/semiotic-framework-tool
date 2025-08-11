import { useState } from 'react';

const Navbar = ({ language, setLanguage, LANGUAGES, translations }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom'>
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
            <li className='nav-item'>
              <a className='nav-link' href='#framework'>
                {translations[language].group.framework}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#iniciar'>
                {translations[language].group.iniciar}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#sobre-nos'>
                {translations[language].group.aboutUs}
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#works'>
                {translations[language].group.works}
              </a>
            </li>
            <li className='nav-item d-flex align-items-center ms-3'>
              <label htmlFor='lang-select' className='form-label me-2 mb-0'>
                {translations[language].language}:
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
