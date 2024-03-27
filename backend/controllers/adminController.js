import Admin from '../models/Admin.js';

// API to create a new admin
/**
 * deprecated
 */
const createAdmin = async (req, res) => {
    await Admin.create({
        name: 'admin1',
        password: 'admin123',
        email: 'admin@example.com',
    });
    res.send({ 'message': 'Admin Created.' });
}

// API to get all admins
/**
 * deprecated
 * 
 * should be logged in as admin to access this API
 */
const getAllAdmin = async (req, res) => {
    if(!req.user.isAdmin) {
        return res.send({ message: 'Unauthorized access.' });
    }
    const data = await Admin.find({}).exec();
    res.send({ data: data });
}

export { createAdmin, getAllAdmin };