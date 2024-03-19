// CartComponent.js
import React from 'react';
import './CartComponent.css';

const CartComponent = ({ items }) => {
  // Check if items is undefined or null before using map
  if (!items || items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="cart-container">
      
      <div className="cart-items">
        {items.map((item, index) => (
          <div key={index} className="cart-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className='cart-total'>
            <span className="summary-label">Subtotal:</span>
            <span className="summary-total">${calculateTotal(items).toFixed(2)}</span>
        </div>
        {/* <div className='cart-shipping'>
            <span className="shipping-label">Shipping:</span>
            <span className="shipping-total">${calculateTotal(items).toFixed(2)}</span>
        </div> */}
      </div>
    </div>
  );
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

export default CartComponent;
