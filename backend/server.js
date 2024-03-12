const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Admin = require('./models/Admin')
const Customer = require('./models/Customer')
const Product = require('./models/Product')
const Cart = require('./models/Cart')
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');


// Database Connection URL
const dbUrl = 'mongodb+srv://zeelghandi:Gandhi123@cluster0.wzoutru.mongodb.net/'

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(dbUrl).then(
  console.log("Database connection successful")
)


// Get All Admin
app.get('/all-admin', async (req, res) => {

  const data = await Admin.find().exec();

  res.send({ data: data });

});



// Create Admin

app.get('/create-admin', async (req, res) => {

  console.log({
    name: 'admin1',
    password: 'admin123',
    email: 'admin@example.com',
  })

  await Admin.create({
    name: 'admin1',
    password: 'admin123',
    email: 'admin@example.com',
  });

  res.send({ 'message': 'Admin Created.' });

});



// Get All Customers
app.get('/customer/all', verifyToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const data = await Customer.find().exec();

  res.send({ data: data });

});



app.post('/create-customer', async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.send({ message: 'Email already in use.' });
    }
    else {
      await Customer.create({
        name,
        email,
        password,
        phoneNumber,
        address,
      });

      res.send({ message: 'Signup successful' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating customer.' });
  }
});

require('dotenv').config();
const jwt = require('jsonwebtoken');




// Generate JWT token upon user login
app.post('/admin-login', async (req, res) => {
  // Assuming user authentication succeeds
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin || !bcrypt.compareSync(req.body.password, admin.password)) {
    return res.send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin._id, email: admin.email, isAdmin: true }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
  res.cookie('token', token, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true }); // maxAge is in 
  res.json({ message: 'Login successful', userData: { isAuthenticated: true, isAdmin: true, name: admin.name, email: admin.email } });
});

app.post('/customer-login', async (req, res) => {
  // Assuming user authentication succeeds
  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer || !bcrypt.compareSync(req.body.password, customer.password)) {
    return res.send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: customer._id, email: customer.email, isAdmin: false }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });
  res.cookie('token', token, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true }); // maxAge is in 
  res.json({ message: 'Login successful', userData: { isAuthenticated: true, isAdmin: false, name: customer.name, email: customer.email } });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = decoded;
    next();
  });
}

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  res.send(req.user);
});


// API to delete the customer which is accissible only to Admin and that user
app.delete('/customer', verifyToken, async (req, res) => {
  try {
    if (!req.user.isAdmin || req.user.email !== req.body.email) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const { email } = req.body;
    const customer = await Customer.findOneAndDelete({ email });
    if (!customer) {
      return res.send({ message: 'Customer not found.' });
    }
    res.send({ message: 'Customer deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting customer.' });
  }
});

// API to update the customer(email,address etc ) which is accissible only to Admin and that user
app.put('/customer', verifyToken, async (req, res) => {
  try {
    if (!req.user.isAdmin || req.user.email !== req.body.email) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const { email } = req.body;
    const customer = await Customer.findOneAndUpdate({ email }, req.body.newUser);
    if (!customer) {
      return res.send({ message: 'Customer not found.' });
    }
    res.send({ message: 'Customer updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating customer.' });
  }
});

// API to get the cart of the user
app.get('/cart/:userId', verifyToken, async (req, res) => {
  try {
    if (req.user.id != req.params.userId) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.send({ message: 'Cart not found.' });
    }
    res.send({ data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching cart.' });
  }
})

// API to add a product to the cart
app.post('/cart', verifyToken, async (req, res) => {
  try {
    if (req.user.id != req.body.user_id) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const { user_id, product_id, quantity = 1 } = req.body;
    const cart = await Cart.findOne({ userId:user_id });
    if (!cart) {
      await Cart.create({
        userId: user_id,
        items: [{ productId: product_id, quantity }]
      })
      res.send({ message: 'Product added to the Cart.' });
    }
    else {
      const item = cart.items.find(item => item.productId === product_id);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ productId:product_id, quantity });
      }
      await cart.save();
      res.send({ message: 'Product added to the Cart.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding to cart.' });
  }
})

// API to remove a product from the cart
app.delete('/cart', verifyToken, async (req, res) => {
  try {
    if (req.user.id != req.body.user_id) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const { user_id, product_id, quantity = 1 } = req.body;
    const cart = await Cart.findOne({ userId: user_id });
    if (!cart) {
      return res.send({ message: 'Cart not found.' });
    }
    const item = cart.items.find(item => item.productId === product_id);
    if (!item) {
      return res.send({ message: 'Product not found in cart.' });
    }
    if (item.quantity > quantity) {
      item.quantity -= quantity;
    } else {
      cart.items = cart.items.filter(item => item.productId !== product_id);
    }
    await cart.save();
    res.send({ message: 'Product removed from the Cart.' });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error removing from cart.' });
  }
})

app.get('/product/all', async (req, res) => {
  try {
    const data = await Product.find().exec();
    res.send({ data: data });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching Products.' });
  }
});

app.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const data = await Product.findById(productId).exec();
    res.send({ data: data });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching Product' });
  }
});

// Update a product
app.put('/product/:id', verifyToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const productId = req.params.id;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true }).exec();
    res.send({ data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating product.' });
  }
});

// Add a new product
app.post('/product', verifyToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const newProductData = req.body;

  try {
    const newProduct = new Product(newProductData);
    const savedProduct = await newProduct.save();
    res.status(201).send({ data: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding new product.' });
  }
});

// Delete a product
app.delete('/product/:id', verifyToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId).exec();
    res.send({ data: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting product.' });
  }
});


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});