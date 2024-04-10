import React, { useState, useEffect } from 'react';
import { getUserData } from '../store'; 
import ProductCard from '../Components/ProductCard';
import Alert from '../Components/Alert';



export default function SearchPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const user = getUserData();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const result = await fetch("http://localhost:3001/product/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await result.json();
            setProducts(response.data);
            setFilteredProducts(response.data); // Initially set filteredProducts to all products
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const result = await fetch("http://localhost:3001/cart/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ productId: productId }),
            });
            const response = await result.json();
            if (response.message === "Cart Updated.") {
                // Show alert when product is added to cart
                setShowAlert(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Filter products based on search query
    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="container">

            {showAlert && <Alert message={"Product Added to Cart."} />}
            {user.isAuthenticated && <Alert message={`Hello, ${user.name}`} />}

            {/* Search input */}
            <h3 className='mb-2'>Search Products</h3>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* All Products */}
            <section className="mb-4">
                <h4 className='mb-4'>{ searchQuery ? `Search Results for "${ searchQuery }"` : 'All Products' }</h4>
                <div className="row">
                    {filteredProducts.length === 0 ? (
                        <p className="text-muted">No products available.</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <div className="col-md-6 col-lg-4" key={product._id}>
                                <ProductCard
                                    onAddToCart={handleAddToCart}
                                    product={product}
                                />
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
