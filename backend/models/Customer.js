import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: (password) => {
      return bcrypt.hashSync(password, 10);
    }
  },
  phoneNumber: String,
  address: String
});



const Customer = mongoose.model('customer', customerSchema);

export default Customer;