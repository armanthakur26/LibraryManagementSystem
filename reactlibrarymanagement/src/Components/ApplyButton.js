import React from 'react';
import { useUser } from './UserContext.js'; // Import the user context

const ApplyButton = ({ bookId }) => {
  const { user } = useUser();

  const handleApplyClick = () => {
    if (user) {
      console.log('Applying for book with ID:', bookId);
  
    } else {
    
      console.log('Please login to apply.');
    }
  };

  return (
    <button onClick={handleApplyClick}>Apply</button>
  );
};

export default ApplyButton;
