import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getUserData } from "../store.js";
import './CartPage.css'; // Import CartPage.css for styling

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const user = getUserData();

    useEffect(() => {
        if (user.isAuthenticated) {
            getCartItmes();
        }
    }, []);

    const getCartItmes = async () => {
        const items = await fetchCartItems();
        const promises = Object.keys(items).map((key) => fetchProductByProductId(key));
        const products = await Promise.all(promises);
        products.forEach((product) => { product.quantity = items[product._id] });
        setCartItems(products);
    }

    const handleDelete = async (productId, cartQuantity) => {
        try {
            const result = await fetch("http://localhost:3001/cart/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ product_id: productId, quantity: -cartQuantity })
            });
            const response = await result.json();
            if (response.message === "Cart Updated.") {
                await getCartItmes();
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchCartItems = async () => {
        try {
            const result = await fetch("http://localhost:3001/cart/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await result.json();
            return response.data.items;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchProductByProductId = async (productId) => {
        try {
            const result = await fetch("http://localhost:3001/product/" + productId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await result.json();
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="container">
            <h3>Cart</h3>
            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!user.isAuthenticated && (
                            <tr>
                                <td colSpan="6">Please login to view cart items</td>
                            </tr>
                        )}
                        {user.isAuthenticated &&
                            cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <img
                                            src={item.imageURL}
                                            alt={item.name}
                                            className="cart-product-image"
                                        />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id, item.quantity)} className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartPage;
