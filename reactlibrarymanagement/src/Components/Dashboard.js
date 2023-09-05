import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [approvedCounts, setApprovedCounts] = useState({});
  const [returnTimes, setReturnTimes] = useState({});
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null);
  const [selectauthor, setSelectedauthor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks();
    fetchOrdersAndCalculateCounts();
    filterBooks();
  }, [searchQuery, books]);
  
  const fetchOrdersAndCalculateCounts = async () => {
    try {
      const response = await axios.get("https://localhost:7247/api/Orders");
      const ordersData = response.data;

      const calculatedApprovedCounts = {};
      const calculatedReturnTimes = {};

      ordersData.forEach((order) => {
        if (order.isApproved) {
          const bookId = order.bookId;
          calculatedApprovedCounts[bookId] =(calculatedApprovedCounts[bookId] || 0) + 1;

          if (
            !calculatedReturnTimes[bookId] ||
            order.retrunOn < calculatedReturnTimes[bookId]
          ) {
            calculatedReturnTimes[bookId] = order.retrunOn;
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

  const handleApplyClick = (bookId, bookTitle, author) => {
    setSelectedBookId(bookId);
    setSelectedBookTitle(bookTitle);
    setSelectedauthor(author);
    navigate(`/OrderForm`, { state: { bookId, bookTitle } });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterBooks = () => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase().trim();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseSearchQuery) ||
        book.author.toLowerCase().includes(lowerCaseSearchQuery)
    );
    setFilteredBooks(filtered);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="dashboard-container">
      <div style={searchBarStyle}>
        <input
          type="text"
          placeholder="Search by book title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          style={searchinnerStyle}
        />
      </div>
      <div style={bookListStyle}>
        {filteredBooks.length === 0 ? (
          <p className="text-danger center">No results found</p>
        ) : (
          filteredBooks.map((book) => (
            <div key={book.id} style={bookCardStyle}>
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                style={bookImageStyle}
              />
              <div style={bookDetailsStyle}>
                <p style={bookTitleStyle}>
                  Name
                  <i class="fas fa-book" />:{book.title}
                </p>
                <p style={bookAuthorStyle}>by {book.author}</p>
                <p style={bookPriceStyle}>Price: ₹{book.price}</p>
                <p style={bookCategoryStyle}>Category: {book.category}</p>

                <p style={bookCategoryStyle}>
                  {book.quantity - (approvedCounts[book.id] || 0) === 0|| book.quantity - (approvedCounts[book.id] || 0) < 0
                    ? returnTimes[book.id]
                      ? `Next Return Time: ${formatDate(returnTimes[book.id])}`
                      : ""
                    : `Available Quantity: ${ book.quantity - (approvedCounts[book.id] || 0)}`
                      }
                </p>
                <div className="book-buttons">
                  {isLoggedIn &&
                    book.quantity - (approvedCounts[book.id] || 0) > 0 && (
                      <button
                        onClick={() => handleApplyClick(book.id, book.title)}
                      >
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

export default Dashboard;
