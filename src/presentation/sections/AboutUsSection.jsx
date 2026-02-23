import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import SectionTitle from '../components/SectionTitle';

const texts = {
  en: {
    title: 'About us',
    description: 'This tool, created by Auri Gabriel Castro de Melo under the guidance of Amanda Meincke Melo, is a product of the GEInfoEdu Research Group - Study Group on Information Technology in Education.',
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
    collaboratorsLabel: 'Collaborators:',
    collaborators: [
      'Prof. Dr. Maria Cristina Graeff Wernz (Núcleo de Educação à Distância da Unipampa)',
    ],
  },
  pt_BR: {
    title: 'Sobre nós',
    description: 'Esta ferramenta, de autoria de Auri Gabriel Castro de Melo, sob orientação de Amanda Meincke Melo, é um produto do Grupo de Pesquisa GEInfoEdu - Grupo de Estudos em Informática na Educação.',
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
    collaboratorsLabel: 'Colaboradores:',
    collaborators: [
      'Profa. Dra. Maria Cristina Graeff Wernz (Núcleo de Educação à Distância da Unipampa)',
    ],
  },
};

const AboutUsSection = () => {
  const { language } = useLanguage();
  const t = texts[language];
  return (
    <section id='sobre-nos' className='bg-light py-5 border-top'>
      <div className='container'>
        <SectionTitle title={t.title}></SectionTitle>
        <p>{t.description}</p>
        <img
          src={`${import.meta.env.BASE_URL}/logo-geinfoedu.png`}
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
        <p>
          <strong>{t.collaboratorsLabel}</strong>
        </p>
        <ul>
          {t.collaborators.map((collaborator, idx) => (
            <li key={idx}>{collaborator}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutUsSection;
