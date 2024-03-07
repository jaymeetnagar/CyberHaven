import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const ProductPage = () => {

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    padding: '20px',
  };

  const { category } = useParams();

  const paddingStyle = { padding: '5rem 2rem'  };
  const headingStyle = { textAlign: 'center'  };

  return (
    <div style={paddingStyle}>
      <h2 style={ headingStyle }>Category: {category}</h2>

      <div style={gridContainerStyle}>

        {[0, 1, 2, 3, 4].map(product => (
          <ProductCard  />
        ))}

      </div>
    </div>
  );
};

export default ProductPage;