import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import './ProductList.css';

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (initialSearch && products.length > 0) {
      setFilteredProducts(products.filter(p => 
        p.name.toLowerCase().includes(initialSearch.toLowerCase()) ||
        (p.categories?.name && p.categories.name.toLowerCase().includes(initialSearch.toLowerCase()))
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [initialSearch, products]);

  return (
    <div className="product-list-page container section-padding">
      <header className="page-header">
        <h1>{initialSearch ? `Results for "${initialSearch}"` : 'Shop All Plants'}</h1>
        <div className="filter-summary">
          <span>{filteredProducts.length} Products</span>
          <select className="sort-dropdown">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </header>

      <div className="shop-layout">
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3>Size</h3>
            <ul>
              <li><label><input type="checkbox" /> Small</label></li>
              <li><label><input type="checkbox" /> Medium</label></li>
              <li><label><input type="checkbox" /> Large</label></li>
              <li><label><input type="checkbox" /> Extra Large</label></li>
            </ul>
          </div>
          <div className="filter-group">
            <h3>Care Level</h3>
            <ul>
              <li><label><input type="checkbox" /> Low Maintenance</label></li>
              <li><label><input type="checkbox" /> Moderate Care</label></li>
              <li><label><input type="checkbox" /> Plant Pro</label></li>
            </ul>
          </div>
          <div className="filter-group">
            <h3>Light</h3>
            <ul>
              <li><label><input type="checkbox" /> Low Light</label></li>
              <li><label><input type="checkbox" /> Bright Light</label></li>
            </ul>
          </div>
        </aside>

        <main className="products-grid grid grid-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-results">
              <p>No products found matching your search.</p>
              <button onClick={() => window.location.href = '/shop'} className="btn btn-outline">Clear All</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
