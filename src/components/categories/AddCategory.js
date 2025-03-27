import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, formData);
      console.log('Category created:', response.data);
      navigate('/categories');
    } catch (error) {
      console.error('Error creating category:', error.response?.data || error);
      setError(error.response?.data?.message || 'Error creating category. Please try again.');
    }
  };

  return (
    <div className="add-category">
      <h2 className="mb-4">Add New Category</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">Add Category</button>
        <button 
          type="button" 
          className="btn btn-secondary ml-2"
          onClick={() => navigate('/categories')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddCategory;