import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Truck, ShieldCheck, Droplets, Sun, Thermometer } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedPot, setSelectedPot] = useState('Stone');

  // Mock product data
  const product = {
    id: 1,
    name: 'Bamboo Palm',
    price: 199,
    category: 'Large Plants',
    description: 'The Bamboo Palm is a beautiful, easy-to-care-for plant that adds a touch of the tropics to any space. It is known for its air-purifying qualities and graceful, arching fronds.',
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    pots: ['Stone', 'Clay', 'Charcoal', 'Slate', 'Indigo'],
    care: [
      { icon: <Sun size={20} />, title: 'Light', detail: 'Prefers bright, indirect light but can tolerate low light.' },
      { icon: <Droplets size={20} />, title: 'Water', detail: 'Water when the top inch of soil is dry. Avoid overwatering.' },
      { icon: <Thermometer size={20} />, title: 'Temp', detail: 'Prefers temperatures between 65°F and 80°F.' }
    ]
  };

  return (
    <div className="product-detail-page container section-padding">
      <div className="product-main-grid">
        <div className="product-gallery">
          <img src={product.imageUrl} alt={product.name} className="main-image" />
          <div className="thumbnail-list">
            <div className="thumb active"><img src={product.imageUrl} alt="Thumb 1" /></div>
            <div className="thumb"><img src={product.imageUrl} alt="Thumb 2" /></div>
            <div className="thumb"><img src={product.imageUrl} alt="Thumb 3" /></div>
          </div>
        </div>

        <div className="product-info-sidebar">
          <span className="category-label">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price-large">${product.price}</div>
          
          <p className="product-description">{product.description}</p>

          <div className="variant-selector">
            <h3>Choose your pot color: <span>{selectedPot}</span></h3>
            <div className="pot-options">
              {product.pots.map(pot => (
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
            <button className="btn btn-primary add-to-cart-btn">Add to Cart</button>
            <button className="wishlist-btn"><Heart size={20} /></button>
          </div>

          <div className="trust-badges">
            <div className="badge"><Truck size={18} /> <span>Free Shipping</span></div>
            <div className="badge"><ShieldCheck size={18} /> <span>30-Day Guarantee</span></div>
          </div>

          <div className="care-instructions">
            <h3>Plant Care</h3>
            <div className="care-grid">
              {product.care.map((item, idx) => (
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
