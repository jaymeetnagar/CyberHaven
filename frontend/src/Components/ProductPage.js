import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductPage = () => {

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    padding: '20px',
  };

  const { category } = useParams();

  return (
    <div style={{ padding: '2rem'  }}>
      <h2>Category: {category}</h2>

      <div style={gridContainerStyle}>

        {[0, 1, 2, 3, 4].map(product => (
          <ProductCard  />
        ))}

      </div>
    </div>
  );
};

export default ProductPage;
