const mongoose = require('mongoose');

// Define Admin schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    imageURL: String
})

const Product = mongoose.model('product', productSchema)

module.exports = Product


