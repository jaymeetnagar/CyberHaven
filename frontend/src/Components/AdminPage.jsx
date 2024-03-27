import React from 'react';
import UserCRUD from './UserCRUD';
import ProductCRUD from './ProductCRUD';
import './AdminPage.css'; // Create AdminPage.css file for custom styling

const AdminPage = () => {
  return (
    <div className="container-fluid admin-page">
      <h1 className="mb-4 text-center">CyberHaven</h1>
      <div className="row">
        {/* User CRUD operations component */}
        <div className="col-md-6">
          <UserCRUD />
        </div>

        {/* Product CRUD operations component */}
        <div className="col-md-6">
          <ProductCRUD />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
