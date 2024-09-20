import './styles.css';

import Image from 'next/image';
import logo from './assets/logo.webp';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <a href="/search">
          <Image src={logo} alt="Atacana logo" className="header-logo" />
        </a>
        <nav>
          <a href="/search">SEARCH</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
