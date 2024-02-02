const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Admin = require('./models/Admin')
const Customer = require('./models/Customer')
const port = 8000

// Database Connection URL
const dbUrl = 'MONGODB_URL'

mongoose.connect(dbUrl);


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


// Create Customer

app.get('/create-customer', async (req, res) => {

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