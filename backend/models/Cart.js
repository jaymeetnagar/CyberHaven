const mongoose = require('mongoose');

// Define Cart schema
const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        default: 1,
        type: Number,
    }
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart