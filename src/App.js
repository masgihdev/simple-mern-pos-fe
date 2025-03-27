import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProductList from './components/products/ProductList';
import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';
import CategoryList from './components/categories/CategoryList';
import AddCategory from './components/categories/AddCategory';
import EditCategory from './components/categories/EditCategory';
import NewSale from './components/sales/NewSale';
import SalesList from './components/sales/SalesList';
import SaleDetails from './components/sales/SaleDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/add" element={<AddCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/sales/new" element={<NewSale />} />
            <Route path="/sales" element={<SalesList />} />
            <Route path="/sales/:id" element={<SaleDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
