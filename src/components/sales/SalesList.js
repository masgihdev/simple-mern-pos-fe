import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sales');
        setSales(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales:', error);
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  }

  return (
    <div className="sales-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Sales History</h2>
        <Link to="/sales/new" className="btn btn-primary">New Sale</Link>
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Sale ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No sales found</td>
              </tr>
            ) : (
              sales.map(sale => (
                <tr key={sale._id}>
                  <td>{sale._id.substring(0, 8)}...</td>
                  <td>{formatDate(sale.createdAt)}</td>
                  <td>{sale.items.length}</td>
                  <td>${sale.total.toFixed(2)}</td>
                  <td>
                    <span className="text-capitalize">{sale.paymentMethod}</span>
                  </td>
                  <td>
                    <Link to={`/sales/${sale._id}`} className="btn btn-info btn-sm">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesList;