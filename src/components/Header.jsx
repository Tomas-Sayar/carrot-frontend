import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
            <li><a href="/shop">Plants</a></li>
            <li><a href="/shop">Care Tools</a></li>
            <li><a href="/shop">Gifts</a></li>
          </ul>
        </nav>

        <div className="logo-container">
          <a href="/" className="logo">CARROT</a>
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
          
          <a href="/profile" className="action-btn desktop-only"><User size={20} /></a>
          <a href="/cart" className="action-btn cart-btn">
            <ShoppingCart size={20} />
            <span className="cart-count">0</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
