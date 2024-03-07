import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {

  const [products, setProducts] = useState([]);
  
  useEffect(()=> { fetchProducts(); }, []);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/product/all');
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (

    <div>
       Home Page
    </div>

  );
}