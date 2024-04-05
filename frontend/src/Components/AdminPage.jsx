import React from "react";
import UserCRUD from "./UserCRUD";
import ProductCRUD from "./ProductCRUD";
import ProductsTable from "./ProductsTable";
import "./AdminPage.css"; // Create AdminPage.css file for custom styling

const AdminPage = () => {
    return (
        <div className="container-fluid admin-page">
            <h1 className="mb-4 text-center">CyberHaven - Admin</h1>
            <div className="row item">
                <h4>Products</h4>
                <ProductsTable />
            </div>
        </div>
    );
};

export default AdminPage;
