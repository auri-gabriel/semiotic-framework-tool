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
    <section className='py-5' id='works' style={{ backgroundColor: '#f4f4f4' }}>
      <div className='container-fluid px-4'>
        <div className='row'>
          <div className='col-12 col-lg-10 offset-lg-1'>
            <div className='mb-5'>
              <SectionTitle title={t.title}></SectionTitle>
            </div>
            <div className='row g-4'>
              {works.map((work, idx) => (
                <div className='col-12 col-md-6 col-xl-4 d-flex' key={idx}>
                  <a
                    href={work.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-decoration-none w-100'
                    style={{
                      transition: 'all 0.2s ease',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      className='h-100 bg-white position-relative overflow-hidden d-flex flex-column'
                      style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '0',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#0f62fe';
                        e.currentTarget.style.boxShadow =
                          '0 2px 6px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className='p-4 d-flex flex-column h-100'>
                        <div className='flex-grow-1'>
                          <h3
                            className='mb-3 lh-base'
                            style={{
                              fontSize: '1.125rem',
                              fontWeight: '600',
                              color: '#161616',
                              lineHeight: '1.375',
                            }}
                          >
                            {work.title}
                          </h3>
                          <div className='mb-3'>
                            <p
                              className='mb-2 d-flex align-items-start'
                              style={{
                                fontSize: '0.875rem',
                                color: '#525252',
                                lineHeight: '1.375',
                              }}
                            >
                              <i
                                className='bi bi-building me-2 mt-1 flex-shrink-0'
                                style={{ fontSize: '0.75rem' }}
                                aria-hidden='true'
                              ></i>
                              <span>{work.event}</span>
                            </p>
                            <p
                              className='mb-0 d-flex align-items-center'
                              style={{
                                fontSize: '0.875rem',
                                color: '#6f6f6f',
                                fontWeight: '400',
                              }}
                            >
                              <i
                                className='bi bi-calendar me-2'
                                style={{ fontSize: '0.75rem' }}
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
                        <div
                          className='d-flex align-items-center justify-content-end mt-3 pt-3'
                          style={{ borderTop: '1px solid #f4f4f4' }}
                        >
                          <span
                            style={{
                              fontSize: '0.875rem',
                              color: '#0f62fe',
                              fontWeight: '500',
                            }}
                          >
                            {t.viewPublication}
                          </span>
                          <i
                            className='bi bi-arrow-right ms-2'
                            style={{
                              fontSize: '0.875rem',
                              color: '#0f62fe',
                              transition: 'transform 0.2s ease',
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
