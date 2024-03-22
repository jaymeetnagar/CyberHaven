const { adminLogin, customerLogin, getSessionStatus, logout } = require('../controllers/authController');
const Admin = require('../models/Admin');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock('../models/Admin', () => ({
    findOne: jest.fn(),
}));

jest.mock('../models/Customer', () => ({
    findOne: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    compareSync: jest.fn(),
}));

describe('adminLogin', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return login successful message if credentials are correct', async () => {
        // Mocking admin data and request
        const req = { body: { email: 'admin@example.com', password: 'admin123' } };
        const admin = { _id: 'adminId', email: 'admin@example.com', password: 'hashedPassword', name: 'Admin' };
        Admin.findOne.mockResolvedValue(admin);
        bcrypt.compareSync.mockReturnValue(true);
        jwt.sign.mockReturnValue('token');

        // Mock response object
        const res = { cookie: jest.fn(), json: jest.fn() };

        // Call the controller function
        await adminLogin(req, res);

        // Assert expected behavior
        expect(Admin.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.password, admin.password);
        expect(jwt.sign).toHaveBeenCalledWith({ id: admin._id, email: admin.email, isAdmin: true, name: admin.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
        expect(res.cookie).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', userData: { isAuthenticated: true, user: { isAdmin: true, name: admin.name, email: admin.email, userId: admin._id } } });
    });

    it('should return "Invalid credentials" message if email is not found', async () => {
        // Mocking request with an email that doesn't exist in the database
        const req = { body: { email: 'nonexistent@example.com', password: 'admin123' } };
        Admin.findOne.mockResolvedValue(null);

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await adminLogin(req, res);

        // Assert expected behavior
        expect(Admin.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.send).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return "Invalid credentials" message if password is incorrect', async () => {
        // Mocking admin data, request, and incorrect password
        const req = { body: { email: 'admin@example.com', password: 'wrongPassword' } };
        const admin = { email: 'admin@example.com', password: 'hashedPassword' };
        Admin.findOne.mockResolvedValue(admin);
        bcrypt.compareSync.mockReturnValue(false);

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await adminLogin(req, res);

        // Assert expected behavior
        expect(Admin.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.password, admin.password);
        expect(res.send).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
});


describe('customerLogin', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return login successful message if credentials are correct', async () => {
        // Mocking customer data and request
        const req = { body: { email: 'customer@example.com', password: 'customer123' } };
        const customer = { _id: 'customerId', email: 'customer@example.com', password: 'hashedPassword', name: 'Customer' };
        Customer.findOne.mockResolvedValue(customer);
        bcrypt.compareSync.mockReturnValue(true);
        jwt.sign.mockReturnValue('token');

        // Mock response object
        const res = { cookie: jest.fn(), json: jest.fn() };

        // Call the controller function
        await customerLogin(req, res);

        // Assert expected behavior
        expect(Customer.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.password, customer.password);
        expect(jwt.sign).toHaveBeenCalledWith({ id: customer._id, email: customer.email, isAdmin: false, name: customer.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });
        expect(res.cookie).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', userData: { isAuthenticated: true, user: { isAdmin: false, name: customer.name, email: customer.email, userId: customer._id } } });
    });

    it('should return "Invalid credentials" message if email is not found', async () => {
        // Mocking customer data and request with non-existent email
        const req = { body: { email: 'nonexistent@example.com', password: 'customer123' } };
        Customer.findOne.mockResolvedValue(null);

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await customerLogin(req, res);

        // Assert expected behavior
        expect(Customer.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.send).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return "Invalid credentials" message if password is incorrect', async () => {
        // Mocking customer data, request, and incorrect password
        const req = { body: { email: 'customer@example.com', password: 'wrongPassword' } };
        const customer = { email: 'customer@example.com', password: 'hashedPassword' };
        Customer.findOne.mockResolvedValue(customer);
        bcrypt.compareSync.mockReturnValue(false);

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await customerLogin(req, res);

        // Assert expected behavior
        expect(Customer.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.password, customer.password);
        expect(res.send).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

});


describe('getSessionStatus', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return isAuthenticated true and user details if user is authenticated', () => {
        // Mocking request object with user information
        const req = { user: { isAdmin: true, name: 'Admin', email: 'admin@example.com', id: 'adminId' } };

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        getSessionStatus(req, res);

        // Assert expected behavior
        expect(res.send).toHaveBeenCalledWith({ isAuthenticated: true, user: { isAdmin: true, name: 'Admin', email: 'admin@example.com', userId: 'adminId' } });
    });

    it('should return isAuthenticated false if user is not authenticated', () => {
        // Mocking request object without user information
        const req = { user: null };

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        getSessionStatus(req, res);

        // Assert expected behavior
        expect(res.send).toHaveBeenCalledWith({ isAuthenticated: false });
    });
});

describe('logout', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should clear the token cookie and return "Logged out" message', () => {
        // Mock response object
        const res = { clearCookie: jest.fn(), send: jest.fn() };

        // Call the controller function
        logout({}, res);

        // Assert expected behavior
        expect(res.clearCookie).toHaveBeenCalledWith('token');
        expect(res.send).toHaveBeenCalledWith({ message: 'Logged out' });
    });
});