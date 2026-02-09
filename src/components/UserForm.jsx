import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Upload, X } from 'lucide-react';

const UserForm = ({ user, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    adress: '',
    typeOfUser_id: '2'
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        password: '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        adress: user.adress || '',
        typeOfUser_id: user.typeOfUser_id || '2'
      });
      if (user.image) {
        setImagePreview(user.image.startsWith('http') ? user.image : null);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
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
    const dataToSubmit = {
      ...formData,
      typeOfUser_id: parseInt(formData.typeOfUser_id) || 2
    };
    
    if (!formData.password && user) {
      delete dataToSubmit.password;
    }
    
    if (imageFile) {
      dataToSubmit.image = imageFile;
    }
    
    onSubmit(dataToSubmit);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      {/* Profile Image */}
      <div className="form-group">
        <label>Profile Image</label>
        <div className="file-upload-container avatar-upload">
          {imagePreview ? (
            <div className="image-preview avatar-preview">
              <img src={imagePreview} alt="Preview" />
              <button type="button" className="remove-image-btn" onClick={removeImage}>
                <X size={16} />
              </button>
            </div>
          ) : (
            <div 
              className="file-upload-area avatar-area"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={24} />
              <span>Upload image</span>
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

      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Jane Doe..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username *</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="janesmith92..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="jane.doe@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          {user ? 'New password (Leave empty to keep)' : 'Password *'}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!user}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="adress">Address</label>
        <input
          type="text"
          id="adress"
          name="adress"
          value={formData.adress}
          onChange={handleChange}
          placeholder="My place 123, Utah, USA"
        />
      </div>

      <div className="form-group">
        <label htmlFor="typeOfUser_id">Tipo de Usuario</label>
        <select
          id="typeOfUser_id"
          name="typeOfUser_id"
          value={formData.typeOfUser_id}
          onChange={handleChange}
        >
          <option value="2">Retail</option>
          <option value="1">Wholesale</option>
        </select>
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
            user ? 'Update User' : 'Create User'
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
