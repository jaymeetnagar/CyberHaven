import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("userData");
        if (user) {
            const _userId = JSON.parse(user).userId;
            setUserId(_userId);
            getCartItmes(_userId);
        }
    }, []);

    const getCartItmes = async (userId) => {
        const items = await fetchCartItemsByUserId(userId);
        //iterate over items object and fetch product details for each item
        const promises = Object.keys(items).map((key) => fetchProductByProductId(key));
        const products = await Promise.all(promises);
        products.forEach((product) => { product.quantity = items[product._id] });
        setCartItems(products);
    }

    const fetchCartItemsByUserId = async (userId) => {
        try {
            const result = await fetch("http://localhost:3001/cart/" + userId, {
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
        <div className="container cart-page">
            <h3>Cart</h3>
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
                    {!userId && (
                        <tr>
                            <td colSpan="6">Please login to view cart items</td>
                        </tr>
                    )}
                    {userId &&
                        cartItems.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <img
                                        src={item.imageURL}
                                        alt={item.name}
                                        style={{ width: "100px" }}
                                    />
                                </td>
                                <td>{item.title}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toFixed(2) * item.quantity}</td>
                                <td>
                                    <button className="btn btn-danger">
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartPage;
