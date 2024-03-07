import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const ProductCategoryPage = () => {

  const { category } = useParams();

  return (
    <div className="container">
      <div className="row justify-content-start">
        
        {[0, 1, 2, 3, 4].map(product => (
          
          <div className="col-md-6 col-lg-4">
              <ProductCard  />
          </div>

        ))}

      </div>

    </div>
  );
};

export default ProductCategoryPage;