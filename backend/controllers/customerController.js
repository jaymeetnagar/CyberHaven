import Customer from '../models/Customer.js';

// API to delete the customer which is accissible only to Admin and that user
const deleteCustomer = async (req, res) => {
    try {
        if (!req.user.isAdmin || req.user.email !== req.body.email) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const { email } = req.body;
        const customer = await Customer.findOneAndDelete({ email });
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
const updateCustomer = async (req, res) => {
    try {
        if (!req.user.isAdmin || req.user.email !== req.body.email) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const { email } = req.body;
        const customer = await Customer.findOneAndUpdate({ email }, req.body.newUser);
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
 * deprecated
 */
const createCustomer = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;

        const existingUser = await Customer.findOne({ email });
        if (existingUser) {
            return res.send({ message: 'Email already in use.' });
        }
        else {
            await Customer.create({
                name,
                email,
                password,
                phoneNumber,
                address,
            });

            res.send({ message: 'Signup successful' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating customer.' });
    }
}

export { deleteCustomer, updateCustomer, getAllCustomers, createCustomer };