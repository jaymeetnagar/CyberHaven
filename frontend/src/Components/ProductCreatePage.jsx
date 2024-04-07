import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';

const ProductCreatePage = () => {

    const [product, setProduct] = useState([]);

    const [showAlert, setShowAlert] = useState(false);


    const handleSubmit = (event) => {
        
        event.preventDefault();

        const product = {
            title: event.target.title.value,
            price: event.target.price.value,
            category: event.target.category.value,
            description: event.target.description.value,
            imageURL: event.target.imageURL.value
        };
        
        // Logic to handle form submission
        console.log('New product:', product);


        fetch(`http://localhost:3001/product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(product)
        })
        .then((response) => response.json())
        .then((result) => {

            
            setShowAlert(true);

        });

    };




    return (
        <div className='bg-dark vh-min-100'>
        <div className="container">

            <h1 className="mb-4 text-center text-white">CyberHaven - Admin</h1>


            
            { showAlert && <Alert message={ "Product Added Successfully" } /> }

           <div className='row'>

            <div className="col-md-4 mb-3">
            <div className="mb-4">
                
                <h3 className='mb-3 text-white'>New Product</h3>
                
                <Link to="/admin/" className='btn btn-light'>Back to Admin</Link>
                
                </div>

                <img src="https://placehold.co/600x400" className="rounded img-thumbnail" alt={"Placeholder"} />
            </div>
            <div className="col-md-7 mb-3 ps-md-4">
                
                <div className='card mb-5'>
                    <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control bg-white text-body" id="title" name="title"  required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control bg-white text-body" id="price" name="price" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control bg-white text-body" id="category" name="category" required />
                    </div>

                    
                    <div className="mb-3">
                        <label htmlFor="imageURL" className="form-label">Image</label>
                        <input type="text" className="form-control bg-white text-body" id="imageURL" name="imageURL" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control bg-white text-body" id="description" rows={6} name="description"   required />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Product</button>
                </form>
                    </div>

                </div>

            </div>
            </div>

        </div>
        </div>
    );
};

export default ProductCreatePage;
