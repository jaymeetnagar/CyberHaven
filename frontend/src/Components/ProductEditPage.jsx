import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./AdminPage.css"; // Create AdminPage.css file for custom styling

const ProductEditPage = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState([]);

    useEffect(() => { fetchProductData(); }, []);

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/product/${productId}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };





    const handleSubmit = (event) => {
        
        event.preventDefault();

        const editedProduct = {
            productId : productId,
            title: event.target.title.value,
            price: event.target.price.value,
            category: event.target.category.value,
            description: event.target.description.value,
            imageURL: product.imageURL // Assuming the image URL remains unchanged
        };
        
        // Logic to handle form submission
        console.log('Edited product:', editedProduct);


        fetch(`http://localhost:3001/product`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(editedProduct)
        })
        .then((response) => response.json())
        .then((result) => {

            alert("Product Updated Successfully");

        });

    };




    return (
        <div className="container-fluid admin-page">
            <h1 className="mb-4 text-center">CyberHaven - Admin</h1>


           <div className='row'>

            <div className="col-md-4 mb-3">
            <div className="mb-4">
                
                <h3 className='mb-3'>Edit Product</h3>
                
                <Link to="/admin/" className='btn btn-light'>Back to Admin</Link>
                
                </div>

                <img src={product.imageURL} className="rounded img-thumbnail" alt={product.title} />
            </div>
            <div className="col-md-7 mb-3 ps-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control bg-white text-body" id="title" name="title" value={product.title}  required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control bg-white text-body" id="price" name="price" value={product.price}  required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control bg-white text-body" id="category" name="category" value={product.category}  required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control bg-white text-body" id="description" rows={6} name="description" value={product.description}  required />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
            </div>

        </div>
    );
};

export default ProductEditPage;
