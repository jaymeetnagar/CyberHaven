const mongoose = require('mongoose')

// Define Admin schema
const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin


