import React from 'react';

/* Product Card */

const ProductCard = ({ product }) => {

  return (
    <article className="card" style={{ width: '18rem' }}>
      <img src="https://placehold.co/600x400/png" className="card-img-top" alt="Product Name" />
      <div className="card-body text-center">
        <h5 className="card-title">Product Name</h5>
        <p className="card-text">$499.00</p>
        <button className="btn btn-info rounded-pill">Add to Cart</button>
      </div>
    </article>

  );
};

export default ProductCard;