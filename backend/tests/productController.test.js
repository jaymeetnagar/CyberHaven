import { getAllProducts, getProduct, updateProduct, AddProduct, deleteProduct } from '../controllers/productController';
import Product from '../models/Product';

jest.mock('../models/Product', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
}));

describe('getAllProducts', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all products', async () => {
        const products = [{ name: 'Product 1' }, { name: 'Product 2' }];
        Product.find.mockResolvedValue(products);
        const res = { send: jest.fn() };

        await getAllProducts({}, res);

        expect(Product.find).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ data: products });
    });

    it('should handle errors when fetching products', async () => {
        Product.find.mockRejectedValue(new Error('Database error'));
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await getAllProducts({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: 'Error fetching Products.' });
    });
});

describe('getProduct', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return product by id', async () => {
        const productId = 'productId';
        const product = { name: 'Product 1' };
        Product.findById.mockResolvedValue(product);
        const req = { params: { id: productId } };
        const res = { send: jest.fn() };

        await getProduct(req, res);

        expect(Product.findById).toHaveBeenCalledWith(productId);
        expect(res.send).toHaveBeenCalledWith({ data: product });
    });

    it('should handle errors when fetching product by id', async () => {
        const productId = 'productId';
        Product.findById.mockRejectedValue(new Error('Database error'));
        const req = { params: { id: productId } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await getProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: 'Error fetching Product' });
    });
});

describe('updateProduct', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update product by id', async () => {
        const productId = 'productId';
        const updates = { name: 'Updated Product' };
        const updatedProduct = { _id: productId, ...updates };
        Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);
        const req = { user: { isAdmin: true }, params: { id: productId }, body: updates };
        const res = { send: jest.fn() };

        await updateProduct(req, res);

        expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(productId, updates, { new: true });
        expect(res.send).toHaveBeenCalledWith({ data: updatedProduct });
    });

    it('should handle unauthorized access', async () => {
        const productId = 'productId';
        const updates = { name: 'Updated Product' };
        const req = { user: { isAdmin: false }, params: { id: productId }, body: updates };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await updateProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(Product.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('should handle errors when updating product', async () => {
        const productId = 'productId';
        const updates = { name: 'Updated Product' };
        Product.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));
        const req = { user: { isAdmin: true }, params: { id: productId }, body: updates };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await updateProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: 'Error updating product.' });
    });
});

describe('AddProduct', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a new product if user is admin', async () => {
        const newProductData = { name: 'New Product', price: 10.99 };
        const savedProduct = { _id: 'newProductId', ...newProductData };
        const req = { user: { isAdmin: true }, body: newProductData };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        Product.prototype.save.mockResolvedValue(savedProduct);

        await AddProduct(req, res);

        expect(Product.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ data: savedProduct });
    });

    it('should handle unauthorized access', async () => {
        const newProductData = { name: 'New Product', price: 10.99 };
        const req = { user: { isAdmin: false }, body: newProductData };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await AddProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(Product.prototype.save).not.toHaveBeenCalled();
    });

    it('should handle errors when adding new product', async () => {
        const newProductData = { name: 'New Product', price: 10.99 };
        const error = new Error('Database error');
        const req = { user: { isAdmin: true }, body: newProductData };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        Product.prototype.save.mockRejectedValue(error);

        await AddProduct(req, res);

        expect(Product.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: 'Error adding new product.' });
    });
});

describe('deleteProduct', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete product by id if user is admin', async () => {
        const productId = 'productId';
        const deletedProduct = { _id: productId, name: 'Deleted Product' };
        const req = { user: { isAdmin: true }, params: { id: productId } };
        const res = { send: jest.fn() };
        Product.findByIdAndDelete.mockResolvedValue(deletedProduct);

        await deleteProduct(req, res);

        expect(Product.findByIdAndDelete).toHaveBeenCalledWith(productId);
        expect(res.send).toHaveBeenCalledWith({ data: deletedProduct });
    });

    it('should handle unauthorized access', async () => {
        const productId = 'productId';
        const req = { user: { isAdmin: false }, params: { id: productId } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(Product.findByIdAndDelete).not.toHaveBeenCalled();
    });

    it('should handle errors when deleting product', async () => {
        const productId = 'productId';
        const error = new Error('Database error');
        const req = { user: { isAdmin: true }, params: { id: productId } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        Product.findByIdAndDelete.mockRejectedValue(error);

        await deleteProduct(req, res);

        expect(Product.findByIdAndDelete).toHaveBeenCalledWith(productId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ message: 'Error deleting product.' });
    });
});