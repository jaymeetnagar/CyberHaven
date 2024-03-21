import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { UserContext } from '../contexts/UserContext';

/* Product Card */

const ProductCard = ({ product }) => {

  const userId = useContext(UserContext);

  const handleAddToCart = async () => {

    try {

      const response = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product._id, user_id: userId }),
        credentials: "include",
      });


      const data = await response.json();

      if(response.ok){

        console.log(data);
        alert(data.message);
      }

    } catch (error) {
      console.error("Error on add to cart", error);
      alert("Error Add to Cart, Please Register or Login.");
    }
  };


  return (
    <div className="card mb-4 product-card">
      <img src={product.imageURL} className="card-img-top product-image" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text mb-1">${(product.price).toFixed(2)}</p>
        <p className="small text-muted">{product.category}</p>
        <div className='mb-2'>
          <Link className="btn btn-info me-3" to={`/product-details/${product._id}`}>View Details</Link>

          <button className="btn btn-info" onClick={ handleAddToCart }>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;