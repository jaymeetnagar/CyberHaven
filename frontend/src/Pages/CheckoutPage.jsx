import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../Components/Alert';
import { getUserData } from '../store';
import {loadStripe} from '@stripe/stripe-js';

const CheckoutPage = () => {
    const user = getUserData();
    const [formData, setFormData] = useState({
        fullName: user.name || '',
        email: user.email || '',
        phone: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [cartItems, setCartItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (user.isAuthenticated) {
            getCartItems();
        }
    }, []);

    const getCartItems = async () => {
        const items = await fetchCartItems();
        const promises = items && Object.keys(items).map((key) => fetchProductByProductId(key));
        const products = await Promise.all(promises);
        products.forEach((product) => { product.quantity = items[product._id] });
        setCartItems(products);
    }

    const fetchCartItems = async () => {
        try {
            const result = await fetch("http://localhost:3001/cart/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await result.json();
            return response.data.items;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchProductByProductId = async (productId) => {
        try {
            const result = await fetch("http://localhost:3001/product/" + productId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await result.json();
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO : keep these in a .env file
        const stripe = await loadStripe("pk_live_51P6g2rP9es0sj8Od6ggchTsHt9OzExpmNp3zXn8LJn91AZdXP9ndqdgkWH5ae2u4l2a8SSnhHNMk2t2iSvuNrNdH00ccGXKrae");
        const body = {
            products: cartItems
        }
        const headers = {
            "Content-Type": "application/json",
        };
        const response = await fetch(`http://localhost:3001/create-checkout-session`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        }); 

    };

    return (
        <div className="container">
            <div className="row flex-wrap">
                <div className="col-md-7 me-4">
                <h2 className='mb-3'>Checkout</h2>
                    {showAlert && <Alert message={"Checkout Completed. Thank you!"} />}
                    <form action="#" method="post" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control bg-white text-body" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control bg-white text-body" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input type="tel" className="form-control bg-white text-body" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input type="text" className="form-control bg-white text-body" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                            <input type="text" className="form-control bg-white text-body" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cvv" className="form-label">CVV</label>
                            <input type="text" className="form-control bg-white text-body" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
                        </div> */}
                        <button type="submit" className="btn btn-info w-100 mb-2">Pay Now</button>
                        <Link className='btn w-100 text-muted' to="/cart">Back to Cart</Link>
                    </form>
                </div>
                <div className="col-md-4" style={{minWidth:"400px"}}>
                    <h3>Order Details</h3>
                    <ul className="list-group">
                        {cartItems.map((item) => (
                            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <img src={item.imageURL} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                <span>${item.price.toFixed(2)}</span>
                                <span>
                                    <span className="badge bg-secondary">x{item.quantity}</span>
                                </span>
                                <span>${item.price*item.quantity}</span>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Subtotal:
                            <span>${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
