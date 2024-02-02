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


// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body.data;

    // Find the user by email
    const user = await Customer.findOne({ email });


    // Check if user exists
    if (!user) {
      return res.send({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch, "passworddddd")
    if (passwordMatch) {
      res.send({ message: `Login successful. Welcome, ${user.name}!` });
    } else {
      res.send({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error during login.' });
  }
});


app.listen(port, () => {
  console.log(`backend app listening on port ${port}`)
})