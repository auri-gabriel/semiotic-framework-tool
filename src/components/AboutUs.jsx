const aboutUsTexts = {
  en: {
    aboutUs: 'About us',
    aboutUsText: 'This project is part of the GEInfoEdu Research Group',
    students: 'Students involved in the project:',
  },
  pt_BR: {
    aboutUs: 'Sobre nós',
    aboutUsText: 'Este projeto é parte do Grupo de Pesquisa GEInfoEdu',
    students: 'Estudantes envolvidos no projeto:',
  },
};

const AboutUs = ({ language }) => {
  const t = aboutUsTexts[language];
  return (
    <section id='sobre-nos' className='bg-light py-5 border-top'>
      <div className='container'>
        <h2 className='mb-4'>{t.aboutUs}</h2>
        <p>{t.aboutUsText}</p>
        <img
          src='/logo-geinfoedu.png'
          alt='GEInfoEdu'
          style={{ maxWidth: 200 }}
          className='mb-3'
        />
        <ul>
          <li>
            {language === 'pt_BR'
              ? 'Profa. Dra. Aline Vieira de Mello (Docente no Campus Alegrete)'
              : 'Prof. Dr. Aline Vieira de Mello (Professor at Alegrete Campus)'}
          </li>
          <li>
            {language === 'pt_BR'
              ? 'Profa. Dra. Amanda Meincke Melo (Docente no Campus Alegrete) – líder do grupo de pesquisa'
              : 'Prof. Dr. Amanda Meincke Melo (Professor at Alegrete Campus) – research group leader'}
          </li>
          <li>
            {language === 'pt_BR'
              ? 'Prof. Dr. Jean Felipe Patikowski Cheiran (Docente no Campus Alegrete)'
              : 'Prof. Dr. Jean Felipe Patikowski Cheiran (Professor at Alegrete Campus)'}
          </li>
        </ul>
        <p>
          <strong>{t.students}</strong>
        </p>
        <ul>
          <li>
            {language === 'pt_BR'
              ? 'Auri Gabriel Castro de Melo (Acadêmico do Curso de Engenharia de Software)'
              : 'Auri Gabriel Castro de Melo (Software Engineering student)'}
          </li>
          <li>
            {language === 'pt_BR'
              ? 'Renilson Pereira Torres (Acadêmico do Curso de Ciência da Computação, bolsista PIBIC-Af 2024)'
              : 'Renilson Pereira Torres (Computer Science student, PIBIC-Af 2024 fellow)'}
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
};

export default AboutUs;
