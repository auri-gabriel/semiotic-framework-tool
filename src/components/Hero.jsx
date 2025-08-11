import React from 'react';

const Hero = ({ language, translations }) => {
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
          <div className='col-12 col-md-6'>
            <div
              className='card bg-black text-white p-4 shadow m-0'
              style={{
                background: 'rgba(0,0,0,0.85)',
                border: 'none',
                maxWidth: '540px',
              }}
            >
              <h2 className='text-white'>
                {translations[language].hero.title}
              </h2>
              <p>{translations[language].hero.text}</p>
            </div>
          </div>
          {/* ...you can add an empty col-md-5 for spacing or image if needed... */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
