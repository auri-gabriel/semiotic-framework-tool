/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import SectionTitle from '../components/SectionTitle';

const texts = {
  en: {
    title: 'References',
    references: [
      'LIU, K. Semiotics in Information Systems Engineering. Cambridge, England: Cambridge University Press, 2000.',
      'PRESSMAN, R. S. Engenharia de software: uma abordagem profissional. 9. ed. Porto Alegre: AMGH Editora Ltda., 2021.',
    ],
  },
  pt_BR: {
    title: 'Referências',
    references: [
      'LIU, K. Semiotics in Information Systems Engineering. Cambridge, England: Cambridge University Press, 2000.',
      'PRESSMAN, R. S. Engenharia de software: uma abordagem profissional. 9. ed. Porto Alegre: AMGH Editora Ltda., 2021.',
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
