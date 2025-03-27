import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    sales: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsRes = await axios.get('http://localhost:5000/api/products');
        const categoriesRes = await axios.get('http://localhost:5000/api/categories');
        const salesRes = await axios.get('http://localhost:5000/api/sales');
        
        const totalRevenue = salesRes.data.reduce((sum, sale) => sum + sale.total, 0);
        
        setStats({
          products: productsRes.data.length,
          categories: categoriesRes.data.length,
          sales: salesRes.data.length,
          revenue: totalRevenue
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2 className="mb-4">Dashboard</h2>
      
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <h2 className="card-text">{stats.products}</h2>
              <Link to="/products" className="btn btn-light btn-sm">View Products</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Categories</h5>
              <h2 className="card-text">{stats.categories}</h2>
              <Link to="/categories" className="btn btn-light btn-sm">View Categories</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Sales</h5>
              <h2 className="card-text">{stats.sales}</h2>
              <Link to="/sales" className="btn btn-light btn-sm">View Sales</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-4">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <h2 className="card-text">${stats.revenue.toFixed(2)}</h2>
              <Link to="/sales/new" className="btn btn-light btn-sm">New Sale</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              Quick Actions
            </div>
            <div className="card-body">
              <div className="list-group">
                <Link to="/products/add" className="list-group-item list-group-item-action">Add New Product</Link>
                <Link to="/categories/add" className="list-group-item list-group-item-action">Add New Category</Link>
                <Link to="/sales/new" className="list-group-item list-group-item-action">Create New Sale</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;