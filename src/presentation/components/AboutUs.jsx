const aboutUsTexts = {
  en: {
    aboutUs: 'About us',
    aboutUsText: 'This project is part of the GEInfoEdu Research Group',
    professors: [
      'Prof. Dr. Aline Vieira de Mello (Professor at Alegrete Campus)',
      'Prof. Dr. Amanda Meincke Melo (Professor at Alegrete Campus) – research group leader',
      'Prof. Dr. Jean Felipe Patikowski Cheiran (Professor at Alegrete Campus)',
    ],
    studentsLabel: 'Students involved in the project:',
    students: [
      'Auri Gabriel Castro de Melo (Software Engineering student)',
      'Renilson Pereira Torres (Computer Science student, PIBIC-Af 2024 fellow)',
      'Gabriel Souza Rodrigues de Amorim (Software Engineering student, PRO-IC MC 2023 fellow)',
    ],
  },
  pt_BR: {
    aboutUs: 'Sobre nós',
    aboutUsText: 'Este projeto é parte do Grupo de Pesquisa GEInfoEdu',
    professors: [
      'Profa. Dra. Aline Vieira de Mello (Docente no Campus Alegrete)',
      'Profa. Dra. Amanda Meincke Melo (Docente no Campus Alegrete) – líder do grupo de pesquisa',
      'Prof. Dr. Jean Felipe Patikowski Cheiran (Docente no Campus Alegrete)',
    ],
    studentsLabel: 'Estudantes envolvidos no projeto:',
    students: [
      'Auri Gabriel Castro de Melo (Acadêmico do Curso de Engenharia de Software)',
      'Renilson Pereira Torres (Acadêmico do Curso de Ciência da Computação, bolsista PIBIC-Af 2024)',
      'Gabriel Souza Rodrigues de Amorim (Acadêmico do Curso de Engenharia de Software, bolsista PRO-IC MC 2023)',
    ],
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
          className='mb-3 img-fluid'
        />
        <ul>
          {t.professors.map((prof, idx) => (
            <li key={idx}>{prof}</li>
          ))}
        </ul>
        <p>
          <strong>{t.studentsLabel}</strong>
        </p>
        <ul>
          {t.students.map((student, idx) => (
            <li key={idx}>{student}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutUs;
