import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import SectionTitle from '../components/SectionTitle';

const texts = {
  en: {
    title: 'References',
    references: [
      'LIU, K. Semiotics in Information Systems Engineering. Cambridge, England: Cambridge University Press, 2000.',
    ],
  },
  pt_BR: {
    title: 'Referências',
    references: [
      'LIU, K. Semiotics in Information Systems Engineering. Cambridge, England: Cambridge University Press, 2000.',
    ],
  },
};

const ReferencesSection = () => {
  const { language } = useLanguage();
  const t = texts[language];

  return (
    <section id='references' className='py-5 border-top'>
      <div className='container'>
        <SectionTitle title={t.title}></SectionTitle>

        {t.references.map((reference, idx) => (
          <p key={idx}>{reference}</p>
        ))}
      </div>
    </section>
  );
};

export default ReferencesSection;
