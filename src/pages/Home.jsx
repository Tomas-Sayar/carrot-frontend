import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      // We take the first 4 products as "Most Gifted"
      setFeaturedProducts(data.slice(0, 4));
      setLoading(false);
    };
    loadFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content">
          <h1>Plants Made Easy</h1>
          <p>Bring the beauty of nature into your home with our curated collection of healthy, nursery-fresh plants.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">Shop All Plants</Link>
            <Link to="/shop" className="btn btn-outline">Find Your Match</Link>
          </div>
        </div>
      </section>

      <section className="categories-grid container section-padding">
        <h2 className="section-title">Shop by Category</h2>
        <div className="grid grid-3">
          <div className="category-card">
            <div className="category-img bg-leafy"></div>
            <h3>Pet-Friendly</h3>
          </div>
          <div className="category-card">
            <div className="category-img bg-easy"></div>
            <h3>Low-Maintenance</h3>
          </div>
          <div className="category-card">
            <div className="category-img bg-large"></div>
            <h3>Large Plants</h3>
          </div>
        </div>
      </section>

      <section className="featured-products container section-padding">
        <div className="section-header">
          <h2 className="section-title">Most Gifted</h2>
          <Link to="/shop" className="view-all">Shop All</Link>
        </div>
        <div className="grid grid-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => <div key={i} className="skeleton-card"></div>)
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      <section className="benefits">
        <div className="container grid grid-3">
          <div className="benefit-item">
            <h3>Direct from Greenhouse</h3>
            <p>Our plants are shipped directly from our greenhouse to your door.</p>
          </div>
          <div className="benefit-item">
            <h3>Expert Support</h3>
            <p>Access to our plant doctors for lifetime care advice.</p>
          </div>
          <div className="benefit-item">
            <h3>Guaranteed Delivery</h3>
            <p>If your plant arrives unhappy, we'll replace it for free.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
