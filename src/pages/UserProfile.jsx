import React from 'react';
import { User, Package, Settings, LogOut } from 'lucide-react';
import './UserProfile.css';

const UserProfile = () => {
  // Mock user data
  const user = {
    name: 'Tommy Carrot',
    email: 'tommy@example.com',
    memberSince: 'February 2024',
    orders: [
      { id: '1001', date: 'Feb 5, 2024', total: 199, status: 'Delivered' },
      { id: '1002', date: 'Jan 12, 2024', total: 89, status: 'Shipped' }
    ]
  };

  return (
    <div className="profile-page container section-padding">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="user-info-brief">
            <div className="user-avatar">
              <User size={40} />
            </div>
            <h3>{user.name}</h3>
            <p>Member since {user.memberSince}</p>
          </div>
          
          <nav className="profile-nav">
            <button className="nav-item active"><Package size={18} /> Orders</button>
            <button className="nav-item"><Settings size={18} /> Account Settings</button>
            <button className="nav-item logout"><LogOut size={18} /> Log Out</button>
          </nav>
        </aside>

        <main className="profile-content">
          <section className="profile-section">
            <h2>Order History</h2>
            {user.orders.length > 0 ? (
              <div className="orders-list">
                <div className="order-header">
                  <span>Order #</span>
                  <span>Date</span>
                  <span>Total</span>
                  <span>Status</span>
                </div>
                {user.orders.map(order => (
                  <div key={order.id} className="order-row">
                    <td>#{order.id}</td>
                    <td>{order.date}</td>
                    <td>${order.total}</td>
                    <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven't placed any orders yet.</p>
            )}
          </section>

          <section className="profile-section">
            <h2>Account Details</h2>
            <div className="details-grid">
              <div className="detail-field">
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
              <div className="detail-field">
                <label>Default Shipping</label>
                <p>Tommy Carrot<br />123 Greenhouse Lane<br />Flora City, 54321</p>
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
