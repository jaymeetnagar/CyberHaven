const mongoose = require('mongoose');

// Define Product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: String,
    price: {
        type: Number,
        required: true
    },
    description: String,
    imageURL: String,
    deal: String,
    dealPrice: Number
})

const Product = mongoose.model('product', productSchema)

module.exports = Product