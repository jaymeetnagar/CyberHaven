const mongoose = require('mongoose');

// Define Admin schema
const adminSchema = new mongoose.Schema({
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
        required: true
    }
})

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin


