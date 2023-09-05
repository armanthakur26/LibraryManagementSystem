import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <button className="btn btn-outline-primary " onClick={handleLogout}><i class='fas fa-sign-out-alt' style={{color:'blue'}}/>Logout</button>  );
};

export default Logout;
