const Hero = ({ language, translations }) => (
  <section
    id='framework'
    className='bg-dark text-white py-5'
    style={{ background: '#222' }}
  >
    <div className='container'>
      <div className='col-md-8'>
        <h2>{translations[language].framework}</h2>
        <p>
          {language === 'pt_BR'
            ? 'No desenvolvimento de software para o domínio educacional, uma série de aspectos deve ser levada em conta, relacionadas às funções humanas da informação e à Plataforma de Tecnologia da Informação (TI). Baseado no Framework Semiótico de Ronald Stamper, este framework adota a abordagem do Design Participativo integrando a Engenharia de Software no desenvolvimento de soluções em software para o Domínio Educacional.'
            : "In the development of software for the educational domain, a number of aspects must be taken into account, related to human information functions and the Information Technology (IT) Platform. Based on Ronald Stamper's Semiotic Framework, this framework adopts the Participatory Design approach, integrating Software Engineering in the development of software solutions for the Educational Domain."}
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
