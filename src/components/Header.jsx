import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="main-header">
      <div className="top-bar">
        Free shipping on orders over $150
      </div>
      <div className="container header-content">
        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>
        
        <nav className="main-nav">
          <ul className="nav-list">
            <li><Link to="/shop">Plants</Link></li>
            <li><Link to="/shop">Care Tools</Link></li>
            <li><Link to="/shop">Gifts</Link></li>
            {user?.roles?.nombre === 'Admin' && (
              <li><Link to="/admin" className="admin-link">Admin Dashboard</Link></li>
            )}
          </ul>
        </nav>

        <div className="logo-container">
          <Link to="/" className="logo">CARROT</Link>
        </div>

        <div className="header-actions">
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <form onSubmit={handleSearch} className="search-form">
              <input 
                type="text" 
                placeholder="Search plants..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isSearchOpen}
              />
              <button type="submit" className="search-submit"><Search size={18} /></button>
              <button type="button" className="search-close" onClick={() => setIsSearchOpen(false)}><X size={18} /></button>
            </form>
            <button className="action-btn desktop-only" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
            </button>
          </div>
          
          {isAuthenticated ? (
            <div className="user-menu-header">
              <Link to="/profile" className="action-btn desktop-only"><User size={20} /></Link>
              <button onClick={logout} className="action-btn logout-btn desktop-only" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="action-btn desktop-only"><User size={20} /></Link>
          )}

          <Link to="/cart" className="action-btn cart-btn">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
