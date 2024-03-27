import Cart from '../models/Cart.js';

// API to get the cart of the user
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.send({ message: 'Cart not found.' });
        }
        res.send({ data: cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching cart.' });
    }
}

// API to update quantity of product in the cart
// quantity is the number that is added to or removed from the cart
/**
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.productId
 * @param {number} req.body.quantity
**/
const updateCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const user_id = req.user.id;
        const cart = await Cart.findOne({ userId: user_id });
        if (!cart) {
            if (quantity < 0) {
                return res.status(400).send({ message: 'Cart not found.' });
            }
            await Cart.create({
                userId: user_id,
                items: {
                    [productId]: quantity
                }
            });
            res.send({ message: 'Cart Updated.' });
        }
        else {
            const itemQuantity = cart.items.get(productId);
            if (itemQuantity) {
                if (itemQuantity + quantity > 0) {
                    cart.items.set(productId, itemQuantity + quantity);
                } else {
                    cart.items.delete(productId);
                }
            } else {
                if (quantity > 0) {
                    cart.items.set(productId, quantity);
                }
            }
            await cart.save();
            res.send({ message: 'Cart Updated.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding to cart.' });
    }
}

export { getCart, updateCart };