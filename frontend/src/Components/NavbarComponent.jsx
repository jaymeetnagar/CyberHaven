import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import './NavbarComponent.css';

const NavbarComponent =()=>{
    return(
        <div className='Navbar'>
            <h1>CYBERHAVEN</h1>
            <nav>
                <div>Laptop</div>
                <div>Headphones</div>
                <div>Mouse</div>
                <div>Desk</div>
                <div>Keyboard</div>
                <div>Monitor</div>
            </nav>
            <div className='icons'>
                <FontAwesomeIcon icon={faSearch} />
                <FontAwesomeIcon icon={faUser} />
            </div>
        </div>
    )
}

export default NavbarComponent