import React from 'react';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../services/api';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const shipping = cartTotal > 150 ? 0 : 15;
  const total = cartTotal + shipping;

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
                  <img src={getImageUrl(item.imagen)} alt={item.nombre} />
                  <div className="product-details">
                    <h3>{item.nombre}</h3>
                    <p>Price: ${item.precio}</p>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
                <div className="price-cell desktop-only">${item.precio}</div>
                <div className="quantity-cell">
                  <div className="quantity-control-small">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="total-cell">${item.precio * item.quantity}</div>
              </div>
            ))}

            <a href="/shop" className="back-to-shop"><ArrowLeft size={16} /> Continue Shopping</a>
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
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
