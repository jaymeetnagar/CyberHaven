const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Customer schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  address: String
});



const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
