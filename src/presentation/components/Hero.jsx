import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const heroTexts = {
  en: {
    title: 'The Framework',
    text: "In the development of software for the educational domain, a number of aspects must be taken into account, related to human information functions and the Information Technology (IT) Platform. Based on Ronald Stamper's Semiotic Framework, this framework adopts the Participatory Design approach, integrating Software Engineering in the development of software solutions for the Educational Domain.",
    ctaButton: 'Get Started',
  },
  pt_BR: {
    title: 'O Framework',
    text: 'No desenvolvimento de software para o domínio educacional, uma série de aspectos deve ser levada em conta, relacionadas às funções humanas da informação e à Plataforma de Tecnologia da Informação (TI). Baseado no Framework Semiótico de Ronald Stamper, este framework adota a abordagem do Design Participativo integrando a Engenharia de Software no desenvolvimento de soluções em software para o Domínio Educacional.',
    ctaButton: 'Iniciar',
  },
};

const Hero = () => {
  const { language } = useLanguage();
  const t = heroTexts[language];
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
              <h2 className='text-white'>{t.title}</h2>
              <p>{t.text}</p>
              <a
                href='#start'
                className='btn btn-primary mt-3'
                style={{ textDecoration: 'none' }}
              >
                {t.ctaButton}
              </a>
            </div>
          </div>
          {/* ...you can add an empty col-md-5 for spacing or image if needed... */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
