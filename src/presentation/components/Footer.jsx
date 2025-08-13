import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const footerTexts = {
  en: {
    copyright: '© 2025 GEInfoEdu. All Rights Reserved.',
    description: 'Educational Semioparticipatory Framework Tool',
    researchGroup: 'Research Group GEInfoEdu',
    university: 'Universidade Federal do Pampa - Campus Alegrete',
    license: 'Open Educational Resource',
    contact: 'Contact',
    links: 'Useful Links',
    framework: 'The Framework',
    aboutUs: 'About Us',
    works: 'Works',
    start: 'Start',
    developed: 'Developed with',
    by: 'by the GEInfoEdu team',
  },
  pt_BR: {
    copyright: '© 2025 GEInfoEdu. Todos os direitos reservados.',
    description: 'Ferramenta Framework Semioparticipativo Educacional',
    researchGroup: 'Grupo de Pesquisa GEInfoEdu',
    university: 'Universidade Federal do Pampa - Campus Alegrete',
    license: 'Recurso Educacional Aberto',
    contact: 'Contato',
    links: 'Links Úteis',
    framework: 'O Framework',
    aboutUs: 'Sobre Nós',
    works: 'Trabalhos',
    start: 'Iniciar',
    developed: 'Desenvolvido com',
    by: 'pela equipe GEInfoEdu',
  },
};

const Footer = () => {
  const { language } = useLanguage();
  const t = footerTexts[language];

  return (
    <footer className='bg-dark text-white py-5'>
      <div className='container'>
        <div className='row gy-4'>
          {/* About Section */}
          <div className='col-lg-4 col-md-6'>
            <div className='d-flex align-items-center mb-3'>
              <span
                className='me-3 p-2 bg-primary text-white d-flex align-items-center justify-content-center fw-bold'
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: '1rem',
                }}
              >
                ESF
              </span>
              <div>
                <h5 className='mb-1 fw-bold text-white'>{t.description}</h5>
                <small className='text-light'>{t.license}</small>
              </div>
            </div>
            <p className='text-light mb-2'>{t.researchGroup}</p>
            <p className='text-light small mb-3'>{t.university}</p>
            <div className='d-flex gap-3'>
              <a
                href='https://unipampa.edu.br'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white'
                title='UNIPAMPA'
              >
                <i className='bi bi-globe fs-5'></i>
              </a>
              <a
                href='https://github.com/auri-gabriel'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white'
                title='GitHub'
              >
                <i className='bi bi-github fs-5'></i>
              </a>
              <a
                href='mailto:geinfoedu@unipampa.edu.br'
                className='text-white'
                title='Email'
              >
                <i className='bi bi-envelope fs-5'></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='col-lg-2 col-md-6'>
            <h6 className='fw-bold mb-3 text-white'>{t.links}</h6>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <a
                  href='#framework'
                  className='text-light text-decoration-none hover-primary'
                >
                  {t.framework}
                </a>
              </li>
              <li className='mb-2'>
                <a
                  href='#start'
                  className='text-light text-decoration-none hover-primary'
                >
                  {t.start}
                </a>
              </li>
              <li className='mb-2'>
                <a
                  href='#sobre-nos'
                  className='text-light text-decoration-none hover-primary'
                >
                  {t.aboutUs}
                </a>
              </li>
              <li className='mb-2'>
                <a
                  href='#works'
                  className='text-light text-decoration-none hover-primary'
                >
                  {t.works}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className='col-lg-3 col-md-6'>
            <h6 className='fw-bold mb-3 text-white'>{t.contact}</h6>
            <div className='mb-2'>
              <i className='bi bi-geo-alt me-2'></i>
              <small className='text-light'>
                Campus Alegrete
                <br />
                Av. Tiarajú, 810 - Ibirapuitã
                <br />
                Alegrete - RS, 97546-550
              </small>
            </div>
            <div className='mb-2'>
              <i className='bi bi-envelope me-2'></i>
              <a
                href='mailto:geinfoedu@unipampa.edu.br'
                className='text-light text-decoration-none hover-primary small'
              >
                geinfoedu@unipampa.edu.br
              </a>
            </div>
          </div>

          {/* Logo */}
          <div className='col-lg-3 col-md-6 text-center text-lg-end'>
            <img
              src='/logo-geinfoedu.png'
              alt='GEInfoEdu Logo'
              className='img-fluid mb-3'
              style={{ maxHeight: '80px' }}
            />
            <div className='small text-light'>
              <p className='mb-1 text-light'>
                {t.developed} <i className='bi bi-heart-fill text-danger'></i>
              </p>
              <p className='mb-0 text-light'>{t.by}</p>
            </div>
          </div>
        </div>

        <hr className='my-4 border-secondary' />

        {/* Copyright */}
        <div className='row align-items-center'>
          <div className='col-md-6 text-center text-md-start'>
            <small className='text-light'>{t.copyright}</small>
          </div>
          <div className='col-md-6 text-center text-md-end'>
            <small className='text-light'>
              React • Vite • Bootstrap • {new Date().getFullYear()}
            </small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-primary:hover {
          color: #21409a !important;
          transition: color 0.2s ease;
        }

        footer a:hover i {
          transform: scale(1.1);
          transition: transform 0.2s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
