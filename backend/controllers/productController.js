import Product from '../models/Product.js';

// API to get all products
const getAllProducts = async (req, res) => {
    try {
        const data = await Product.find().exec();
        res.send({ data: data });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching Products.' });
    }
}

// API to get a product by id
const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const data = await Product.findById(productId).exec();
        res.send({ data: data });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching Product' });
    }
}

// API to update a product
const updateProduct = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const productId = req.params.id;
    const updates = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true }).exec();
        res.send({ data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating product.' });
    }
}

// API to add a new product
const AddProduct = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const newProductData = req.body;

    try {
        const newProduct = new Product(newProductData);
        const savedProduct = await newProduct.save();
        res.status(201).send({ data: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding new product.' });
    }
}

// API to delete a product
const deleteProduct = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId).exec();
        res.send({ data: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting product.' });
    }
}

export { getAllProducts, getProduct, updateProduct, AddProduct, deleteProduct };