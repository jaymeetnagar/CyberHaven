const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Admin = require('./models/Admin')
const Customer = require('./models/Customer')
const bcrypt = require('bcrypt');
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
app.get('/all-customer', async (req, res) => {

  const data = await Customer.find().exec();

  res.send({ data: data });

});


app.post('/create-customer', async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.send({ message: 'Email already in use.' });
    }
    else {
      await Customer.create({
        name,
        email,
        password: hashedPassword,
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
  const admin = await Admin.findOne({ email: req.body.email, password: req.body.password});
  if (!admin) {
    return res.send({message:'Invalid credentials'});
  }
  const token = jwt.sign({ id:admin._id, email:admin.email, password:admin.password, isAdmin: true }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
  res.json({ token });
});

app.post('/customer-login', async (req, res) => {
  // Assuming user authentication succeeds
  const customer = await Customer.findOne({ email: req.body.email, password: req.body.password});
  if (!customer) {
    return res.send({message:'Invalid credentials'});
  }
  const token = jwt.sign({ id:customer._id, email:customer.email, password:customer.password, isAdmin: false }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });
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

// Update Cart Item Quantity
app.put('/update-cart-item/:cartId/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body.data;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity = quantity;
      await cart.save();
      res.send({ message: 'Cart item quantity updated successfully', cart });
    } else {
      return res.status(404).send({ message: 'Product not found in the cart' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating cart item quantity.' });
  }
});

// Remove Product from Cart
app.delete('/remove-from-cart/:cartId/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }

    const initialItemCount = cart.items.length;

    // Remove the product from the cart
    cart.items = cart.items.filter(item => !item.productId.equals(productId));

    // Check if the item was actually removed
    if (cart.items.length === initialItemCount) {
      return res.status(404).send({ message: 'Product not found in the cart' });
    }

    await cart.save();

    res.send({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error removing product from cart.' });
  }
});


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});