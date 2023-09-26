import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [approvedCounts, setApprovedCounts] = useState({});
  const [returnTimes, setReturnTimes] = useState({}); 
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const navigate = useNavigate();
  const [average, setAverage] = useState([]);
  useEffect(() => {
    getAllBooks();
    fetchOrdersAndCalculateCounts();
    AverageRatings();
  }, [searchQuery, books]);

const AverageRatings = async () => {
  try {
    const response = await axios.get("https://localhost:7247/api/Rating");
    const ratingsData = response.data;
    const calculatedAverageRatings = [];
    books.forEach((book) => {
      const bookRatings = ratingsData.filter((e) => e.bookId === book.id);
      if (bookRatings.length > 0) {
        const totalRating = bookRatings.reduce((sum, e) => sum + e.booksratingValue, 0);
        calculatedAverageRatings[book.id] = totalRating / bookRatings.length;
      }
    });
    setAverage(calculatedAverageRatings);
  } catch (error) {
    console.error("Error fetching average ratings:", error);
  }
};

  

  const fetchOrdersAndCalculateCounts = async () => {
    try {
      const response = await axios.get("https://localhost:7247/api/Orders");
      const ordersData = response.data;
      const calculatedApprovedCounts = {};
      const calculatedReturnTimes = {};
      ordersData.forEach((order) => {
        if (order.isApproved) {
          const bookId = order.bookId;
          calculatedApprovedCounts[bookId] = (calculatedApprovedCounts[bookId] || 0) + 1;
          if (!calculatedReturnTimes[bookId] || order.returnOn < calculatedReturnTimes[bookId]) {
            calculatedReturnTimes[bookId] = order.returnOn;
          }
        }
      });
      setApprovedCounts(calculatedApprovedCounts);
      setReturnTimes(calculatedReturnTimes);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const getAllBooks = async () => {
    try {
      const response = await axios.get("https://localhost:7247/api/Books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const isLoggedIn = !!localStorage.getItem("token");
  const handleApplyClick = (bookId, bookTitle) => {
    setSelectedBookId(bookId);
    setSelectedBookTitle(bookTitle);
    if (isLoggedIn) {
      navigate(`/OrderForm`, { state: { bookId, bookTitle } });
    } else {
      navigate("/Login");
    }
  };
  const filterBooks=books.filter((e)=>e.title.toLowerCase().includes(searchQuery.toLowerCase())||e.author.toLowerCase().includes(searchQuery.toLowerCase()));
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="dashboard-container">
      <div style={searchBarStyle}>
        <input
          type="text"
          placeholder="Search by book title or author"
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          style={searchinnerStyle}
        />
      </div>
      <div style={bookListStyle}>
        {filterBooks.length === 0 ? (
          <p className="text-danger center">No results found</p>
        ) : (
          filterBooks.map((book) => (
            <div key={book.id} style={bookCardStyle}>
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                style={bookImageStyle}
              />
              <div style={bookDetailsStyle}>
                <p style={bookTitleStyle}>
                  Name...
                  <i class="fas fa-book" />:{book.title}
                </p>
                <p style={bookAuthorStyle}>by {book.author}</p>
                <p style={bookPriceStyle}>Price: ${book.price}</p>
                <p style={bookCategoryStyle}>Category: {book.category}</p>
                <p style={bookCategoryStyle}>
                  {book.quantity - (approvedCounts[book.id] || 0) === 0|| book.quantity - (approvedCounts[book.id] || 0) < 0
                    ? returnTimes[book.id]
                      ? `Next Return Time: ${formatDate(returnTimes[book.id])}`
                      : ""
                    : `Available Quantity: ${ book.quantity - (approvedCounts[book.id] || 0)}`
                      }
                </p>
               {/* <details>
                <summary>Give rating</summary>
                <p><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/></p>
               </details> */}
               {/* <p>Average Rating:
               <i className="fas fa-star" /> {average[book.id] ? `${average[book.id].toFixed(1)}/5` : "Waiting for rating"}
               </p> */}

               <p>
 
  {average[book.id] ? (
    <>
    Average Rating:
    {new Array(5).fill().map((_, index) => (
  <i
    key={index}
    className={`fas fa-star ${index < Math.round(average[book.id]) ? "star-filled" : "star-empty"}`}
  />
))}
    </>
  ) :""}
</p>
                <div className="book-buttons">
                  {
                    book.quantity - (approvedCounts[book.id] || 0) > 0 && (
                      <button style={applybutton} onClick={() => handleApplyClick(book.id, book.title)} >
                        Apply
                      </button>
                    )}
                </div>
               
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
const searchBarStyle = {
  padding: "10px",
  marginLeft: "220px",
  width: "60%",
  borderRadius: "4px",
  border: "2px dashed #8789",
};
const searchinnerStyle = {
  padding: "10px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #ccc",
};
const sortButtonStyle = {
  padding: "8px 16px",
  background: "#0066cc",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
const bookListStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  padding: "20px",
};
const bookCardStyle = {
  background: "#f9f9f9",
  borderRadius: "8px",
  padding: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

const bookImageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px",
};

const bookDetailsStyle = {
  padding: "10px 0",
};

const bookTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
};

const bookAuthorStyle = {
  fontSize: "16px",
  fontStyle: "italic",
  color: "#777",
};

const bookPriceStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#0066cc",
  marginBottom: "5px",
};

const bookCategoryStyle = {
  fontSize: "16px",
};
const applybutton = {
  background: "#f0c14b",
  borderRadius:"10px",
 paddingLeft: "20px",
 paddingRight:"20px",
  };
export default Dashboard;
 

  




