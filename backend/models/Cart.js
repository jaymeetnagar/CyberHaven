// Define Cart schema
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: {
    type: Map,
    of: Number
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

// Example
// {
//     userId: 'userId',
//     items: {
//       'productId1': product1_quantity,
//       'productId2': product2_quantity
//     }
// }