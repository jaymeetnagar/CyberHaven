import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';


const ProductDetailPage = () => {

    const userId = useContext(UserContext);

    const { productId } = useParams();

    const [product, setProduct] = useState([]);

    const [quantity, setQuantity] = useState(1);


    useEffect(() => { fetchProductData(); }, []);

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/product/${productId}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleAddToCart = async () => {


        try {
    
          const response = await fetch("http://localhost:3001/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id: product._id, user_id: userId, quantity: quantity }),
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
        <div className="container">
            <div className='row'>
                <div className='col-md-6 mb-3'>
                    <img src={product.imageURL} className="card-img-top" alt={product.title} />
                </div>
                <div className='col-md-6 mb-3 ps-md-4'>
                    <h3 className="mb-2">{product.title}</h3>
                    <p className="lead mb-2 fw-normal">${(product.price)?.toFixed(2)}</p>
                    <p className="mb-3">Category: <span className='text-muted'>{product.category}</span></p>
                    <p>{product.description}</p>
                    <input type='number' min={1} max={10} value={quantity} className='form-control py-2 bg-white mb-2 border-secondary 
                    text-body w-25 d-inline-block me-2' 
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    required />   
                    <button type='submit' className="btn btn-info text-uppercase py-2" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;