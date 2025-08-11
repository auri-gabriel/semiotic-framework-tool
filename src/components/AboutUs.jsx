const AboutUs = () => (
  <section id='sobre-nos' className='bg-light py-5 border-top'>
    <div className='container'>
      <h2 className='mb-4'>Sobre nós</h2>
      <p>Este projeto é parte do Grupo de Pesquisa GEInfoEdu</p>
      <img
        src='/logo-geinfoedu.png'
        alt='GEInfoEdu'
        style={{ maxWidth: 200 }}
        className='mb-3'
      />
      <ul>
        <li>Profa. Dra. Aline Vieira de Melo (Docente no Campus Alegrete)</li>
        <li>
          Profa. Dra. Amanda Patickine Melo (Docente no Campus Alegrete) – líder
          do grupo de pesquisa
        </li>
        <li>
          Prof. Dr. Jean Felipe Patickovski Cherian (Docente no Campus Alegrete)
        </li>
      </ul>
      <p>
        <strong>Estudantes envolvidos no projeto:</strong>
      </p>
      <ul>
        <li>
          Auri Gabriel Carlos de Melo (Acadêmico do Curso de Engenharia de
          Software)
        </li>
        <li>
          Renilson Pereira Torres (Acadêmico do Curso de Ciência da Computação,
          bolsista PIBIC-AF 2024)
        </li>
        <li>
          Gabriel Souza Rodrigues de Amorim (Acadêmico do Curso de Engenharia de
          Software, bolsista PRO-IC MC 2023)
        </li>
      </ul>
    </div>
  </section>
);

export default AboutUs;
