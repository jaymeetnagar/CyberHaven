import React from 'react';
import { Link } from 'react-router-dom';

/* Product Card */

const ProductCard = ({ onAddToCart, product }) => {
    
    return (
        <div className="card mb-4 shadow-sm">
            <img alt={product.title} src={product.imageURL} className="card-img-top object-fit-cover" height={360} />
            <div className="card-body text-center">
                <h5 className="card-title" style={{height:"48px"}}>{product.title}</h5>
                <p className="card-text text-center">${(product.price).toFixed(2)}</p>
                <p className='mb-3 text-muted'>{product.category}</p>
                <div className='d-flex'>
                    <Link className="btn btn-dark w-50 me-1" to={`/product-details/${product._id}`}>View Details</Link>
                    <button onClick={() => onAddToCart(product._id)} className="btn btn-info w-50">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;