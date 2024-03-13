// Define Cart schema
import mongoose from 'mongoose';

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

export default Cart;