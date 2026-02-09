import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, nombre, precio, categorias, imagen, tag } = product;
  const { addToCart } = useCart();
  const categoryName = categorias?.nombre || 'Plant';

  return (
    <div className="product-card">
      <div className="product-image-container">
        {tag && <span className="product-tag">{tag}</span>}
        <Link to={`/product/${id}`}>
          <img src={getImageUrl(imagen)} alt={nombre} className="product-image" />
        </Link>
        <button className="quick-add-btn" onClick={() => addToCart(product)}>
          <Plus size={20} />
          <span>Add to cart</span>
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{categoryName}</span>
        <h3 className="product-name">
          <Link to={`/product/${id}`}>{nombre}</Link>
        </h3>
        <div className="product-price">${precio}</div>
      </div>
    </div>
  );
};

export default ProductCard;
