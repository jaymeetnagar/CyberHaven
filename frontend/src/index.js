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
import { Navigate, Outlet } from 'react-router-dom';
import CartComponent from './Components/CartComponent';
import CartPage from './Pages/Cart/CartPage';

const ProtectedRoute = ({ children }) => {
  
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

const Wrapper = ({ children }) => {
  
  return <>
  <NavbarComponent/>
  {children}
  <FooterComponent/>
   </>
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <NavbarComponent /> */}
      <Routes>
        <Route path='/' exact element={<Wrapper><HomePage /></Wrapper> } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path="/cart" element={<Wrapper><CartPage /></Wrapper>} />
        <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }/>
      </Routes>
      {/* <FooterComponent /> */}
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
