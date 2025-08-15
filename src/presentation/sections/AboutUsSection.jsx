import React from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/SectionTitle';

function AboutUsSection() {
  const { t } = useTranslation();

  return (
    <section id='sobre-nos' className='bg-light py-5 border-top'>
      <div className='container'>
        <SectionTitle title={t('aboutUs.title')}></SectionTitle>
        <p>{t('aboutUs.description')}</p>
        <img
          src={`${import.meta.env.BASE_URL}/logo-geinfoedu.png`}
          alt='GEInfoEdu'
          className='mb-3 img-fluid'
        />
        <ul>
          {t('aboutUs.professors', { returnObjects: true }).map((prof, idx) => (
            <li key={idx}>{prof}</li>
          ))}
        </ul>
        <p>
          <strong>{t('aboutUs.studentsLabel')}</strong>
        </p>
        <ul>
          {t('aboutUs.students', { returnObjects: true }).map(
            (student, idx) => (
              <li key={idx}>{student}</li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}

export default AboutUsSection;
