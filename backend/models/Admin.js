const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Admin schema
const adminSchema = new mongoose.Schema({
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
        set(password) {
            return bcrypt.hashSync(password, 10);
        },
    },
})

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin


