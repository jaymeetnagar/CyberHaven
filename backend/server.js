import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { verifyToken } from './util.js';


dotenv.config();
// Database Connection URL
const dbUrl = 'mongodb+srv://zeelghandi:Gandhi123@cluster0.wzoutru.mongodb.net/'

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

mongoose.connect(dbUrl).then(
  console.log("Database connection successful")
)


// ADMIN
import { createAdmin, getAllAdmin } from './controllers/adminController.js';

// API to create Admin
// deprecated
app.post('/admin', createAdmin);

// API to get All Admin
// deprecated
app.get('/admin/all', getAllAdmin);


// AUTH
import { adminLogin, customerLogin, getSessionStatus, logout } from './controllers/authController.js';

// API to login as Admin
app.post('/auth/admin', adminLogin);

// API to login as Customer
app.post('/auth/customer', customerLogin);

// API to get the session status
app.get('/auth/session-status', verifyToken, getSessionStatus);

// API to logout
app.get('/auth/logout', logout);


// CUSTOMER
import { createCustomer, deleteCustomer, updateCustomer, getAllCustomers } from './controllers/customerController.js';

// API to delete the customer which is accissible only to Admin and that user
app.delete('/customer', verifyToken, deleteCustomer);

// API to update the customer(email,address etc ) which is accissible only to Admin and that user
app.put('/customer', verifyToken, updateCustomer);

// API to get All Customers
app.get('/customer/all', verifyToken, getAllCustomers);

// API to create a new customer
// deprecated
app.post('/customer', createCustomer);


// CART
import { getCart, updateCart } from './controllers/cartController.js';

// API to get the cart of the user
app.get('/cart/:userId', verifyToken, getCart);

// API to update cart with quantity of product.
app.post('/cart', verifyToken, updateCart);


// PRODUCT
import { getAllProducts, getProduct, updateProduct, AddProduct, deleteProduct } from './controllers/productController.js';

// API to get all products
app.get('/product/all', getAllProducts);

// API to get a product by id
app.get('/product/:id', getProduct);

// API to update a product
app.put('/product/:id', verifyToken, updateProduct);

// API to add a new product
app.post('/product', verifyToken, AddProduct);

// API to delete a product
app.delete('/product/:id', verifyToken, deleteProduct);

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});