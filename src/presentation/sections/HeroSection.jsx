import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id='framework'
      className='hero-section d-flex align-items-center'
      style={{
        background: "url('hero-bg.png') center center/cover no-repeat",
        minHeight: '350px',
        position: 'relative',
      }}
    >
      <div className='container'>
        <div className='row'>
          <div className='my-5 col-12 col-md-6'>
            <div
              className='card bg-black text-white p-4 shadow m-0'
              style={{
                background: 'rgba(0,0,0,0.85)',
                border: 'none',
                maxWidth: '540px',
              }}
            >
              <h2 className='text-white'>{t('hero.title')}</h2>
              <p>{t('hero.description')}</p>
              <a
                href='#start'
                className='btn btn-primary mt-3'
                style={{ textDecoration: 'none' }}
              >
                <i className='bi bi-play-fill me-2' aria-hidden='true'></i>
                {t('hero.ctaButton')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
