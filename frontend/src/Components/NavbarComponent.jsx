import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faCarAlt, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavbarComponent = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
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

                        <Link to="/login" className="btn text-white">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                        <Link to="/cart" className="btn text-white">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default NavbarComponent