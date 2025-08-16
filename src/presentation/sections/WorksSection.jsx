import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import SectionTitle from '../components/SectionTitle';

const texts = {
  en: {
    title: 'Works',
    viewPublication: 'View publication',
  },
  pt_BR: {
    title: 'Trabalhos',
    viewPublication: 'Ver publicação',
  },
};

const works = [
  {
    title:
      'Uma Revisão Sistematizada sobre Design Participativo Integrado à Engenharia de Software em Domínio Educacional',
    event: 'Simpósio Brasileiro de Informática na Educação (SBIE)',
    date: '2024-11-04',
    url: 'https://sol.sbc.org.br/index.php/sbie/article/view/31249',
  },
  {
    title:
      'DESIGN PARTICIPATIVO INTEGRADO À ENGENHARIA DE SOFTWARE EM DOMÍNIO EDUCACIONAL: ANÁLISE DE TCC DA UNIPAMPA',
    event:
      'Anais do 15º Salão Internacional de Ensino, Pesquisa e Extensão da UNIPAMPA: Pesquisa e Inovação',
    date: '2023-12-18',
    url: 'https://periodicos.unipampa.edu.br/index.php/SIEPE/article/view/117233',
  },
  {
    title:
      'DESIGN PARTICIPATIVO INTEGRADO À ENGENHARIA DE SOFTWARE: UMA REVISÃO SISTEMATIZADA COM APOIO DA TÉCNICA SNOWBALLING',
    event:
      'Anais do 15º Salão Internacional de Ensino, Pesquisa e Extensão da UNIPAMPA: Pesquisa e Inovação',
    date: '2023-12-18',
    url: 'https://periodicos.unipampa.edu.br/index.php/SIEPE/article/view/117234',
  },
];

const WorksSection = () => {
  const { language } = useLanguage();
  const t = texts[language];
  return (
    <section className='py-5 border-top' id='works'>
      <div className='container'>
        <SectionTitle title={t.title}></SectionTitle>
        <div className='row g-4'>
          {works.map((work, idx) => (
            <div className='col-12 col-md-6 col-xl-4 d-flex' key={idx}>
              <a
                href={work.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-decoration-none w-100 work-card-link'
              >
                <div className='card h-100 work-card bg-light'>
                  <div className='card-body p-4 d-flex flex-column h-100'>
                    <div className='flex-grow-1'>
                      <h3 className='card-title h5 mb-3 lh-base fw-semibold text-dark'>
                        {work.title}
                      </h3>
                      <div className='mb-3'>
                        <p className='card-text small text-muted mb-2 d-flex align-items-start'>
                          <i
                            className='bi bi-building me-2 mt-1 flex-shrink-0'
                            aria-hidden='true'
                          ></i>
                          <span>{work.event}</span>
                        </p>
                        <p className='card-text small text-muted mb-0 d-flex align-items-center'>
                          <i
                            className='bi bi-calendar me-2'
                            aria-hidden='true'
                          ></i>
                          {new Date(work.date).toLocaleDateString(
                            language === 'pt_BR' ? 'pt-BR' : 'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='border-top pt-3 mt-3 d-flex align-items-center justify-content-end'>
                      <span className='small text-primary fw-medium'>
                        {t.viewPublication}
                      </span>
                      <i className='bi bi-arrow-right ms-2 text-primary work-arrow'></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
