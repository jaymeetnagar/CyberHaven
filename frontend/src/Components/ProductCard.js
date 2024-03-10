import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCartShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

/* Product Card */

const ProductCard = ({ product }) => {

  return (
    <article className="card mb-4 position-relative">

    {product.deal && (
        <div className="position-absolute top-0 end-0">
          <span className="badge bg-danger p-2 rounded-pill" style={{ transform: 'translate(10px, -5px)' }}>{product.deal}</span>
        </div>
      )}

    <img src={product.imageURL} className="card-img-top" alt={product.title} />
    <div className="card-body text-center">
      <h5 className="card-title">{product.title}</h5>
      
      {product.deal && <p className="card-text mb-2"><strike className="small text-danger">${(product.price).toFixed(2)}</strike> ${product.dealPrice.toFixed(2)}</p>}
      
      {!product.deal && <p className="card-text mb-2">${(product.price).toFixed(2)}</p>}
      
      <p className="small text-muted mb-3">{product.category}</p>
      <div className='mb-2'>
        <Link className="btn btn-info rounded-pill text-uppercase me-1" to={`/product-details/${product._id}`}>
        <FontAwesomeIcon icon={faEye} className="me-1" />
          View Details
          </Link>
      </div>
      <div>
        <button className="btn btn-info rounded-pill text-uppercase" product-id={product._id}>
          
        <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
          Add to Cart
          </button>
      </div>
    </div>
  </article>
  

  );
};

export default ProductCard;