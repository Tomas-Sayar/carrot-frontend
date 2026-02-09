import React, { useState } from 'react';
import { Trash2, ArrowLeft } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Bamboo Palm', price: 199, quantity: 1, pot: 'Stone', imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'ZZ Plant', price: 139, quantity: 2, pot: 'Clay', imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=200&q=80' }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="cart-page container section-padding">
      <h1>Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <a href="/shop" className="btn btn-primary">Continue Shopping</a>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            <div className="cart-header desktop-only">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="product-cell">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <p>Pot: {item.pot}</p>
                    <button onClick={() => removeItem(item.id)} className="remove-btn">
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
                <div className="price-cell desktop-only">${item.price}</div>
                <div className="quantity-cell">
                  <div className="quantity-control-small">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="total-cell">${item.price * item.quantity}</div>
              </div>
            ))}

            <a href="/shop" className="back-to-shop"><ArrowLeft size={16} /> Continue Shopping</a>
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button className="btn btn-primary checkout-btn">Checkout</button>
            <p className="summary-footer">Taxes calculated at checkout</p>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
