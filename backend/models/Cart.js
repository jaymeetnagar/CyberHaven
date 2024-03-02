// Define Cart schema
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [{
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
    }
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
