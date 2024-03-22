const { getCart, updateCart } = require('../controllers/cartController');
const Cart = require('../models/Cart');

jest.mock('../models/Cart', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
}));

describe('getCart', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return the user\'s cart if it exists', async () => {
        // Mocking user ID in request object
        const req = { user: { id: 'userId' } };

        // Mocking cart data
        const cartData = { userId: 'userId', items: { 'productId': 2 } };
        Cart.findOne.mockResolvedValue(cartData);

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await getCart(req, res);

        // Assert expected behavior
        expect(Cart.findOne).toHaveBeenCalledWith({ userId: req.user.id });
        expect(res.send).toHaveBeenCalledWith({ data: cartData });
    });

    it('should return a message if the user\'s cart does not exist', async () => {
        // Mocking user ID in request object
        const req = { user: { id: 'userId' } };

        // Mocking cart not found scenario
        Cart.findOne.mockResolvedValue(null);

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await getCart(req, res);

        // Assert expected behavior
        expect(Cart.findOne).toHaveBeenCalledWith({ userId: req.user.id });
        expect(res.send).toHaveBeenCalledWith({ message: 'Cart not found.' });
    });

    it('should handle errors and return a 500 status with an error message', async () => {
        // Mocking user ID in request object
        const req = { user: { id: 'userId' } };

        // Mocking error scenario
        const errorMessage = 'Error fetching cart.';
        Cart.findOne.mockRejectedValue(new Error(errorMessage));

        // Mock response object
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        // Call the controller function
        await getCart(req, res);

        // Assert expected behavior
        expect(Cart.findOne).toHaveBeenCalledWith({ userId: req.user.id });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
    });
});


describe('updateCart', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create a new cart and add the product if the user does not have a cart', async () => {
        // Mocking request and cart data
        const req = { body: { user_id: 'userId', product_id: 'productId', quantity: 2 }, user: { id: 'userId' } };
        Cart.findOne.mockResolvedValue(null);
        Cart.create.mockResolvedValue();

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await updateCart(req, res);

        // Assert expected behavior
        expect(Cart.findOne).toHaveBeenCalledWith({ userId: req.body.user_id });
        expect(Cart.create).toHaveBeenCalledWith({
            userId: req.body.user_id,
            items: { [req.body.product_id]: req.body.quantity }
        });
        expect(res.send).toHaveBeenCalledWith({ message: 'Cart Updated.' });
    });

    it('should update the quantity of the product in the existing cart if the product is already in the cart', async () => {
        // Mocking request and existing cart data
        const req = { body: { user_id: 'userId', product_id: 'productId', quantity: 3 }, user: { id: 'userId' } };
        const existingCart = { userId: 'userId', items: new Map([['productId', 2]]) };
        Cart.findOne.mockResolvedValue(existingCart);
        existingCart.save = jest.fn().mockResolvedValue();

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await updateCart(req, res);

        // Assert expected behavior
        expect(Cart.findOne).toHaveBeenCalledWith({ userId: req.body.user_id });
        expect(existingCart.items.get(req.body.product_id)).toBe(5); // 2 + 3
        expect(existingCart.save).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: 'Cart Updated.' });
    });

    it('should remove the product from the cart if the updated quantity is 0 or negative', async () => {
        // Mocking request and existing cart data
        const req = { body: { user_id: 'userId', product_id: 'productId', quantity: -2 }, user: { id: 'userId' } };
        const existingCart = { userId: 'userId', items: new Map([['productId', 2]]) };
        Cart.findOne.mockResolvedValue(existingCart);
        existingCart.save = jest.fn().mockResolvedValue();

        // Mock response object
        const res = { send: jest.fn() };

        // Call the controller function
        await updateCart(req, res);

        // Assert expected behavior
        expect(Cart.findOne).toHaveBeenCalledWith({ userId: req.body.user_id });
        expect(existingCart.items.has(req.body.product_id)).toBe(false); // Product should be removed from the cart
        expect(existingCart.save).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: 'Cart Updated.' });
    });

    it('should return a 401 status if the user ID in the request does not match the authenticated user ID', async () => {
        // Mocking request with different user ID
        const req = { body: { user_id: 'differentUserId', product_id: 'productId', quantity: 1 }, user: { id: 'userId' } };

        // Mock response object
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        // Call the controller function
        await updateCart(req, res);

        // Assert expected behavior
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });
});
