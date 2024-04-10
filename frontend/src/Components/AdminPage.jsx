import React from "react";
import UserCRUD from "./UserCRUD";
import ProductCRUD from "./ProductCRUD";
import ProductsTable from "./ProductsTable";
import { Link } from "react-router-dom";


const AdminPage = () => {
    return (
        <div className="bg-dark vh-min-100 py-4">
            <div className="container">
            <h1 className="text-center text-white">CyberHaven - Admin</h1>
            
                <div  className="d-flex align-items-center justify-content-between mb-3">
                   
                     <h4 className="text-white">Products</h4>
                     <Link className="btn btn-info" to={'/admin/create-product'}>New Product</Link>

                </div>

                <ProductsTable />
        </div>
        </div>
    );
};

export default AdminPage;
