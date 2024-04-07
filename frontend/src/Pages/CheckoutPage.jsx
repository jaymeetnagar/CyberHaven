import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {


    const handleSubmit = (e) => {
        
        e.preventDefault();

        // save checkout data

        alert('Checkout Completed. Thankyou!');

        e.target.reset();

    }



    return (
        <div className="container">
            
            <div className="col-md-6 mx-auto">

            <h2 className='mb-3'>Checkout</h2>

            <form action="#" method="post" onSubmit={ handleSubmit }>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control bg-white border-secondary text-body" id="fullName" name="fullName" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control bg-white border-secondary text-body" id="email" name="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control bg-white border-secondary text-body" id="phone" name="phone" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <input type="text" className="form-control bg-white border-secondary text-body" id="cardNumber" name="cardNumber" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input type="text" className="form-control bg-white border-secondary text-body" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input type="text" className="form-control bg-white border-secondary text-body" id="cvv" name="cvv" required />
                </div>
                <button type="submit" className="btn btn-info w-100 mb-2">Checkout</button>
                <Link className='btn w-100 text-muted' to="/cart">Back to Cart</Link>
            </form>
            </div>

        </div>
    );
}

export default CheckoutPage;
