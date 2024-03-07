import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faCarAlt, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './NavbarComponent.css';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {


    return (
        <div className="Navbar border-bottom mb-5">
            
            <Link to="/" className="fs-4 fw-bold text-decoration-none text-body">CYBERHAVEN</Link>

            {/* navbar links */}
            <nav>

                <Link className="text-body text-decoration-none" to="/">Home</Link>
                <Link className="text-body text-decoration-none" to="/products/laptop">Laptop</Link>
                <Link className="text-body text-decoration-none" to="/products/headphone">Headphone</Link>
                <Link className="text-body text-decoration-none" to="/products/mouse">Mouse</Link>
                <Link className="text-body text-decoration-none" to="/products/desk">Desk</Link>
                <Link className="text-body text-decoration-none" to="/products/keyboard">Keyboard</Link>
                <Link className="text-body text-decoration-none" to="/products/monitor">Monitor</Link>

            </nav>

            <div>
                <FontAwesomeIcon icon={faSearch} className="btn" />
                
                <Link to="/login" className="btn">
                  <FontAwesomeIcon icon={faUser} />
                </Link>

                <Link to="/cart" className="btn">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
                

            </div>
        </div>
    )
}

export default NavbarComponent