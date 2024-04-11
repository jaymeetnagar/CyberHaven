import Customer from '../models/Customer.js';

// API to delete the customer which is accissible only to Admin and that user
/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.userId
**/
const deleteCustomer = async (req, res) => {
    try {
        if (!req.user.isAdmin || req.user.id !== req.body.userId) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const { userId } = req.body;
        const customer = await Customer.findByIdAndDelete({ userId });
        if (!customer) {
            return res.send({ message: 'Customer not found.' });
        }
        res.send({ message: 'Customer deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting customer.' });
    }
}

// API to update the customer(email,address etc ) which is accissible only to Admin and that user
/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.userId
 * @param {Object} req.body.newUser
 * @param {string} [req.body.newUser.name]
 * @param {string} [req.body.newUser.email]
 * @param {string} [req.body.newUser.password]
 * @param {string} [req.body.newUser.phoneNumber]
 * @param {string} [req.body.newUser.address]
**/
const updateCustomer = async (req, res) => {
    try {
        if (!req.user.isAdmin || req.user.uerId !== req.body.userId) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const { userId } = req.body;
        const customer = await Customer.findByIdAndUpdate(userId, req.body.newUser);
        if (!customer) {
            return res.send({ message: 'Customer not found.' });
        }
        res.send({ message: 'Customer updated.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating customer.' });
    }
}

// API to get all customers
const getAllCustomers = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const data = await Customer.find().exec();
    res.send({ data: data });
}

// API to create a new customer
/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {Object} req.body.newUser
 * @param {string} req.body.newUser.name
 * @param {string} req.body.newUser.email
 * @param {string} req.body.newUser.password
 * @param {string} [req.body.newUser.phoneNumber]
 * @param {string} [req.body.newUser.address]
 **/
const createCustomer = async (req, res) => {
    try {
        const { newUser } = req.body;
        const existingUser = await Customer.findOne({ email: newUser.email });
        if (existingUser) {
            return res.send({ message: 'Email already in use.' });
        }
        else {
            await Customer.create(newUser);
            res.send({ message: 'Signup successful' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating customer.' });
    }
}

export { deleteCustomer, updateCustomer, getAllCustomers, createCustomer };