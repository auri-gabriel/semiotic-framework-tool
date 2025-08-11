const Footer = ({ language, translations }) => (
  <footer className='bg-dark text-white text-center py-3'>
    <div className='container'>
      <small>{translations[language].copyright}</small>
    </div>
  </footer>
);

export default Footer;
