import Admin from '../models/Admin.js';
import Customer from '../models/Customer.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const adminLogin = async (req, res) => {
    // Assuming user authentication succeeds
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin || !bcrypt.compareSync(req.body.password, admin.password)) {
        return res.send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email, isAdmin: true, name: admin.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
    res.cookie('token', token, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true }); // maxAge is in 
    res.json({ message: 'Login successful', userData: { isAuthenticated: true, user: {isAdmin: true, name: admin.name, email: admin.email, userId: admin._id }}});
}

const customerLogin = async (req, res) => {
    // Assuming user authentication succeeds
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer || !bcrypt.compareSync(req.body.password, customer.password)) {
        return res.send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: customer._id, email: customer.email, isAdmin: false, name: customer.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });
    res.cookie('token', token, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true }); // maxAge is in 
    res.json({ message: 'Login successful', userData: { isAuthenticated: true, user: {isAdmin: false, name: customer.name, email: customer.email, userId: customer._id}}});
}

const getSessionStatus = (req, res) => {
    if (req.user) {
        res.send({ isAuthenticated: true, user: {isAdmin: req.user.isAdmin, name: req.user.name, email: req.user.email, userId: req.user.id}});
    } else {
        res.send({ isAuthenticated: false });
    }
}

export { adminLogin, customerLogin, getSessionStatus };