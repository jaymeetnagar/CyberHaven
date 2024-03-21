import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);

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
      {/* Featured Products */}
      <section className="mb-4">
        <h5 className="mb-4">Featured Products</h5>

        <div className="row justify-content-start">
          {featuredProducts.length === 0 ? (
            <p className="text-muted">No featured products available.</p>
          ) : (
            featuredProducts.map((product) => (
              <div className="col product-col" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Product Deals */}
      <section className="mb-4">
        <h5 className="mb-4">Product Deals</h5>

        <div className="row justify-content-start">
          {productDeals.length === 0 ? (
            <p className="text-muted">No product deals available.</p>
          ) : (
            productDeals.map((product) => (
              <div className="col product-col" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* All Products */}
      <section className="mb-4">
        <h5 className="mb-4">All Products</h5>

        <div className="row justify-content-start">
          {products.length === 0 ? (
            <p className="text-muted">No products available.</p>
          ) : (
            products.map((product) => (
              <div className="col product-col" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
