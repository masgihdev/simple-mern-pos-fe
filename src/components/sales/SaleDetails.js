import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SaleDetails = () => {
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sales/${id}`);
        setSale(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sale details:', error);
        setLoading(false);
      }
    };

    fetchSale();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  }

  if (!sale) {
    return (
      <div className="alert alert-danger">
        Sale not found. <Link to="/sales">Go back to sales list</Link>
      </div>
    );
  }

  return (
    <div className="sale-details">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Sale Details</h2>
        <Link to="/sales" className="btn btn-secondary">Back to Sales</Link>
      </div>
      
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Sale Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Sale ID:</strong> {sale._id}</p>
              <p><strong>Date:</strong> {formatDate(sale.createdAt)}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Payment Method:</strong> <span className="text-capitalize">{sale.paymentMethod}</span></p>
              <p><strong>Total Amount:</strong> ${sale.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">Items Purchased</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {sale.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-right"><strong>Total:</strong></td>
                  <td><strong>${sale.total.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetails;