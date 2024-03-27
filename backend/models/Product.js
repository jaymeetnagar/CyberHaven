import mongoose from 'mongoose';

// Define Product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'general'
    },
    category: String,
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    deal: String,
    dealPrice: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('product', productSchema)

export default Product;