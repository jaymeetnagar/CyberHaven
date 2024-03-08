import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

/* Product Card */

const ProductCard = ({ product }) => {

  return (
    <article className="card mb-4">
      <img src={product.imageURL} className="card-img-top" alt={product.name} />
      <div className="card-body text-center">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text mb-2">${(product.price).toFixed(2)}</p>
        <p className="small text-muted mb-3">{product.category}</p>
        <div className='mb-2'>
          <Link className="btn btn-info rounded-pill text-uppercase me-1" to={`/product-details/${product._id}`}>View Details</Link>
        </div>
        <div>
          <button className="btn btn-info rounded-pill text-uppercase" product-id={product._id}>Add to Cart</button>
        </div>
      </div>
    </article>

  );
};

export default ProductCard;