import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrder.css';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getUserIdFromToken = () => {
    try {
      // Decode the token to get user ID
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken.unique_name;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  const handleReturn = async (orderId) => {
    try {
      await axios.delete(`https://localhost:7247/api/Orders/${orderId}`);
    
      fetchOrders();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };
  const fetchOrders = async () => {
    const userId = getUserIdFromToken();

    if (userId) {
      try {
        const response = await axios.get(`https://localhost:7247/api/Orders/GetOrderByUser/${userId}`);
        const ordersData = response.data;

        const ordersWithTitlesAndUsers = await Promise.all(
          ordersData.map(async (order) => {
            const book = await fetchBookTitle(order.bookId);
            const user = await fetchUserDetails(order.userId);
            return { ...order, book: book, user: user };
          })
        );
        setOrders(ordersWithTitlesAndUsers);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  };

  const fetchBookTitle = async (bookId) => {
    try {
      const response = await axios.get(`https://localhost:7247/api/Books/${bookId}`);
      return response.data; // Assuming the title property is returned by the backend
    } catch (error) {
      console.error('Error fetching book title:', error);
      return 'Book Title Not Found'; // Provide a default value if there's an error
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7247/api/User/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return { name: 'User Not Found' };
    }
  };

  // Function to format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      <div className="approved-orders">
        <h2>Approved Orders</h2>
        {orders.length === 0 ? (
          <p className="text-danger center">No results found</p>
        ) :
        orders.map((order) => (
          order.isApproved && (
            <div key={order.id} className="order-details">
              <img src={order.book.image} alt="Book Image" />
              <div className="order-info">
                <p>
                  <b>Book Name:</b> {order.book.title}<br />
                  <b>Email:</b> {order.user.email}<br />
                  <b>Contact No:</b> {order.user.mobile}<br />
                  <b>Order Date:</b> {formatDate(order.createdOn)}<br />
                  <b>Last Return Date:</b> {formatDate(order.retrunOn)}<br />
                  <b>Book Status:</b> {order.isApproved ? 'Approved' : 'Waiting for Approval'}
                  {order.isApproved && (
                <button style={{marginLeft:'90%',top:''}} onClick={() => handleReturn(order.id)}>Return Book</button>
              )}
                </p>
              </div>
            </div>
          )
        ))}
      </div>
      <div className="waiting-orders">
        <h2>Waiting for Approval</h2>
        {orders.length === 0 ? (
          <p className="text-danger center">No results found</p>
        ) : 
        orders.map((order) => (
          !order.isApproved && (
            <div key={order.id} className="order-details">
              <img src={order.book.image} alt="Book Image"/>
              <div className="order-info">
                <p>
                  <b>Book Name:</b> {order.book.title}<br />
                  <b>Email:</b> {order.user.email}<br />
                  <b>Contact No:</b> {order.user.mobile}<br />
                  <b>Order Date:</b> {formatDate(order.createdOn)}<br />
                  <b>Last Return Date:</b> {formatDate(order.retrunOn)}<br />
                  <b>Book Status:</b> {order.isApproved ? 'Approved' : 'Waiting for Approval'}
                </p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default MyOrder;



