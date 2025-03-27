import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewSale = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product._id === product._id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.product._id === product._id 
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * product.price } 
          : item
      ));
    } else {
      setCart([...cart, { 
        product, 
        quantity: 1, 
        price: product.price,
        subtotal: product.price 
      }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    const product = products.find(p => p._id === productId);
    
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available in stock.`);
      quantity = product.stock;
    }
    
    setCart(cart.map(item => 
      item.product._id === productId 
        ? { ...item, quantity, subtotal: quantity * item.price } 
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    
    try {
      const saleData = {
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal
        })),
        total: calculateTotal(),
        paymentMethod
      };
      
      const res = await axios.post('http://localhost:5000/api/sales', saleData);
      alert('Sale completed successfully!');
      navigate(`/sales/${res.data._id}`);
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('Error creating sale. Please try again.');
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) && product.stock > 0
  );

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  }

  return (
    <div className="new-sale">
      <h2 className="mb-4">New Sale</h2>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {filteredProducts.length === 0 ? (
                  <div className="col-12 text-center">
                    <p>No products found</p>
                  </div>
                ) : (
                  filteredProducts.map(product => (
                    <div key={product._id} className="col-md-4 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text text-muted small">{product.description}</p>
                          <p className="card-text">
                            <strong>Price:</strong> ${product.price.toFixed(2)}
                          </p>
                          <p className="card-text">
                            <strong>Stock:</strong> {product.stock}
                          </p>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Shopping Cart</h5>
            </div>
            <div className="card-body">
              {cart.length === 0 ? (
                <p className="text-center">Cart is empty</p>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(item => (
                          <tr key={item.product._id}>
                            <td>{item.product.name}</td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                                min="1"
                                max={item.product.stock}
                                style={{ width: '60px' }}
                              />
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${item.subtotal.toFixed(2)}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromCart(item.product._id)}
                              >
                                &times;
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="d-flex justify-content-between mt-3">
                    <h5>Total:</h5>
                    <h5>${calculateTotal().toFixed(2)}</h5>
                  </div>
                  
                  <div className="form-group mt-3">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select
                      className="form-control"
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <button
                    className="btn btn-success btn-block mt-3"
                    onClick={handleCheckout}
                  >
                    Complete Sale
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSale;