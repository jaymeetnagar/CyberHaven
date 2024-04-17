const stripe = require('stripe');
const stripeApiKey = process.env.STRIPE_SECRET_KEY;
const checkoutmethod = async (req, res) => {
    const { products } = req.body;
    const lineItems = products.map((product) => ({
        price_data:{
            currency: 'cad',
            product_data: {
                name: product.title,
                images: [product.imageURL]
            },
            unit_amount: product.price * 100
        },
        quantity: product.quantity
    }));
    console.log(stripeApiKey);
    const stripeClient = stripe("use your stripe secret key here");
    const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/cart',
    })
    res.json({ id: session.id });
}


module.exports = { checkoutmethod };