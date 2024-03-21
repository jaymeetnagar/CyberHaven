import Cart from '../models/Cart.js';

// API to get the cart of the user
const getCart = async (req, res) => {
    try {
        if (req.user.id != req.params.userId) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
       
        if (!cart) {
            return res.send({ message: 'Cart not found.' });
        }
        res.send({ data: cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching cart.' });
    }
}

// API to add a product to the cart
const addToCart = async (req, res) => {

    
    try {
        
        if (req.user.id != req.body.user_id) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        
        const { user_id, product_id, quantity = 1 } = req.body;
        const cart = await Cart.findOne({ userId: user_id });
        if (!cart) {
            await Cart.create({
                userId: user_id,
                items: [{ productId: product_id, quantity }]
            })
            res.send({ message: 'Product added to the Cart.' });
        }
        else {
            const item = cart.items.find(item => item.productId === product_id);
            if (item) {
                item.quantity += quantity;
            } else {
                cart.items.push({ productId: product_id, quantity });
            }
            await cart.save();
            res.send({ message: 'Product added to the Cart.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding to cart.' });
    }
}

// API to remove a product from the cart
const removeFromCart = async (req, res) => {
    try {
        if (req.user.id != req.body.user_id) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const { user_id, product_id, quantity = 1 } = req.body;
        const cart = await Cart.findOne({ userId: user_id });
        if (!cart) {
            return res.send({ message: 'Cart not found.' });
        }
        const item = cart.items.find(item => item.productId === product_id);
        if (!item) {
            return res.send({ message: 'Product not found in cart.' });
        }
        if (item.quantity > quantity) {
            item.quantity -= quantity;
        } else {
            cart.items = cart.items.filter(item => item.productId !== product_id);
        }
        await cart.save();
        res.send({ message: 'Product removed from the Cart.' });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error removing from cart.' });
    }
}

export { getCart, addToCart, removeFromCart };