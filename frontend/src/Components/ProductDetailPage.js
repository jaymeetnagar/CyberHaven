import { useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetailPage = () => {

    const { productId } = useParams();


    const [product, setProduct] = useState([]);

    useEffect(() => { fetchProductData(); }, []);


    const fetchProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/product/${productId}`);
            console.log(response.data);
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    return (



        <div className="container">

            <div className='row'>

                <div className='col-md-6 mb-3'>
                    <img src="https://placehold.co/600x400/png" className="card-img-top" alt={product.name} />
                </div>


                <div className='col-md-6 mb-3 ps-md-4'>
                    <h3 className="mb-2">{product.name}</h3>
                    <p className="lead mb-2 fw-normal">${(product.price).toFixed(2)}</p>

                    <p className="mb-3">Category: <span className='text-muted'>{product.category}</span></p>

                    <p>{ product.description }</p>


                    <button className="btn btn-info rounded-pill text-uppercase" product-id={product._id}>Add to Cart</button>

                </div>

            </div>





        </div>
    );
};

export default ProductDetailPage;