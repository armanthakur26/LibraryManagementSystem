import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrder.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Myreadouts = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const [userrating,setUserrating] = useState([]);

  useEffect(() => {
    if (token) {
      fetchOrders();
      rat();
      handleRatingChange();
    }
  },[token]);
  const getUserIdFromToken = () => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken.unique_name;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  const rat = () => {
    const userId = getUserIdFromToken();
    axios
      .get(`https://localhost:7247/api/Rating/UserId/${userId}`)
      .then((response) => {
        setUserrating(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user ratings:', error);
      });
  };
  const fetchOrders = async () => {
    const userId = getUserIdFromToken();
    if (userId) {
      try {
        const response = await axios.get(`https://localhost:7247/api/Orders/myreadoutbooks/${userId}`);
        const ordersData = response.data;
        const ordersWithTitlesAndUsers = await Promise.all(
          ordersData.map(async (order) => {
            const [book, user] = await Promise.all([
              fetchBookTitle(order.bookId),
              fetchUserDetails(order.userId),
            ]);
            return { ...order, book, user };
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
      return response.data;
    } catch (error) {
      console.error('Error fetching book title:', error);
      return { title: 'Book Title Not Found', image: '' };
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7247/api/User/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return { email: 'User Not Found', mobile: '' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const handleRatingChange = async (ratingValue, order) => {
    try {
      await axios.post('https://localhost:7247/api/Rating', {
        booksRatingValue: ratingValue,
        userId: order.userId,
        bookId: order.bookId,
      });
      const updateduserRating = { bookId: order.bookId, booksratingValue: ratingValue };
      setUserrating((prevRating) => [...prevRating, updateduserRating]);
    // ratingAlert();
      rat();
    } catch (error) {
      console.log('Something went wrong:', error);
    }
  };
  const ratingAlert = () => {
    Swal.fire({
      title: 'Rating Done successfully',
      text: 'Thank you for giving a rating',
      icon: 'success',
    });
  };
  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      <div className="approved-orders">
        <h2>ReadOuts Orders</h2>
        {orders.length === 0 ? (
          <p className="text-danger center">No results found</p>
        ) : (
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
                    <b>Book Status:</b> Done<br />
                    <div className="rating-stars">
                      <b>Rating:</b>
                      {new Array(5).fill().map((_, index) => (
                   <FontAwesomeIcon
                    key={index + 1}
                    icon={faStar}
                      className={`star-icon ${index + 1 <= userrating.find(e => e.bookId === order.bookId)?.booksratingValue ? 'selected' : 'unselected'}`}
                      onMouseOver={() => handleRatingChange(index + 1, order)}
                       />
                    ))}
                    </div>            
                  </p>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};
export default Myreadouts;

