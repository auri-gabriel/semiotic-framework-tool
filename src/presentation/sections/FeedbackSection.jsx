import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import SectionTitle from '../components/SectionTitle';

const FORM_LINKS = {
  pt_BR:
    'https://docs.google.com/forms/d/e/1FAIpQLSf2deNnYVJX4vTPYbMxnNFNXsoJVOSlvT9u4CbwOabaDn28vQ/',
  en: 'https://docs.google.com/forms/d/e/1FAIpQLScPC_xasWNKnlxTkbEqqBKS2x-Nh_5jdHq2o1j1Yv9hlQG4EQ/',
};

const texts = {
  en: {
    title: 'Feedback',
    description:
      'Share your experience with the tool. Your feedback helps improve usability, performance, and features.',
    cta: 'Open feedback form',
  },
  pt_BR: {
    title: 'Feedback',
    description:
      'Compartilhe sua experiência com a ferramenta. Seu feedback ajuda a melhorar usabilidade, desempenho e funcionalidades.',
    cta: 'Abrir formulário de feedback',
  },
};

const FeedbackSection = () => {
  const { language } = useLanguage();
  const t = texts[language];

  return (
    <section className='py-5 border-top' id='feedback'>
      <div className='container'>
        <SectionTitle title={t.title}></SectionTitle>
        <p className='mb-4'>{t.description}</p>
        <a
          href={FORM_LINKS[language]}
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-primary'
        >
          <i className='bi bi-chat-left-text me-2' aria-hidden='true'></i>
          {t.cta}
        </a>
      </div>
    </section>
  );
};

export default FeedbackSection;
