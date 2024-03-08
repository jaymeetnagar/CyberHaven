import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';

export default function HomePage() {

  const [products, setProducts] = useState([]);

  useEffect(() => { fetchProducts(); }, []);


  const fetchProducts = async () => {
    try {
      const result = await fetch('http://localhost:3001/product/all',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      const response = await result.json();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // featured products by promotions data
  const featuredProducts = products.filter(product => product.promotions.includes('Featured') || product.promotions.includes('featured'));

  const productDeals = products.filter(product => product.promotions.includes('Deals') || product.promotions.includes('deals'));
  
  const trendingProducts = products.filter(product => product.promotions.includes('Trending') || product.promotions.includes('trending'));


  return (

    <div className="container">


      {/* Featured Products */}
      <section className='mb-4'>

        <h5 className="mb-4">Featured Products</h5>

        <div className="row justify-content-start">
          {

          featuredProducts.length === 0
              ? (<p className="text-muted">No featured products available.</p>)
              : (featuredProducts.map(product => (

                <div className="col-md-6 col-lg-4">
                  <ProductCard key={product.id} product={product} />
                </div>

              )))

          }

        </div>
      </section>


      {/* Product Deals */}
      <section className='mb-4'>

        <h5 className="mb-4">Product Deals</h5>

        <div className="row justify-content-start">
          {

            productDeals.length === 0
              ? (<p className="text-muted">No product deals available.</p>)
              : (productDeals.map(product => (

                <div className="col-md-6 col-lg-4">
                  <ProductCard key={product.id} product={product} />
                </div>

              )))

          }

        </div>
      </section>


      {/* Trending Products */}
      <section className='mb-4'>

        <h5 className="mb-4">Tending Products</h5>

        <div className="row justify-content-start">
          {

            trendingProducts.length === 0
              ? (<p className="text-muted">No trending products available.</p>)
              : (trendingProducts.map(product => (

                <div className="col-md-6 col-lg-4">
                  <ProductCard key={product.id} product={product} />
                </div>

              )))

          }

        </div>
      </section>

    </div>
  );
}