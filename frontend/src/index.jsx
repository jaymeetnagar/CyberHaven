import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import LoginPage from './Pages/login&registration/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from './Components/AdminPage';
import AdminLogin from './Components/AdminLogin';
import HomePage from './Pages/HomePage';
import { Navigate } from 'react-router-dom';
import { SimpleSlider } from './Pages/HomePage';
import { getUserData, updateUserData } from './store';
import { useState, useEffect } from 'react';
import ProductCategoryPage from './Pages/ProductCategoryPage';
import ProductDetailPage from './Components/ProductDetailPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import ProductEditPage from './Components/ProductEditPage';
import ProductCreatePage from './Components/ProductCreatePage';

const ProtectedRoute = ({ children }) => {

    if (!getUserData().isAuthenticated) {
        return <Navigate to="/auth/admin" replace />;
    }

    return children;
};

const Wrapper = ({ children }) => {

    return <>
        <NavbarComponent />
        {children}
        <FooterComponent />
    </>
};

const App = () => {
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        fetchSessionStatus();
    }, []);
    
    const fetchSessionStatus = async () => {
        try {
            const result = await fetch("http://localhost:3001/auth/session-status", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await result.json();
            updateUserData(response);
            setIsDataFetched(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <BrowserRouter>
            {/* <NavbarComponent /> */}
            {isDataFetched && (<Routes>
                <Route path='/' exact element={<Wrapper><HomePage /></Wrapper>} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/auth/admin' element={<AdminLogin />} />

                {/* products category page route */}
                <Route path='/products/:category' element={<Wrapper><ProductCategoryPage /></Wrapper>} />

                {/* product detail page route */}
                <Route path='/product-details/:productId' element={<Wrapper><ProductDetailPage /></Wrapper>} />

                {/* cart page route */}
                <Route path='/cart' element={<Wrapper><CartPage /></Wrapper>} />

                
                {/* checkout page route */}
                <Route path='/checkout' element={<Wrapper><CheckoutPage /></Wrapper>} />


                {/* admin product page route */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminPage />
                        </ProtectedRoute>
                } />

                
                {/* admin product edit page route */}
                <Route path="/admin/edit-product/:productId" element={
                    <ProtectedRoute>
                        <ProductEditPage />
                    </ProtectedRoute>
                  
                } />

                {/* admin product edit page route */}
                <Route path="/admin/create-product" element={
                    <ProtectedRoute>
                        <ProductCreatePage />
                    </ProtectedRoute>
                } />

            </Routes>)}
            {/* <FooterComponent /> */}
        </BrowserRouter>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
