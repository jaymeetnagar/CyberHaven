import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './NavbarComponent.css';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="Navbar border-bottom mb-5">
            <Link to="/" className="fs-4 fw-bold text-decoration-none text-body" onClick={closeMenu}>CYBERHAVEN</Link>
            {/* Hamburger menu button */}
            <div className="hamburger-menu" onClick={toggleMenu}>
                {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </div>

            {/* Navbar links */}
            <nav className={isOpen ? 'open' : ''}>
                <Link className="text-body text-decoration-none" to="/" onClick={closeMenu}>Home</Link>
                <Link className="text-body text-decoration-none" to="/products/laptop" onClick={closeMenu}>Laptop</Link>
                <Link className="text-body text-decoration-none" to="/products/headphone" onClick={closeMenu}>Headphone</Link>
                <Link className="text-body text-decoration-none" to="/products/mouse" onClick={closeMenu}>Mouse</Link>
                <Link className="text-body text-decoration-none" to="/products/desk" onClick={closeMenu}>Desk</Link>
                <Link className="text-body text-decoration-none" to="/products/keyboard" onClick={closeMenu}>Keyboard</Link>
                <Link className="text-body text-decoration-none" to="/products/monitor" onClick={closeMenu}>Monitor</Link>
            </nav>
            
            <div>
                <FontAwesomeIcon icon={faSearch} className="btn" />
                <Link to="/login" className="btn" onClick={closeMenu}>
                    <FontAwesomeIcon icon={faUser} />
                </Link>
                <Link to="/cart" className="btn" onClick={closeMenu}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </Link>
            </div>
        </div>
    );
}

export default NavbarComponent;
