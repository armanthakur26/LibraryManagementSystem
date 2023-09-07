// import { useLocation ,useNavigate} from 'react-router-dom';
//  import React, { useState, useEffect } from "react";
//  import axios from "axios";
//  import jwtDecode from "jwt-decode";
//  import Swal from 'sweetalert2';

// const OrderForm = () => {
//   const location = useLocation();
//   const { bookId, bookTitle } = location.state;
//   const [userId, setUserId] = useState("");
//     const [createdDate, setCreatedDate] = useState("");
//     const [returnDate, setReturnDate] = useState("");
  
//     const navigate=useNavigate();

//    useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//           const decodedToken = jwtDecode(token);
//           if (decodedToken && decodedToken.unique_name) {
//             setUserId(decodedToken.unique_name);
//           }
//         }
//       },[bookId]);

//   const handleCreatedDateChange = (e) => {
//     setCreatedDate(e.target.value);
//     const maxReturnDate = new Date(e.target.value);
//     maxReturnDate.setDate(maxReturnDate.getDate() + 10);
//     const formattedReturnDate = maxReturnDate.toISOString().slice(0, 16);
//     setReturnDate(formattedReturnDate);
//   };

//   const handleReturnDateChange = (e) => {
  
//     const selectedReturnDate = new Date(e.target.value);
//     const maxReturnDate = new Date(createdDate);
//     maxReturnDate.setDate(maxReturnDate.getDate() + 10);

//     if (selectedReturnDate > maxReturnDate) {
//       const formattedMaxReturnDate = maxReturnDate.toISOString().slice(0, 16);
//       setReturnDate(formattedMaxReturnDate);
//     } else {
//       setReturnDate(e.target.value);
//     }
//   };
//   const handleOrderSubmit = () => {
//         const orderData = {
//           bookid: bookId,
//           userid: userId,
//           createdOn: createdDate,
//           retrunOn: returnDate,
//         };
    
//         const apiUrl = "https://localhost:7247/api/Orders";
//         axios
//           .post(apiUrl, orderData)
//           .then((response) => {
//             console.log("Order created successfully!");
//             bookorder();
//        navigate('/Dashboard');
//           })
//           .catch((error) => {
//             console.error("Error creating the order:", error);

//           });
//       };
    
//       const bookorder = () => {
//         Swal.fire({  
//             title: 'Book order Successfully',  
//             icon: 'success'
//           }); 
//       }
//   return (
//     <div
//           style={{
//             maxWidth: "400px",
//             margin: "0 auto",
//             padding: "20px",
//             borderRadius: "5px",
//             boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
//             backgroundColor: "#f7f7f7",
//           }}
//         >
//           <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//             Create Order
//           </h2>
//           <div style={{ marginBottom: "15px" }}>
//             <label htmlFor="bookTitle" style={{ marginBottom: "5px" }}>
//               Book Name
//             </label>
//             <input
//               type="text"
//               id="bookTitle"
//               value={bookTitle}
//               readOnly
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "3px",
//               }}
//             />
//           </div>
//           <div style={{ marginBottom: "15px" }}>
//             <label htmlFor="createdDate" style={{ marginBottom: "5px" }}>
//               Issue Date
//             </label>
//             <input
//               type="datetime-local"
//               id="createdDate"
//               value={createdDate}
//               onChange={handleCreatedDateChange}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "3px",
//               }}
//             />
//           </div>
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="returnDate" style={{ marginBottom: "5px" }}>
//               Return Date and Time:
//             </label>
//             <input
//               type="datetime-local"
//               id="returnDate"
//               min={createdDate}
//               value={returnDate}
//               onChange={handleReturnDateChange}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "3px",
//               }}
//             />
//           </div>
//           <button
//             style={{
//               display: "block",
//               width: "100%",
//               padding: "12px",
//               border: "none",
//               borderRadius: "5px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               cursor: "pointer",
//             }}
//             onClick={handleOrderSubmit}
//           >
//             Create Order
//           </button>
        
//         </div>
//   );
// };
// export default OrderForm;

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

const OrderForm = () => {
  const location = useLocation();
  const { bookId, bookTitle } = location.state;
  const [userId, setUserId] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.unique_name) {
        setUserId(decodedToken.unique_name);
      }
    }
  }, [bookId]);

  const handleCreatedDateChange = (e) => {
    setCreatedDate(e.target.value);
    const maxReturnDate = new Date(e.target.value);
    maxReturnDate.setDate(maxReturnDate.getDate() + 10);
    const formattedReturnDate = maxReturnDate.toISOString().slice(0, 16);
    setReturnDate(formattedReturnDate);
    setValidationError('');
  };

  const handleReturnDateChange = (e) => {
    const selectedReturnDate = new Date(e.target.value);
    const maxReturnDate = new Date(createdDate);
    maxReturnDate.setDate(maxReturnDate.getDate() + 10);
    if (selectedReturnDate > maxReturnDate) {
      const formattedMaxReturnDate = maxReturnDate.toISOString().slice(0, 16);
      setReturnDate(formattedMaxReturnDate);
      setValidationError('Return date cannot be more than 10 days from the issue date.');
    } else {
      setReturnDate(e.target.value);
      setValidationError('');
    }
  };

  const handleOrderSubmit = () => {
    if (validationError) {
      return;
    }

    const orderData = {
      bookid: bookId,
      userid: userId,
      createdOn: createdDate,
      retrunOn: returnDate,
    };

    const apiUrl = 'https://localhost:7247/api/Orders';
    axios
      .post(apiUrl, orderData)
      .then((response) => {
        console.log('Order created successfully!');
        bookorder();
        navigate('/Dashboard');
      })
      .catch((error) => {
        console.error('Error creating the order:', error);
      });
  };

  const bookorder = () => {
    Swal.fire({
      title: 'Book order Successfully',
      icon: 'success',
    });
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#f7f7f7',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Order</h2>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="bookTitle" style={{ marginBottom: '5px' }}>
          Book Name
        </label>
        <input
          type="text"
          id="bookTitle"
          value={bookTitle}
          readOnly
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px',
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="createdDate" style={{ marginBottom: '5px' }}>
          Issue Date
        </label>
        <input
          type="datetime-local"
          id="createdDate"
          value={createdDate}
          onChange={handleCreatedDateChange}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="returnDate" style={{ marginBottom: '5px' }}>
          Return Date and Time:
        </label>
        <input
          type="datetime-local"
          id="returnDate"
          min={createdDate}
          value={returnDate}
          onChange={handleReturnDateChange}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '3px',
          }}
        />
        {validationError && (
          <p style={{ color: 'red', marginTop: '5px' }}>{validationError}</p>
        )}
      </div>
      <button
        style={{
          display: 'block',
          width: '100%',
          padding: '12px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={handleOrderSubmit}
      >
        Create Order
      </button>
    </div>
  );
};
export default OrderForm;

