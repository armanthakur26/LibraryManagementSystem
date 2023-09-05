// import React, { useState, useEffect } from "react";
// import { useParams, Navigate } from "react-router-dom";
// import axios from "axios";
// import jwtDecode from "jwt-decode";

// const MyOrders = (props) => {
//   const { bookId } = useParams();
//   const [userId, setUserId] = useState("");
//   const [createdDate, setCreatedDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [bookTitle, setBookTitle] = useState("");
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       if (decodedToken && decodedToken.unique_name) {
//         setUserId(decodedToken.unique_name);
//       }
//     }

//     const apiUrl = `https://localhost:7247/api/Books/${bookId}`;
//     axios
//       .get(apiUrl)
//       .then((response) => {
//         setBookTitle(response.data.title);
//       })
//       .catch((error) => {
//         console.error("Error fetching book data:", error);
//       });
//   }, [bookId]);

//   const handleCreatedDateChange = (e) => {
//     setCreatedDate(e.target.value);

//     const maxReturnDate = new Date(e.target.value);
//     maxReturnDate.setDate(maxReturnDate.getDate() + 10);

//     // Format the return date as yyyy-MM-ddTHH:mm to match the datetime-local input format
//     const formattedReturnDate = maxReturnDate.toISOString().slice(0, 16);
//     setReturnDate(formattedReturnDate);
//   };

//   const handleReturnDateChange = (e) => {
//     // Ensure that the selected return date is within 10 days from the issue date
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
//     const orderData = {
//       bookid: bookId,
//       userid: userId,
//       createdOn: createdDate,
//       retrunOn: returnDate,
//     };

//     const apiUrl = "https://localhost:7247/api/Orders";
//     axios
//       .post(apiUrl, orderData)
//       .then((response) => {
//         console.log("Order created successfully!");
//         setShowSuccessPopup(true);
//       })
//       .catch((error) => {
//         console.error("Error creating the order:", error);
//       });
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "400px",
//         margin: "0 auto",
//         padding: "20px",
//         borderRadius: "5px",
//         boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
//         backgroundColor: "#f7f7f7",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//         Create Order
//       </h2>
//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="bookTitle" style={{ marginBottom: "5px" }}>
//           Book Name
//         </label>
//         <input
//           type="text"
//           id="bookTitle"
//           value={bookTitle}
//           readOnly
//           style={{
//             width: "100%",
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "3px",
//           }}
//         />
//       </div>
//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="createdDate" style={{ marginBottom: "5px" }}>
//           Issue Date
//         </label>
//         <input
//           type="datetime-local"
//           id="createdDate"
//           value={createdDate}
//           onChange={handleCreatedDateChange}
//           style={{
//             width: "100%",
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "3px",
//           }}
//         />
//       </div>
//       <div style={{ marginBottom: "20px" }}>
//         <label htmlFor="returnDate" style={{ marginBottom: "5px" }}>
//           Return Date and Time:
//         </label>
//         <input
//           type="datetime-local"
//           id="returnDate"
//           min={createdDate}
//           value={returnDate}
//           onChange={handleReturnDateChange}
//           style={{
//             width: "100%",
//             padding: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "3px",
//           }}
//         />
//       </div>
//       <button
//         style={{
//           display: "block",
//           width: "100%",
//           padding: "12px",
//           border: "none",
//           borderRadius: "5px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           cursor: "pointer",
//         }}
//         onClick={handleOrderSubmit}
//       >
//         Create Order
//       </button>
//       {showSuccessPopup && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             background: "rgba(0, 123, 255, 0.9)",
//             color: "#fff",
//             padding: "20px",
//             borderRadius: "5px",
//             boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
//             zIndex: 999,
//           }}
//         >
//           <p style={{ margin: 0 }}>Order created successfully!</p>
//           <button
//             style={{
//               marginTop: "10px",
//               background: "none",
//               border: "1px solid #fff",
//               color: "#fff",
//               padding: "5px 10px",
//               borderRadius: "3px",
//               cursor: "pointer",
//             }}
//             onClick={() => setShowSuccessPopup(false)}
//           >
//             Close
//           </button>
//           <Navigate to="/Dashboard" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;





import { useLocation ,useNavigate} from 'react-router-dom';
 import React, { useState, useEffect } from "react";
 import axios from "axios";
 import jwtDecode from "jwt-decode";
 import Swal from 'sweetalert2';

const OrderForm = () => {
  const location = useLocation();
  const { bookId, bookTitle } = location.state;
  const [userId, setUserId] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
  
    const navigate=useNavigate();

   useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken && decodedToken.unique_name) {
            setUserId(decodedToken.unique_name);
          }
        }
      },[bookId]);

  const handleCreatedDateChange = (e) => {
    setCreatedDate(e.target.value);
    const maxReturnDate = new Date(e.target.value);
    maxReturnDate.setDate(maxReturnDate.getDate() + 10);
    const formattedReturnDate = maxReturnDate.toISOString().slice(0, 16);
    setReturnDate(formattedReturnDate);
  };

  const handleReturnDateChange = (e) => {
  
    const selectedReturnDate = new Date(e.target.value);
    const maxReturnDate = new Date(createdDate);
    maxReturnDate.setDate(maxReturnDate.getDate() + 10);

    if (selectedReturnDate > maxReturnDate) {
      const formattedMaxReturnDate = maxReturnDate.toISOString().slice(0, 16);
      setReturnDate(formattedMaxReturnDate);
    } else {
      setReturnDate(e.target.value);
    }
  };
  const handleOrderSubmit = () => {
        const orderData = {
          bookid: bookId,
          userid: userId,
          createdOn: createdDate,
          retrunOn: returnDate,
        };
    
        const apiUrl = "https://localhost:7247/api/Orders";
        axios
          .post(apiUrl, orderData)
          .then((response) => {
            console.log("Order created successfully!");
            bookorder();
       navigate('/Dashboard');
          })
          .catch((error) => {
            console.error("Error creating the order:", error);

          });
      };
    
      const bookorder = () => {
        Swal.fire({  
            title: 'Book order Successfully',  
            icon: 'success'
          }); 
      }
  return (
    <div
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            backgroundColor: "#f7f7f7",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Create Order
          </h2>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="bookTitle" style={{ marginBottom: "5px" }}>
              Book Name
            </label>
            <input
              type="text"
              id="bookTitle"
              value={bookTitle}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="createdDate" style={{ marginBottom: "5px" }}>
              Issue Date
            </label>
            <input
              type="datetime-local"
              id="createdDate"
              value={createdDate}
              onChange={handleCreatedDateChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="returnDate" style={{ marginBottom: "5px" }}>
              Return Date and Time:
            </label>
            <input
              type="datetime-local"
              id="returnDate"
              min={createdDate}
              value={returnDate}
              onChange={handleReturnDateChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={handleOrderSubmit}
          >
            Create Order
          </button>
        
        </div>
  );
};
export default OrderForm;