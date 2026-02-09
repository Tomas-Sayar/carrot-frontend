import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Users, Package, Loader2, AlertTriangle, X as CloseIcon } from 'lucide-react';
import { 
  fetchProducts, 
  fetchUsers, 
  fetchCategories,
  createProduct, 
  updateProduct, 
  deleteProduct,
  createUser,
  updateUser,
  deleteUser,
  fetchBrands,
  fetchTypes
} from '../services/api';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import UserForm from '../components/UserForm';
import { ToastContainer } from '../components/Toast';
import './AdminDashboard.css';
import '../components/Skeleton.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'delete'
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsData, usersData, categoriesData, brandsData, typesData] = await Promise.all([
        fetchProducts(),
        fetchUsers(),
        fetchCategories(),
        fetchBrands(),
        fetchTypes()
      ]);
      setProducts(productsData || []);
      setUsers(usersData || []);
      setCategories(categoriesData || []);
      setBrands(brandsData || []);
      setTypes(typesData || []);
    } catch (err) {
      setError('Error loading data from database');
      addToast('Error al cargar los datos', 'error');
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Modal handlers
  const openCreateModal = () => {
    setSelectedItem(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalMode('create');
  };

  // CRUD handlers for Products
  const handleProductSubmit = async (productData) => {
    setIsSubmitting(true);
    try {
      if (modalMode === 'edit' && selectedItem) {
        await updateProduct(selectedItem.id, productData);
      } else {
        await createProduct(productData);
      }
      await loadData();
      addToast(`Producto ${modalMode === 'edit' ? 'actualizado' : 'creado'} con éxito`);
      closeModal();
    } catch (err) {
      console.error('Error saving product:', err);
      addToast(`Error al guardar el producto: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductDelete = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      await deleteProduct(selectedItem.id);
      await loadData();
      addToast('Producto eliminado correctamente');
      closeModal();
    } catch (err) {
      console.error('Error deleting product:', err);
      addToast('Error al eliminar el producto', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // CRUD handlers for Users
  const handleUserSubmit = async (userData) => {
    setIsSubmitting(true);
    try {
      if (modalMode === 'edit' && selectedItem) {
        await updateUser(selectedItem.id, userData);
      } else {
        await createUser(userData);
      }
      await loadData();
      addToast(`Usuario ${modalMode === 'edit' ? 'actualizado' : 'creado'} con éxito`);
      closeModal();
    } catch (err) {
      console.error('Error saving user:', err);
      addToast('Error al guardar el usuario', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserDelete = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      await deleteUser(selectedItem.id);
      await loadData();
      addToast('Usuario eliminado correctamente');
      closeModal();
    } catch (err) {
      console.error('Error deleting user:', err);
      addToast('Error al eliminar el usuario', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get modal title
  const getModalTitle = () => {
    if (modalMode === 'delete') {
      return `Eliminar ${activeTab === 'products' ? 'Producto' : 'Usuario'}`;
    }
    if (modalMode === 'edit') {
      return `Editar ${activeTab === 'products' ? 'Producto' : 'Usuario'}`;
    }
    return `Nuevo ${activeTab === 'products' ? 'Producto' : 'Usuario'}`;
  };

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
              placeholder={`Search ${activeTab === 'products' ? 'products' : 'users'}...`} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <CloseIcon size={16} />
              </button>
            )}
          </div>
          <button className="btn btn-primary add-new-btn" onClick={openCreateModal}>
            <Plus size={18} /> Add {activeTab === 'products' ? 'Product' : 'User'}
          </button>
        </div>

        {error ? (
          <div className="error-state">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={loadData}>
              Retry
            </button>
          </div>
        ) : activeTab === 'products' ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={`skeleton-${i}`} className="skeleton-row">
                      <td><div className="skeleton skeleton-id"></div></td>
                      <td><div className="skeleton skeleton-cell"></div></td>
                      <td><div className="skeleton skeleton-text"></div></td>
                      <td><div className="skeleton skeleton-price"></div></td>
                      <td><div className="skeleton-actions"><div className="skeleton skeleton-btn"></div><div className="skeleton skeleton-btn"></div></div></td>
                    </tr>
                  ))
                ) : products.filter(p => 
                  (p.name || p.Name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (p.description || p.descripcion || '').toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 ? (
                  <tr><td colSpan="5" className="empty-state">
                    {searchTerm ? `No products matching "${searchTerm}"` : "No products found in database"}
                  </td></tr>
                ) : (
                  products
                    .filter(p => 
                      (p.name || p.Name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (p.description || p.descripcion || '').toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(product => (
                    <tr key={product.id}>
                      <td>#{product.id}</td>
                      <td>{product.name || product.Name || 'N/A'}</td>
                      <td className="description-cell">{product.description || product.descripcion || 'N/A'}</td>
                      <td>${product.price || product.Price || 0}</td>
                      <td className="actions-cell">
                        <button className="edit-btn" onClick={() => openEditModal(product)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="delete-btn" onClick={() => openDeleteModal(product)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={`skeleton-u-${i}`} className="skeleton-row">
                      <td><div className="skeleton skeleton-id"></div></td>
                      <td><div className="skeleton skeleton-cell"></div></td>
                      <td><div className="skeleton skeleton-cell"></div></td>
                      <td><div className="skeleton skeleton-price"></div></td>
                      <td><div className="skeleton-actions"><div className="skeleton skeleton-btn"></div><div className="skeleton skeleton-btn"></div></div></td>
                    </tr>
                  ))
                ) : users.filter(u => 
                  (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (u.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 ? (
                  <tr><td colSpan="5" className="empty-state">
                    {searchTerm ? `No users matching "${searchTerm}"` : "No users found in database"}
                  </td></tr>
                ) : (
                  users
                    .filter(u => 
                      (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (u.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(user => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.name || user.username || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td>
                        <span className={`role-badge ${user.typeOfUser_id === 1 ? 'admin' : 'user'}`}>
                          {user.typeOfUser_id === 1 ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="edit-btn" onClick={() => openEditModal(user)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="delete-btn" onClick={() => openDeleteModal(user)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal for Create/Edit/Delete */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={getModalTitle()}>
        {modalMode === 'delete' ? (
          <div className="delete-confirmation">
            <AlertTriangle size={48} color="#dc3545" />
            <p>
              ¿Estás seguro de que deseas eliminar{' '}
              <strong>
                {activeTab === 'products' 
                  ? selectedItem?.name 
                  : selectedItem?.name || selectedItem?.email}
              </strong>?
            </p>
            <p className="delete-warning">Esta acción no se puede deshacer.</p>
            <div className="form-actions">
              <button className="btn-cancel" onClick={closeModal} disabled={isSubmitting}>
                Cancelar
              </button>
              <button 
                className="btn-submit btn-danger" 
                onClick={activeTab === 'products' ? handleProductDelete : handleUserDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          <ProductForm
            product={selectedItem}
            categories={categories}
            brands={brands}
            types={types}
            onSubmit={handleProductSubmit}
            onCancel={closeModal}
            isLoading={isSubmitting}
          />
        ) : (
          <UserForm
            user={selectedItem}
            onSubmit={handleUserSubmit}
            onCancel={closeModal}
            isLoading={isSubmitting}
          />
        )}
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default AdminDashboard;
