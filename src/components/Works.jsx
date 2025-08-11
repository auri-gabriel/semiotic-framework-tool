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
    url: 'https://example.com/work1',
  },
  {
    title:
      'DESIGN PARTICIPATIVO INTEGRADO À ENGENHARIA DE SOFTWARE EM DOMÍNIO EDUCACIONAL: ANÁLISE DE TCC DA UNIPAMPA',
    event:
      'Anais do 15º Salão Internacional de Ensino, Pesquisa e Extensão da UNIPAMPA: Pesquisa e Inovação',
    date: '2023-12-18',
    url: 'https://example.com/work2',
  },
  {
    title:
      'DESIGN PARTICIPATIVO INTEGRADO À ENGENHARIA DE SOFTWARE: UMA REVISÃO SISTEMATIZADA COM APOIO DA TÉCNICA SNOWBALLING',
    event:
      'Anais do 15º Salão Internacional de Ensino, Pesquisa e Extensão da UNIPAMPA: Pesquisa e Inovação',
    date: '2023-12-18',
    url: 'https://example.com/work3',
  },
];

const Works = ({ language }) => (
  <section className='py-5 border-top' id='works'>
    <div className='container'>
      <h2 className='mb-4'>{worksTexts[language].works}</h2>
      <div className='row'>
        {works.map((work, idx) => (
          <div className='col-md-4 mb-3' key={idx}>
            <a
              href={work.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-decoration-none text-dark'
            >
              <div className='card h-100 bg-light'>
                <div className='card-body d-flex flex-column justify-content-between'>
                  <div>
                    <h5 className='card-title'>{work.title}</h5>
                    <p className='card-text'>
                      {work.event}
                      <br />
                      {work.date}
                    </p>
                  </div>
                  <div className='mt-3 text-end arrow-container'>
                    <i className='bi bi-arrow-right'></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
    <style jsx>{`
      .arrow-container i {
        display: inline-block;
        font-size: 1.5rem; /* bigger arrow */
        transition: transform 0.2s ease;
      }
      a:hover .arrow-container i {
        transform: translateX(4px);
      }
    `}</style>
  </section>
);

export default Works;
