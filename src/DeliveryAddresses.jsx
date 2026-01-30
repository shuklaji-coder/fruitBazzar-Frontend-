import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';
import './DeliveryAddresses.css';

const DeliveryAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const navigate = useNavigate();
  const { cartItems } = useContext(StoreContext);

  useEffect(() => {
    // Load saved addresses from localStorage
    const savedAddresses = localStorage.getItem('deliveryAddresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingAddress) {
      // Update existing address
      const updatedAddresses = addresses.map(addr =>
        addr.id === editingAddress.id
          ? { ...formData, id: editingAddress.id }
          : addr
      );
      setAddresses(updatedAddresses);
      localStorage.setItem('deliveryAddresses', JSON.stringify(updatedAddresses));
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now().toString()
      };
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      localStorage.setItem('deliveryAddresses', JSON.stringify(updatedAddresses));
    }

    // Reset form
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = (addressId) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    setAddresses(updatedAddresses);
    localStorage.setItem('deliveryAddresses', JSON.stringify(updatedAddresses));
  };

  const handleSetDefault = (addressId) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    setAddresses(updatedAddresses);
    localStorage.setItem('deliveryAddresses', JSON.stringify(updatedAddresses));
  };

  return (
    <div className="delivery-addresses-container">
      <div className="delivery-addresses-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <i className="bi bi-arrow-left"></i>
          Back
        </button>
        <h1>📍 Delivery Addresses</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="add-address-btn"
        >
          <i className="bi bi-plus-circle"></i>
          Add Address
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="address-form-overlay">
          <div className="address-form">
            <div className="form-header">
              <h2>{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
              <button onClick={() => setShowAddForm(false)} className="close-btn">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    />
                    Set as default address
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingAddress ? 'Update' : 'Save'} Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Addresses List */}
      <div className="addresses-list">
        {addresses.length === 0 ? (
          <div className="no-addresses">
            <i className="bi bi-geo-alt"></i>
            <h3>No delivery addresses yet</h3>
            <p>Add your first delivery address to get started</p>
            <button onClick={() => setShowAddForm(true)} className="btn-primary">
              Add Your First Address
            </button>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
              {address.isDefault && (
                <div className="default-badge">
                  <i className="bi bi-star-fill"></i>
                  Default
                </div>
              )}

              <div className="address-content">
                <div className="address-info">
                  <h4>{address.name}</h4>
                  <p><i className="bi bi-telephone"></i> {address.phone}</p>
                  <p><i className="bi bi-geo-alt"></i> {address.address}</p>
                  <p><i className="bi bi-building"></i> {address.city}, {address.state} - {address.pincode}</p>
                </div>

                <div className="address-actions">
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="btn-default"
                    disabled={address.isDefault}
                  >
                    <i className="bi bi-star"></i>
                    {address.isDefault ? 'Default' : 'Set Default'}
                  </button>
                  <button onClick={() => handleEdit(address)} className="btn-edit">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button onClick={() => handleDelete(address.id)} className="btn-delete">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryAddresses;
