import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Users, Package, Loader2 } from 'lucide-react';
import { fetchProducts, fetchUsers } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'products') {
          const data = await fetchProducts();
          setProducts(data);
        } else {
          const data = await fetchUsers();
          setUsers(data);
        }
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeTab]);

  const filteredData = activeTab === 'products' 
    ? products.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    : users.filter(u => u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

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
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary add-new-btn">
            <Plus size={18} /> Add {activeTab === 'products' ? 'Product' : 'User'}
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">
            <Loader2 className="animate-spin" size={40} />
            <p>Loading {activeTab}...</p>
          </div>
        ) : activeTab === 'products' ? (
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
                {filteredData.map(product => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>{product.nombre}</td>
                    <td>{product.categorias?.nombre || 'General'}</td>
                    <td>${product.precio}</td>
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
                {filteredData.map(user => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td><span className={`role-badge ${(user.roles?.nombre || 'user').toLowerCase()}`}>{user.roles?.nombre || 'User'}</span></td>
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
