import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import SectionTitle from './SectionTitle';

const worksTexts = {
  en: {
    works: 'Works',
  },
  pt_BR: {
    works: 'Trabalhos',
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
  return (
    <section className='py-5 border-top' id='works'>
      <div className='container'>
        <SectionTitle title={worksTexts[language].works}></SectionTitle>
        <div className='row g-4'>
          {works.map((work, idx) => (
            <div className='col-md-4' key={idx}>
              <a
                href={work.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-decoration-none text-dark'
              >
                <div className='card h-100 bg-light work-card shadow-sm'>
                  <div className='card-body d-flex flex-column justify-content-between'>
                    <div>
                      <h5 className='card-title fw-semibold lh-sm mb-3'>
                        {work.title}
                      </h5>
                      <p className='card-text text-muted small mb-2'>
                        <i
                          className='bi bi-building me-2'
                          aria-hidden='true'
                        ></i>
                        {work.event}
                      </p>
                      <p className='card-text text-secondary fst-italic small'>
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
                    <div className='mt-3 text-end arrow-container'>→</div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .work-card {
          transition: border-color 0.3s ease, transform 0.2s ease;
        }
        a:hover .work-card {
          transform: translateY(-2px);
          border-bottom-color: black;
          border-bottom-width: 2px;
        }
        .arrow-container {
          display: inline-block;
          font-size: 1.75rem;
          transition: transform 0.2s ease;
        }
        a:hover .arrow-container {
          transform: translateX(6px);
        }
      `}</style>
    </section>
  );
};

export default WorksSection;
