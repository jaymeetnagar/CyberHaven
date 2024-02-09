const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Admin = require('./models/Admin')
const Customer = require('./models/Customer')
const bcrypt = require('bcrypt');
const cors = require('cors');

const port = 8000

// Database Connection URL
const dbUrl = 'mongodb+srv://zeelghandi:Gandhi123@cluster0.wzoutru.mongodb.net/'

app.use(cors())
app.use(express.json());

mongoose.connect(dbUrl).then(
  console.log("Databse connection successful")
)


app.get('/', (req, res) => {

  res.send({ message: 'CyberHaven Backend is Working' })

})


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

  await Customer.create({
    name: 'customer1',
    password: 'customer123',
    email: 'customer@example.com',
    phoneNumber: '1234567890',
    address: 'Lorem Ipsum has been the industrys standard dummy text ever since'
  });

  res.send({ 'message': 'Customer Created.' });

});


app.listen(port, () => {
  console.log(`backend app listening on port ${port}`)
})


const jwt = require('jsonwebtoken');
const secretKey = 'cyberHavenSecretKey';

// Generate JWT token upon user login
app.post('/login', (req, res) => {
  // Assuming user authentication succeeds
  const user = { username: req.username, password: req.password };
  const token = jwt.sign({ user }, secretKey, { expiresIn: '8h' });
  res.json({ token });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded.user;
    next();
  });
}

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  res.send('Protected route accessed');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});