import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faSearch, faCartShopping, faSignOut } from '@fortawesome/free-solid-svg-icons';
import './NavbarComponent.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
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
            {/* Left link for large screens */}
            <div className="left-link large-screen">
                <Link to="/" className="fs-4 fw-bold text-decoration-none text-body" onClick={closeMenu}>CYBERHAVEN</Link>
            </div>
            
            {/* Hamburger menu button */}
            <div className="hamburger-menu" onClick={toggleMenu}>
                {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </div>

            {/* Middle link for small screens */}
            <div className="middle-link small-screen">
                <Link to="/" className="fs-4 fw-bold text-decoration-none text-body" onClick={closeMenu}>CYBERHAVEN</Link>
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
            
            {/* Icons */}
            <div className="menu-icons">
                <FontAwesomeIcon icon={faSearch} className="btn" />
                <Dropdown>
                <Dropdown.Toggle style={{ background: 'transparent', border: 'none' }}>
                <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item >
                    <Link to="/userdash" className="btn" onClick={closeMenu}>
                        <FontAwesomeIcon icon={faUser} /> DashBoard                    
                    </Link>
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <Link to="/login" className="btn" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faSignOut} /> Log Out
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <Link to="/cart" className="btn" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faCartShopping} /> Cart
                        </Link>
                    </Dropdown.Item>  
                </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default NavbarComponent;
