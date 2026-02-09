import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Upload, X } from 'lucide-react';

const ProductForm = ({ product, categories, brands, types, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '0',
    description: '',
    category_id: '',
    type_id: '',
    brand_id: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || product.Name || '',
        price: product.price || product.Price || '',
        discount: product.discount || '0',
        description: product.description || '',
        category_id: product.category_id || '',
        type_id: product.type_id || '',
        brand_id: product.brand_id || ''
      });
      // Show existing image if available
      if (product.image) {
        setImagePreview(product.image.startsWith('http') ? product.image : null);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      discount: parseInt(formData.discount) || 0,
      category_id: parseInt(formData.category_id) || null,
      type_id: parseInt(formData.type_id) || null,
      brand_id: parseInt(formData.brand_id) || null
    };
    
    // Add image file if selected
    if (imageFile) {
      submitData.image = imageFile;
    }
    
    onSubmit(submitData);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Green plant"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            max="100"
            placeholder="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category_id">Category *</label>
        <select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          {categories && categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.category || cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type_id">Type *</label>
          <select
            id="type_id"
            name="type_id"
            value={formData.type_id}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            {types && types.map(t => (
              <option key={t.id} value={t.id}>
                {t.type || t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="brand_id">Brand *</label>
          <select
            id="brand_id"
            name="brand_id"
            value={formData.brand_id}
            onChange={handleChange}
            required
          >
            <option value="">Select brand</option>
            {brands && brands.map(b => (
              <option key={b.id} value={b.id}>
                {b.brand || b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Product Image</label>
        <div className="file-upload-container">
          {imagePreview ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button type="button" className="remove-image-btn" onClick={removeImage}>
                <X size={16} />
              </button>
            </div>
          ) : (
            <div 
              className="file-upload-area"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={32} />
              <span>Click to upload an image</span>
              <span className="file-hint">JPG, PNG, GIF (max. 5MB)</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="spinner" size={16} /> Saving...
            </>
          ) : (
            product ? 'Update Product' : 'Create Product'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
