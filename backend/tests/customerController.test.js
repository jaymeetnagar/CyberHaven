import { deleteCustomer, updateCustomer, getAllCustomers, createCustomer } from '../controllers/customerController';
import Customer from '../models/Customer';

jest.mock('../models/Customer', () => ({
    findOneAndDelete: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
}));

describe('deleteCustomer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete customer if user is admin and matches the user email', async () => {
        const req = { user: { isAdmin: true, email: 'admin@example.com' }, body: { email: 'customer@example.com' } };
        Customer.findOneAndDelete.mockResolvedValue({});

        const res = { send: jest.fn() };

        await deleteCustomer(req, res);

        expect(Customer.findOneAndDelete).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.send).toHaveBeenCalledWith({ message: 'Customer deleted.' });
    });

    it('should return "Unauthorized" if user is not admin or email does not match', async () => {
        const req = { user: { isAdmin: false, email: 'user@example.com' }, body: { email: 'customer@example.com' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await deleteCustomer(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(Customer.findOneAndDelete).not.toHaveBeenCalled();
    });

    it('should return "Customer not found" if customer is not found', async () => {
        const req = { user: { isAdmin: true, email: 'admin@example.com' }, body: { email: 'nonexistent@example.com' } };
        Customer.findOneAndDelete.mockResolvedValue(null);

        const res = { send: jest.fn() };

        await deleteCustomer(req, res);

        expect(Customer.findOneAndDelete).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.send).toHaveBeenCalledWith({ message: 'Customer not found.' });
    });
});

describe('updateCustomer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update customer if user is admin and matches the user email', async () => {
        const req = { user: { isAdmin: true, email: 'admin@example.com' }, body: { email: 'customer@example.com', newUser: { name: 'Updated Customer' } } };
        Customer.findOneAndUpdate.mockResolvedValue({});

        const res = { send: jest.fn() };

        await updateCustomer(req, res);

        expect(Customer.findOneAndUpdate).toHaveBeenCalledWith({ email: req.body.email }, req.body.newUser);
        expect(res.send).toHaveBeenCalledWith({ message: 'Customer updated.' });
    });

    it('should return "Unauthorized" if user is not admin or email does not match', async () => {
        const req = { user: { isAdmin: false, email: 'user@example.com' }, body: { email: 'customer@example.com', newUser: { name: 'Updated Customer' } } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await updateCustomer(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(Customer.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('should return "Customer not found" if customer is not found', async () => {
        const req = { user: { isAdmin: true, email: 'admin@example.com' }, body: { email: 'nonexistent@example.com', newUser: { name: 'Updated Customer' } } };
        Customer.findOneAndUpdate.mockResolvedValue(null);

        const res = { send: jest.fn() };

        await updateCustomer(req, res);

        expect(Customer.findOneAndUpdate).toHaveBeenCalledWith({ email: req.body.email }, req.body.newUser);
        expect(res.send).toHaveBeenCalledWith({ message: 'Customer not found.' });
    });
});

describe('getAllCustomers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all customers if user is admin', async () => {
        const req = { user: { isAdmin: true } };
        const customers = [{ name: 'Customer 1' }, { name: 'Customer 2' }];
        Customer.find.mockResolvedValue(customers);

        const res = { send: jest.fn() };

        await getAllCustomers(req, res);

        expect(Customer.find).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ data: customers });
    });

    it('should return "Unauthorized" if user is not admin', async () => {
        const req = { user: { isAdmin: false } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await getAllCustomers(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(Customer.find).not.toHaveBeenCalled();
    });
});

describe('createCustomer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new customer if email is not in use', async () => {
        const req = { body: { name: 'New Customer', email: 'newcustomer@example.com', password: 'password', phoneNumber: '1234567890', address: '123 Street' } };
        Customer.findOne.mockResolvedValue(null);

        const res = { send: jest.fn() };

        await createCustomer(req, res);

        expect(Customer.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(Customer.create).toHaveBeenCalledWith(req.body);
        expect(res.send).toHaveBeenCalledWith({ message: 'Signup successful' });
    });

    it('should return "Email already in use" if email is already registered', async () => {
        const req = { body: { name: 'Existing Customer', email: 'existingcustomer@example.com', password: 'password', phoneNumber: '1234567890', address: '456 Street' } };
        Customer.findOne.mockResolvedValue({ email: 'existingcustomer@example.com' });

        const res = { send: jest.fn() };

        await createCustomer(req, res);

        expect(Customer.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(Customer.create).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: 'Email already in use.' });
    });

    it('should return "Error creating customer" if an error occurs during creation', async () => {
        const req = { body: { name: 'New Customer', email: 'newcustomer@example.com', password: 'password', phoneNumber: '1234567890', address: '123 Street' } };
        Customer.findOne.mockRejectedValue(new Error('Database error'));

        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await createCustomer(req, res);

        expect(Customer.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(Customer.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: 'Error creating customer.' });
    });
});
