import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "./Alert";

const ProductEditPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/product/${productId}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newProductData = {
            title: event.target.title.value,
            price: parseInt(event.target.price.value),
            category: event.target.category.value,
            description: event.target.description.value,
            imageURL: event.target.imageURL.value,
        };

        fetch(`http://localhost:3001/product`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({productId, newProductData}),
        })
            .then((response) => response.json())
            .then((result) => {
                setShowAlert(true);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setProduct({
            ...product,
            [name]: value
        });
    };

    return (
        <div className="bg-dark vh-min-100">
            <div className="container">
                <h1 className="mb-3 text-center text-white pt-4">CyberHaven - Admin</h1>
                {showAlert && <Alert message={"Product Updated Successfully"} />}
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <div className="mb-4">
                            <h3 className="mb-3 text-white">Edit Product</h3>
                            <Link to="/admin/" className="btn btn-light">
                                Back to Admin
                            </Link>
                        </div>
                        <img src={product.imageURL} className="rounded img-thumbnail" alt={product.title} />
                    </div>
                    <div className="col-md-7">
                        <div className="card mb-5">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">
                                            Title
                                        </label>
                                        <input type="text" onChange={handleInputChange} className="form-control bg-white text-body" id="title" name="title" value={product.title} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">
                                            Price
                                        </label>
                                        <input type="number" onChange={handleInputChange} className="form-control bg-white text-body" id="price" name="price" value={product.price} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">
                                            Category
                                        </label>
                                        <input type="text" onChange={handleInputChange} className="form-control bg-white text-body" id="category" name="category" value={product.category} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="imageURL" className="form-label">
                                            Image
                                        </label>
                                        <input type="text" onChange={handleInputChange} className="form-control bg-white text-body" id="imageURL" name="imageURL" value={product.imageURL} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            Description
                                        </label>
                                        <textarea className="form-control bg-white text-body" id="description" rows={6} name="description" value={product.description} required onChange={handleInputChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Update Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditPage;
