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
/**
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.productId
**/
const getProduct = async (req, res) => {
    const productId = req.params.productId;
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
/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {Object} req.body.newProduct
 * @param {string} req.body.newProduct._id
 * @param {string} [req.body.newProduct.title]
 * @param {string} [req.body.newProduct.description]
 * @param {string} [req.body.newProduct.price]
 * @param {string} [req.body.newProduct.imageURL]
 * @param {string} [req.body.newProduct.type]
 * @param {string} [req.body.newProduct.category]
 * @param {string} [req.body.newProduct.deal]
 * @param {string} [req.body.newProduct.dealPrice]
 **/
const updateProduct = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const { newProduct } = req.body;
    const {productId, ...newProductData} = newProduct;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, newProductData, { new: true }).exec();
        res.send({ data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating product.' });
    }
}

// API to add a new product
/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {Object} req.body.newProduct
 * @param {string} req.body.newProduct.title
 * @param {string} req.body.newProduct.description
 * @param {string} req.body.newProduct.price
 * @param {string} req.body.newProduct.imageURL
 * @param {string} [req.body.newProduct.type]
 * @param {string} [req.body.newProduct.category]
 * @param {string} [req.body.newProduct.deal]
 * @param {string} [req.body.newProduct.dealPrice]
 **/
const AddProduct = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const newProductData = req.body;
    try {
        const newProduct = new Product(newProductData);
        const savedProduct = await newProduct.save();
        res.status(200).send({ data: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding new product.' });
    }
}

// API to delete a product
/**
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.productId
 **/
const deleteProduct = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const productId = req.params.productId;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId).exec();
        res.send({ data: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting product.' });
    }
}

export { getAllProducts, getProduct, updateProduct, AddProduct, deleteProduct };