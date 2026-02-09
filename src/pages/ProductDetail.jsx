import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Truck, ShieldCheck, Droplets, Sun, Thermometer, Loader2 } from 'lucide-react';
import { fetchProductById, getImageUrl } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedPot, setSelectedPot] = useState('Stone');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-loading container section-padding">
        <Loader2 className="animate-spin" size={40} />
        <p>Loading plant details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error container section-padding">
        <h2>Plant not found</h2>
        <p>We couldn't find the plant you're looking for.</p>
        <a href="/shop" className="btn btn-primary">Back to Shop</a>
      </div>
    );
  }

  // Derived data
  const pots = ['Stone', 'Clay', 'Charcoal', 'Slate', 'Indigo'];
  const care = [
    { icon: <Sun size={20} />, title: 'Light', detail: product.luz || 'Prefers bright, indirect light.' },
    { icon: <Droplets size={20} />, title: 'Water', detail: product.riego || 'Water when soil is dry.' },
    { icon: <Thermometer size={20} />, title: 'Temp', detail: 'Prefers temperatures between 65°F and 80°F.' }
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-detail-page container section-padding">
      <div className="product-main-grid">
        <div className="product-gallery">
          <img src={getImageUrl(product.imagen)} alt={product.nombre} className="main-image" />
        </div>

        <div className="product-info-sidebar">
          <span className="category-label">{product.categorias?.nombre || 'General'}</span>
          <h1 className="product-title">{product.nombre}</h1>
          <div className="product-price-large">${product.precio}</div>
          
          <p className="product-description">{product.descripcion}</p>

          <div className="variant-selector">
            <h3>Choose your pot color: <span>{selectedPot}</span></h3>
            <div className="pot-options">
              {pots.map(pot => (
                <button 
                  key={pot} 
                  className={`pot-btn ${selectedPot === pot ? 'active' : ''}`}
                  onClick={() => setSelectedPot(pot)}
                  title={pot}
                >
                  <div className={`pot-swatch swatch-${pot.toLowerCase()}`}></div>
                </button>
              ))}
            </div>
          </div>

          <div className="purchase-actions">
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="wishlist-btn"><Heart size={20} /></button>
          </div>

          <div className="trust-badges">
            <div className="badge"><Truck size={18} /> <span>Free Shipping</span></div>
            <div className="badge"><ShieldCheck size={18} /> <span>30-Day Guarantee</span></div>
          </div>

          <div className="care-instructions">
            <h3>Plant Care</h3>
            <div className="care-grid">
              {care.map((item, idx) => (
                <div key={idx} className="care-item">
                  <div className="care-icon">{item.icon}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
