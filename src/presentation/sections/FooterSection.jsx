import React from 'react';
import { useTranslation } from 'react-i18next';

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <footer className='bg-dark text-white text-center py-5'>
      <div className='container'>
        <small>{t('footer.copyright')}</small>
      </div>
    </footer>
  );
};

export default FooterSection;
