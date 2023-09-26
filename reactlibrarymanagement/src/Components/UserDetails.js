import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const UserDetails = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.unique_name;

      axios
        .get(`https://localhost:7247/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);

        });
    }
  }, [token]);
  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case 0:
        return 'Student';
      case 1:
        return 'Admin';
      case 2:
        return 'Teacher';
      default:
        return 'Unknown';
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>User Details</h1>
        <div style={styles.userInfo}>
          <p style={styles.name}>Name: {user.firstName + ' ' + user.lastName}</p>
          <p style={styles.email}>Email: {user.email}</p>
          <p style={styles.phone}>Phone: +91{user.mobile}</p>
          <p style={styles.account}>
            Account Detail: {user.blocked ? 'You are Blocked By Admin' : 'You are not Blocked'}
          </p>
          <p style={styles.userType}>UserType: {getUserTypeLabel(user.userType)}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    marginTop: '120px',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvVDSPrulLAYLwsbPfVcI0bCzMroiHjGwXJQ&usqp=CAU')`, 
    backgroundSize: 'cover',
    opacity: 1, 
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: '30px',
    backgroundColor: 'rgba(525, 255, 255, 0.9)', 
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  userInfo: {
    marginTop: '20px',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  email: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  phone: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  account: {
    fontSize: '16px',
    color: '#ff0000',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  userType: {
    fontSize: '16px',
    marginBottom: '10px',
  },
};

export default UserDetails;
