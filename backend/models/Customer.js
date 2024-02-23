const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    set(password) {
      this._password = bcrypt.hashSync(password, 10); 
    },
  },
  phoneNumber: String,
  address: String
});



const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
