import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './NavbarComponent.css';

const NavbarComponent = () => {
  return (
    <div className='Navbar'>
      <div className='logo'>
        <h1>CYBERHAVEN</h1>
      </div>
      <nav>
        <div>Laptops</div>
        <div>Headphones</div>
        <div>Mice</div>
        <div>Desks</div>
        <div>Keyboards</div>
        <div>Monitors</div>
      </nav>
      <div className='icons'>
        <FontAwesomeIcon icon={faSearch} />
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
    </div>
  );
};

export default NavbarComponent;
