import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import './NavbarComponent.css';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {

    const linkStyle = {
        color: '#333',
        textDecoration: 'none'
      };

    return (
        <div className='Navbar'>
            <h1>CYBERHAVEN</h1>


            <nav>

                <Link style={linkStyle} to="/">Home</Link>
                <Link style={linkStyle} to="/products/laptop">Laptop</Link>
                <Link style={linkStyle} to="/products/headphone">Headphones</Link>
                <Link style={linkStyle} to="/products/mouse">Mouse</Link>
                <Link style={linkStyle} to="/products/desk">Desk</Link>
                <Link style={linkStyle} to="/products/keyboard">Keyboard</Link>
                <Link style={linkStyle} to="/products/monitor">Monitor</Link>

            </nav>

            <div className='icons'>
                <FontAwesomeIcon icon={faSearch} />
                <FontAwesomeIcon icon={faUser} />
            </div>
        </div>
    )
}

export default NavbarComponent