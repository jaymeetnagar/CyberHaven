import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserData } from '../store';
import Alert from './Alert';

const ProductDetailPage = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    

    useEffect(() => { fetchProductData(); }, []);

    const userId = getUserData().userId;

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
            const result = await fetch("http://localhost:3001/cart/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ productId: productId, quantity: 1 })
            });
            const response = await result.json();
            if (response.message === "Cart Updated.") {
                setShowAlert(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div className="container">
        
           { showAlert && <Alert message={ "Product Added to Cart." } /> }

            <div className='row'>
                <div className='col-md-6 mb-3'>
                    <img src={product.imageURL} className="card-img-top shadow-sm border rounded" alt={product.title} />
                </div>
                <div className='col-md-6 mb-3 ps-md-4'>
                    <h3 className="mb-2">{product.title}</h3>
                    <p className="lead mb-2 fw-normal">${(product.price)?.toFixed(2)}</p>
                    <p className="mb-3"><span className='badge bg-info text-body'>{product.category}</span></p>
                    <p className='mb-3'>{product.description}</p>
                    <button className="my-2 btn btn-info" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;