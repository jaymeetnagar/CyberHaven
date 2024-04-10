import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { getUserData } from "../store";
import Alert from "../Components/Alert";

export default function HomePage() {
    const [products, setProducts] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
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
                
                // success
                setShowAlert(true);
                

            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // featured products by promotions data
    const featuredProducts = products.filter((product) =>
        product.type.includes("featured")
    );

    const productDeals = products.filter((product) =>
        product.type.includes("deal")
    );

    const trendingProducts = products.filter((product) =>
        product.type.includes("trending")
    );

    return (
        <div className="container">

               
            { showAlert && <Alert message={ "Product Added to Cart." } /> }


            {user.isAuthenticated && (
                <h3 className="mb-4">Hello {user.name}</h3>
            )}
            {/* Featured Products */}
            <section className="mb-4">
                <h4 className="mb-4">Featured Products</h4>
                <div className="row">
                    {featuredProducts.length == 0 ? (
                        <p className="text-muted">
                            No featured products available.
                        </p>
                    ) : (
                        featuredProducts.map((product) => (
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

            {/* Product Deals */}
            <section className="mb-4">
                <h4 className="mb-4">Product Deals</h4>

                <div className="row">
                    {productDeals.length == 0 ? (
                        <p className="text-muted">
                            No product deals available.
                        </p>
                    ) : (
                        productDeals.map((product) => (
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

            {/* All Products */}
            <section className="mb-4">
                <h4 className="mb-4">All Products</h4>

                <div className="row">
                    {products.length == 0 ? (
                        <p className="text-muted">No products available.</p>
                    ) : (
                        products.map((product) => (
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
