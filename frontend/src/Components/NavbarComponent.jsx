import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faSignOut, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './NavbarComponent.css';
import Dropdown from 'react-bootstrap/Dropdown';

const NavbarComponent = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeMenu = () => {
        setIsNavOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 mb-4">
            <div className="container text-center text-lg-start">
                <Link to="/" className="navbar-brand fs-4 fw-bold mb-0 text-decoration-none">CYBER HAVEN</Link>
                <button className="navbar-toggler border-0" type="button" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/laptop">Laptop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/headphone">Headphone</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/mouse">Mouse</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/desk">Desk</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/keyboard">Keyboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/monitor">Monitor</Link>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center">
                        
                        <Link to='/search' className="text-white btn">
                            <FontAwesomeIcon icon={faSearch} />
                        </Link>

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
            </div>
        </nav>
    );
};


export default NavbarComponent