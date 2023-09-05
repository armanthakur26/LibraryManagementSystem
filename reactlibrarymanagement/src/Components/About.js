import React from 'react';

function About() {
  const listItemStyle = {
    marginBottom: '10px',
  };

  const headingStyle = {
    borderBottom: '2px solid #333',
    paddingBottom: '5px',
  };

  return (
    <div>
      <h2 style={headingStyle} class="text-center">About Library Management System</h2>

      <h3 style={headingStyle}>Key Features</h3>
      <ul>
        <li style={listItemStyle}>
          <strong>Secure User Authentication and Role-based Access:</strong> Our system provides a secure authentication process, allowing librarians to access the admin panel with their credentials. Different roles are assigned to users, granting specific permissions based on their responsibilities within the library.
        </li>
        <li style={listItemStyle}>
          <strong>Book Management:</strong> Librarians can easily manage the library's collection, add new books, update existing information, and categorize books by genre, author, and other relevant attributes.
        </li>
        <li style={listItemStyle}>
          <strong>Book Issuance:</strong> Library members can request to borrow books, and each request undergoes an admin approval process before the issuance is confirmed.
        </li>
        <li style={listItemStyle}>
          <strong>Search and Filters:</strong> Users can quickly search for books using various filters such as title, author, and genre, making it effortless to find the desired books within the library's vast collection.
        </li>
      </ul>
      <h3 style={headingStyle}>Admin Approval Process</h3>
      <p>
        To maintain strict control over book issuance, our system incorporates an admin approval process. When a library member requests to borrow a book, the request is forwarded to the designated admin. The admin reviews the request and verifies the availability of the book.
      </p>
      <h3 style={headingStyle}>Conclusion</h3>
      <p>
        Our Library Management System is a comprehensive and efficient solution for libraries to manage their resources and offer seamless services to their members. The admin approval process adds an extra layer of control and accountability, ensuring that book issuances are managed effectively. We are committed to continuously improving and refining our system to meet the evolving needs of libraries and their users. Thank you for choosing our Library Management System. If you have any feedback or queries, please feel free to contact our support team.
      </p>
    </div>
  );
}

export default About;
