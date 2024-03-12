import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCategoryPage = () => {

  const { category } = useParams();


  const [products, setProducts] = useState([]);

  useEffect(() => { fetchProducts(); }, []);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/product/all');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // filter products by selected product category
  let productsOfSelectedCategory =  products.filter(product => (product.category).toLowerCase() == category) ;

  return (



    <div className="container">

      <h4 className="mb-4">Category: { category.charAt(0).toUpperCase() + category.slice(1) }</h4>

      <div className="row justify-content-start">
        {
        
        productsOfSelectedCategory.length === 0 
        ? (<p className="text-muted">No products available of category {category}.</p>) 
        : (productsOfSelectedCategory.map(product => (

            <div className="col-md-6 col-lg-4">
              <ProductCard key={product._id} product={product} />
            </div>

          )))
        
        }


      </div>

    </div>
  );
};

export default ProductCategoryPage;