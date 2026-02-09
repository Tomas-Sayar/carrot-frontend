import React from 'react';
import { Plus } from 'lucide-react';
import { getImageUrl } from '../services/api';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, price, categories, image, tag } = product;
  const categoryName = categories?.name || 'Plant';

  return (
    <div className="product-card">
      <div className="product-image-container">
        {tag && <span className="product-tag">{tag}</span>}
        <a href={`/product/${id}`}>
          <img src={getImageUrl(image)} alt={name} className="product-image" />
        </a>
        <button className="quick-add-btn">
          <Plus size={20} />
          <span>Add to cart</span>
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{categoryName}</span>
        <h3 className="product-name">
          <a href={`/product/${id}`}>{name}</a>
        </h3>
        <div className="product-price">${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
