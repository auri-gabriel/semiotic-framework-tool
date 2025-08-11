const Footer = ({ language, translations }) => (
  <footer className='bg-dark text-white text-center py-5'>
    <div className='container'>
      <small>{translations[language].copyright}</small>
    </div>
  </footer>
);

export default Footer;
