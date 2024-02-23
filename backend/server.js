const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Admin = require('./models/Admin')
const Customer = require('./models/Customer')
const Product = require('./models/Product')
const Cart = require('./models/Cart')
const cors = require('cors');


// Database Connection URL
const dbUrl = 'mongodb+srv://zeelghandi:Gandhi123@cluster0.wzoutru.mongodb.net/'

app.use(cors())
app.use(express.json());

mongoose.connect(dbUrl).then(
  console.log("Databse connection successful")
)


// Get All Admin
app.get('/all-admin', async (req, res) => {

  const data = await Admin.find().exec();

  res.send({ data: data });

});



// Create Admin

app.get('/create-admin', async (req, res) => {

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
  const admin = await Admin.findOne({ email: req.body.email, password: req.body.password });
  if (!admin) {
    return res.send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin._id, email: admin.email, password: admin.password, isAdmin: true }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
  res.json({ token });
});

app.post('/customer-login', async (req, res) => {
  // Assuming user authentication succeeds
  const customer = await Customer.findOne({ email: req.body.email, password: req.body.password });
  if (!customer) {
    return res.send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: customer._id, email: customer.email, password: customer.password, isAdmin: false }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
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


// API to add a product to the cart
app.put('/cart', verifyToken, async (req, res) => {
  try {
    if (req.user.id != req.body.user_id) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const { user_id, product_id, quantity = 1 } = req.body;
    await Cart.create(
      user_id,
      product_id,
      quantity
    )
    res.send({ message: 'Product added to the Cart.' })

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding to cart.' });
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

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});