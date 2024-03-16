import Cart from '../models/Cart.js';

// API to get the cart of the user
const getCart = async (req, res) => {
    try {
        if (req.user.id != req.params.userId) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const cart = await Cart.findOne({ userId: req.params.userId });
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
const updateCart = async (req, res) => {
    try {
        if (req.user.id != req.body.user_id) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const { user_id, product_id, quantity = 1 } = req.body;
        const cart = await Cart.findOne({ userId: user_id });
        if (!cart) {
            if (quantity < 0) {
                return res.status(400).send({ message: 'Cart not found.' });
            }
            await Cart.create({
                userId: user_id,
                items: {
                    [product_id]: quantity
                }
            });
            res.send({ message: 'Cart Updated.' });
        }
        else {
            const itemQuantity = cart.items.get(product_id);
            if (itemQuantity) {
                if (itemQuantity + quantity > 0) {
                    cart.items.set(product_id, itemQuantity + quantity);
                } else {
                    cart.items.delete(product_id);
                }
            } else {
                if (quantity > 0) {
                    cart.items.set(product_id, quantity);
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