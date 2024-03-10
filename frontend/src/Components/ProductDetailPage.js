import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCartShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const ProductDetailPage = () => {

    const { productId } = useParams();


    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);

    
    const [formData, setFormData] = useState({
        quantity: 1
    });

    useEffect(() => { 

        fetchProductData();
        fetchUserData();


     }, []);



    // function to handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const fetchProductData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/product/${productId}`);
            console.log(res.data);
            setProduct(res.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUserData = async () => {

        // Get the token from cookie 
        const token = await getTokenFromCookie();
    
    
        try {
            const response = await fetch('http://localhost:3001/protected/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
    
            const data = await response.json();
            console.log('Data:', data);
            setUser(data)

        } catch (error) {
            console.error('Error:', error);
        }
    }
    


    const getTokenFromCookie = async () => {

        
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {

          const [name, value] = cookie.split('=');
          
          if (name.trim() === 'token') {

            return decodeURIComponent(value);
          }

        }

        return null; 

    }

    

    const handleAddtoCart = async (e) => {

        e.preventDefault();

        console.log(formData.mquantity)

        return;


        // get token from cookie 
        const token = await getTokenFromCookie();

        // also check user is logged in ?
        if(!token){
            alert('Please, Login or Register.');
            return;
        }

         // Example data for the request
         const data = {
            user_id: user.id, 
            product_id: productId, 
            quantity: 1 
          };
      
          try {
            const res = await axios.post(
                'http://localhost:3001/cart', data, {
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
            });
            
            console.log('res:', res.data); 
            
          } catch (error) {
            
            console.error('Error:', error); 
          }

    }



   



    return (

        <div className="container">
            <div className='row'>
                <div className='col-md-6 mb-3 px-md-3'>
                    <img src={product.imageURL} className="img-thumbnail w-100" alt={product.title} />
                </div>
                <div className='col-md-6 mb-3 ps-md-4'>
                    <h3 className="mb-2">{product.title}</h3>

                    {product.deal && (
                        <div className="mb-2">
                            <span className="badge bg-danger">{product.deal}</span>
                        </div>
                    )}
                    
                    {product.deal && <p className="lead mb-2 fw-normal"><strike className="small text-danger">${(product.price)?.toFixed(2)}</strike> ${product.dealPrice.toFixed(2)}</p>}
                    
                    {!product.deal && <p className="lead mb-2 fw-normal">${(product.price)?.toFixed(2)}</p>}
                    

                    <p className="mb-3">Category: <span className='text-muted'>{product.category}</span></p>

                    <p>{product.description}</p>

                    <form className='d-flex' onSubmit={ handleAddtoCart }>
                      
                      <input type='hidden' name="productId"  />

                      <input className='form-control bg-white border w-50 rounded-pill text-body' 
                      name='quantity' 
                      value={formData.quantity}

                      onChange={handleChange}


                      required />

                      <button type='submit' className="btn btn-info rounded-pill ms-2 text-uppercase">
                        
                        
                        <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
 
                         Add to Cart
                         
                     </button>
 
                    </form>
                    

                </div>
            </div>
        </div>

    );
};

export default ProductDetailPage;