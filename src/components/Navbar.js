import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <div className="navbar-brand-container">
          <Link to="/" className="navbar-brand mb-0">POS System</Link>
          <small className="text-muted d-block" style={{ fontSize: '0.7rem', color: '#999 !important', marginTop: '-5px' , marginLeft: '30px' }}>by MasgihDev</small>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link">Categories</Link>
            </li>
            <li className="nav-item">
              <Link to="/sales/new" className="nav-link">New Sale</Link>
            </li>
            <li className="nav-item">
              <Link to="/sales" className="nav-link">Sales History</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;