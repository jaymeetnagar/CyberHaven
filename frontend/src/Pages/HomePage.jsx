import { faCartArrowDown, faCartFlatbed, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./HomePage.css";
export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="main-section">

      </div>
      <div className="cart-section">
        <div className="cart-title">Cart <FontAwesomeIcon icon={faCartShopping} /></div>
      </div>
    </div>
  );
}