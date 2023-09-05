import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersComponent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:7247/api/Orders');
      const ordersData = response.data;
  
      
      const currentDate = new Date();
  
      const ordersWithTitlesAndUsers = await Promise.all(
        ordersData.map(async (order) => {
          const book = await fetchBookTitle(order.bookId);
          const user = await fetchUserDetails(order.userId);
          const shouldDelete = new Date(order.retrunOn) <= currentDate; 
          if (shouldDelete) {
            
            await handleReturnAndDelete(order.id);
            return null; 
          }
          return { ...order, book: book, user: user };
        })
      );
  
      
      const filteredOrders = ordersWithTitlesAndUsers.filter((order) => order !== null);
  
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  

  const fetchBookTitle = async (bookId) => {
    try {
      const response = await axios.get(`https://localhost:7247/api/Books/${bookId}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching book title:', error);
      return 'Book Title Not Found'; 
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

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleApprove = async (orderId) => {
    try {
    
      const orderToUpdate = orders.find((order) => order.id === orderId);

    
      const updatedOrder = { ...orderToUpdate, isApproved: true };

    
      await axios.put(`https://localhost:7247/api/Orders/${orderId}`, updatedOrder);

    
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleReturnAndDelete = async (orderId) => {
    try {
    
      await axios.delete(`https://localhost:7247/api/Orders/${orderId}`);
  
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="orders-container">
      <h1>All Orders</h1>
      <table className="orders-table">
        <tbody>
          { orders.length===0?(<p className="text-danger center ">No result found</p>):
            orders.map((order) => (
            <tr key={order.id}>
              <td>
                <img src={order.book.image} alt="Book Image" />
              </td>
              <td>
              
                {/* <b>Order ID:</b> {order.id}<br /> */}
                {/* Book ID: {order.bookId}<br /> */}
                {/* User ID: {order.userId}<br /> */}
                <b>Book Name:</b> {order.book.title}<br />
                <b>User Name:</b> {order.user.firstName} {order.user.lastName}<br />
                <b>Email:</b> {order.user.email}<br />
                <b>Contact No:</b> {order.user.mobile}<br />
                <b>Order Date:</b> {formatDate(order.createdOn)}<br />
                <b>Last Return Date:</b> {formatDate(order.retrunOn)}<br />
                {/* Count: {order.count}<br /> */}
                {/* Display the fetched book title */}
                {/* Show approval status based on IsApproved */}
                <b>Book Status:</b> {order.isApproved ? 'Approved' : 'Not Approved'}
              </td>
              <td>
              
                {!order.isApproved && (
                  <button onClick={() => handleApprove(order.id)}>Approve</button>
                )}
                {!order.isApproved && (
                  <button onClick={() => handleReturnAndDelete(order.id)}>Reject</button>
                )}
                {order.isApproved && (
                  <button onClick={() => handleReturnAndDelete(order.id)}>Return Book</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersComponent;
