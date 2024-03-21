// Define Cart schema
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [{
    productId: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'product'
    },
    quantity: {
      type: Number,
    }
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;