import React from 'react';

function Contact() {
  const contactContainer = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const headingStyle = {
    borderBottom: '2px solid #333',
    paddingBottom: '5px',
    marginBottom: '20px',
  };

  const listItemStyle = {
    marginBottom: '10px',
  };

  return (
    <div style={contactContainer}>
      <h2 style={headingStyle}>Contact Us</h2>
      <p>
        Welcome to our Online Library! We are delighted to provide you with 24/7 access to our vast collection of books
        and resources. If you have any questions, feedback, or suggestions regarding our Library Management System,
        we'd love to hear from you. Please feel free to reach out to our support team using the contact information
        provided below.
      </p>
      <h3 style={headingStyle}>Contact Information</h3>
      <ul>
        <li style={listItemStyle}><strong>Email:</strong> contact@examplelibrary.com</li>
        <li style={listItemStyle}><strong>Phone:</strong> +91 7649992721</li>
        <li style={listItemStyle}><strong>Address:</strong> Pta krr rhe hai hum bi</li>
      </ul>
      <h3 style={headingStyle}>Customer Support</h3>
      <p>
        Our customer support team is available 24/7 to assist you with any inquiries or technical support related to our
        online library services. We are committed to providing you with a seamless and enjoyable experience as you explore
        and utilize our digital resources.
      </p>
      <h3 style={headingStyle}>Happy Reading!</h3>
      <p>
        We hope you have a wonderful experience exploring our Online Library and find valuable resources that enrich your
        reading journey. If you encounter any issues or have any suggestions to improve our services, please do not hesitate
        to contact us. Your feedback is crucial to us as we continue to enhance and expand our library offerings.
      </p>
    </div>
  );
}

export default Contact;
