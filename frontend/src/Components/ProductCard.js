import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

/* Product Card */

const ProductCard = ({ product }) => {

  return (
    <div className="card mb-4 product-card">
      <img src={product.imageURL} className="product-image" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${(product.price).toFixed(2)}</p>
        <p className="small text-muted">{product.category}</p>
        <div className='mb-2'>
          <Link className="btn btn-info me-3" to={`/product-details/${product._id}`}>View Details</Link>

          <button className="btn btn-info" product-id={product._id}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;