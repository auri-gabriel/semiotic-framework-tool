const AboutUs = ({ language, translations }) => (
  <section id='sobre-nos' className='bg-light py-5 border-top'>
    <div className='container'>
      <h2 className='mb-4'>{translations[language].aboutUs}</h2>
      <p>{translations[language].aboutUsText}</p>
      <img
        src='/logo-geinfoedu.png'
        alt='GEInfoEdu'
        style={{ maxWidth: 200 }}
        className='mb-3'
      />
      <ul>
        <li>
          {language === 'pt_BR'
            ? 'Profa. Dra. Aline Vieira de Melo (Docente no Campus Alegrete)'
            : 'Prof. Dr. Aline Vieira de Melo (Professor at Alegrete Campus)'}
        </li>
        <li>
          {language === 'pt_BR'
            ? 'Profa. Dra. Amanda Patickine Melo (Docente no Campus Alegrete) – líder do grupo de pesquisa'
            : 'Prof. Dr. Amanda Patickine Melo (Professor at Alegrete Campus) – research group leader'}
        </li>
        <li>
          {language === 'pt_BR'
            ? 'Prof. Dr. Jean Felipe Patickovski Cherian (Docente no Campus Alegrete)'
            : 'Prof. Dr. Jean Felipe Patickovski Cherian (Professor at Alegrete Campus)'}
        </li>
      </ul>
      <p>
        <strong>{translations[language].students}</strong>
      </p>
      <ul>
        <li>
          {language === 'pt_BR'
            ? 'Auri Gabriel Carlos de Melo (Acadêmico do Curso de Engenharia de Software)'
            : 'Auri Gabriel Carlos de Melo (Software Engineering student)'}
        </li>
        <li>
          {language === 'pt_BR'
            ? 'Renilson Pereira Torres (Acadêmico do Curso de Ciência da Computação, bolsista PIBIC-AF 2024)'
            : 'Renilson Pereira Torres (Computer Science student, PIBIC-AF 2024 fellow)'}
        </li>
        <li>
          {language === 'pt_BR'
            ? 'Gabriel Souza Rodrigues de Amorim (Acadêmico do Curso de Engenharia de Software, bolsista PRO-IC MC 2023)'
            : 'Gabriel Souza Rodrigues de Amorim (Software Engineering student, PRO-IC MC 2023 fellow)'}
        </li>
      </ul>
    </div>
  </section>
);

export default AboutUs;
