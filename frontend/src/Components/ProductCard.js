import React from 'react';

const ProductCard = ({ product }) => {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px'
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    marginBottom: '10px'
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={cardStyle}>
      <img src="https://placehold.co/600x400/png" alt="Product Name" style={imageStyle} />
      <div className="product-details">
        <h2>{"Product Name"}</h2>
        <p>${"499.00"}</p>
        <button style={buttonStyle}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
