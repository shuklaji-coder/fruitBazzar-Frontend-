import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageSelect, currentImage, label = "Upload Image" }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setPreview(result);
        onImageSelect(result, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null, null);
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      
      <div 
        className={`image-upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="image-preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <button 
              type="button" 
              className="remove-image-btn"
              onClick={removeImage}
            >
              ×
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">📸</div>
            <p>Drag & drop image here or click to browse</p>
            <p className="upload-hint">Supports: JPG, PNG, GIF (Max 5MB)</p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="file-input"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
