// Where you render the CartComponent
import React from 'react';
import CartComponent from '../../Components/CartComponent';

const CartPage = () => {
  const exampleItems = [
    { name: 'Example Product 1', price: 19.99 },
    { name: 'Example Product 2', price: 29.99 },
  ];
  console.log(exampleItems);
  return (
    <div>
      <div>Example Cart Page</div>
      <CartComponent items={exampleItems} />
    </div>
  );
};

export default CartPage;
