import React from 'react';

const heroTexts = {
  en: {
    title: 'The Semiotic Framework',
    subtitle: 'Educational Software Development Tool',
    text: "In the development of software for the educational domain, a number of aspects must be taken into account, related to human information functions and the Information Technology (IT) Platform. Based on Ronald Stamper's Semiotic Framework, this framework adopts the Participatory Design approach, integrating Software Engineering in the development of software solutions for the Educational Domain.",
    ctaButton: 'Get Started',
    features: [
      'Participatory Design Approach',
      'Software Engineering Integration',
      'Educational Domain Focus',
    ],
  },
  pt_BR: {
    title: 'O Framework Semiótico',
    subtitle: 'Ferramenta de Desenvolvimento de Software Educacional',
    text: 'No desenvolvimento de software para o domínio educacional, uma série de aspectos deve ser levada em conta, relacionadas às funções humanas da informação e à Plataforma de Tecnologia da Informação (TI). Baseado no Framework Semiótico de Ronald Stamper, este framework adota a abordagem do Design Participativo integrando a Engenharia de Software no desenvolvimento de soluções em software para o Domínio Educacional.',
    ctaButton: 'Iniciar',
    features: [
      'Abordagem de Design Participativo',
      'Integração de Engenharia de Software',
      'Foco no Domínio Educacional',
    ],
  },
};

const Hero = ({ language }) => {
  const t = heroTexts[language];

  return (
    <section
      id='framework'
      className='hero-section d-flex align-items-center'
      style={{
        background: "url('hero-bg.png') center center/cover no-repeat",
        minHeight: '500px',
        position: 'relative',
      }}
    >
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-12 col-lg-8 col-xl-7'>
            <div
              className='card bg-white shadow-lg border-0 fade-in'
              style={{
                maxWidth: '600px',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <div className='card-body p-4 p-md-5'>
                <div className='mb-3'>
                  <span className='badge bg-primary mb-2 fade-in-delay'>
                    {t.subtitle}
                  </span>
                </div>
                <h1 className='card-title h2 text-gradient mb-4 fade-in-delay'>
                  {t.title}
                </h1>
                <p className='card-text text-muted mb-4 fade-in-delay'>
                  {t.text}
                </p>

                <div className='mb-4 fade-in-delay'>
                  <h6 className='text-primary mb-3'>Key Features:</h6>
                  <ul className='list-unstyled'>
                    {t.features.map((feature, index) => (
                      <li key={index} className='mb-2'>
                        <i className='bi bi-check-circle-fill text-success me-2'></i>
                        <small className='text-muted'>{feature}</small>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='d-flex gap-3 fade-in-delay'>
                  <a
                    href='#start'
                    className='btn btn-primary btn-lg shadow-hover'
                    style={{ textDecoration: 'none' }}
                  >
                    <i className='bi bi-play-fill me-2'></i>
                    {t.ctaButton}
                  </a>
                  <a
                    href='#sobre-nos'
                    className='btn btn-outline-primary btn-lg'
                    style={{ textDecoration: 'none' }}
                  >
                    <i className='bi bi-info-circle me-2'></i>
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
