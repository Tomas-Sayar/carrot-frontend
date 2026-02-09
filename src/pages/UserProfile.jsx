import React from 'react';
import { User, Package, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-page container section-padding">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="user-info-brief">
            <div className="user-avatar">
              <User size={40} />
            </div>
            <h3>{user.nombre}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.roles?.nombre || 'User'}</p>
          </div>
          
          <nav className="profile-nav">
            <button className="nav-item active"><Package size={18} /> Orders</button>
            <button className="nav-item"><Settings size={18} /> Account Settings</button>
            <button className="nav-item logout" onClick={logout}><LogOut size={18} /> Log Out</button>
          </nav>
        </aside>

        <main className="profile-content">
          <section className="profile-section">
            <h2>Order History</h2>
            <p>You haven't placed any orders yet.</p>
          </section>

          <section className="profile-section">
            <h2>Account Details</h2>
            <div className="details-grid">
              <div className="detail-field">
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
              <div className="detail-field">
                <label>Full Name</label>
                <p>{user.nombre}</p>
              </div>
            </div>
            <button className="btn btn-outline">Edit Profile</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
