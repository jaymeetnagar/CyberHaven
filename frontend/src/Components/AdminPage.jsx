import React from "react";
import UserCRUD from "./UserCRUD";
import ProductCRUD from "./ProductCRUD";
import ProductsTable from "./ProductsTable";
import "./AdminPage.css"; // Create AdminPage.css file for custom styling

const AdminPage = () => {
    return (
        <div className="container-fluid admin-page">
            <h1 className="mb-4 text-center">CyberHaven - Admin</h1>
            <h4>Products</h4>
            <div className="row">
                <ProductsTable />
                {/* User CRUD operations component
                <div className="col-md-6">
                    <UserCRUD />
                </div>
                <div className="col-md-6">
                    <ProductCRUD />
                </div> */}
            </div>
        </div>
    );
};

export default AdminPage;
