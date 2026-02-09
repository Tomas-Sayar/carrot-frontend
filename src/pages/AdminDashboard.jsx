import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Users, Package } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([
    { id: 1, name: 'Bamboo Palm', price: 199, stock: 15, category: 'Large Plants' },
    { id: 2, name: 'ZZ Plant', price: 139, stock: 24, category: 'Low Maintenance' },
    { id: 3, name: 'Monstera Deliciosa', price: 99, stock: 8, category: 'Leafy' }
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@leafy.com', role: 'Admin' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User' }
  ]);

  return (
    <div className="admin-dashboard container section-padding">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} /> Products
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} /> Users
          </button>
        </div>
      </header>

      <main className="admin-content-area">
        <div className="admin-actions-bar">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder={`Search ${activeTab}...`} />
          </div>
          <button className="btn btn-primary add-new-btn">
            <Plus size={18} /> Add {activeTab === 'products' ? 'Product' : 'User'}
          </button>
        </div>

        {activeTab === 'products' ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td className="actions-cell">
                      <button className="edit-btn"><Edit2 size={16} /></button>
                      <button className="delete-btn"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                    <td className="actions-cell">
                      <button className="edit-btn"><Edit2 size={16} /></button>
                      <button className="delete-btn"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
