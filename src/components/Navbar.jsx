const Navbar = () => (
  <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom'>
    <div className='container'>
      <a className='navbar-brand' href='#'>
        <span role='img' aria-label='tool'>
          🛠️
        </span>
      </a>
      <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          <a className='nav-link' href='#framework'>
            O Framework
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#iniciar'>
            Iniciar
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#sobre-nos'>
            Sobre nós
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
