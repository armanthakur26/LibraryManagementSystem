import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Book() {
  const [books, setBooks] = useState([]);
  const [editBookId, setEditBookId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    author: '',
    price: '',
    ordered: false,
    category: '',
    available: false,
    image: null,
    quantity: '',
  });
  const [addForm, setAddForm] = useState({
    title: '',
    author: '',
    price: '',
    ordered: false,
    category: '',
    available: false,
    image: null,
    quantity: '',
  });

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      const response = await axios.get('https://localhost:7247/api/Books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`https://localhost:7247/api/Books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = (book) => {
    setEditBookId(book.id);
    setEditForm(book);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditForm({ ...editForm, [name]: value });
  };
const imagestyleshow={
  width: '100%',
  height: '200px',
  objectFit: 'cover',
   borderRadius: '8px',
}
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditForm({ ...editForm, image: reader.result });
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7247/api/Books`, editForm);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === editBookId ? editForm : book))
      );
      setEditBookId(null);
      setEditForm({
        title: '',
        author: '',
        price: '',
        ordered: false,
        category: '',
        available: false,
        image: null,
        quantity: '',
      });
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://localhost:7247/api/Books', addForm);
      getAllBooks();
      setAddForm({
        title: '',
        author: '',
        price: '',
        ordered: false,
        category: '',
        available: false,
        image: null,
        quantity: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setAddForm({ ...addForm, [name]: value });
  };

  //FileReader to read the binary data of an image and convert it into a Base64-encoded
  // string to embed it in a Data URL for displaying images in your web page.
  const handleAddImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAddForm({ ...addForm, image: reader.result });
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div>
      <h2 className="text-center my-4"><i className='fas fa-book' /> Add Book</h2>

      <div className="card mb-4" style={{width:'50%',marginLeft:'27%'}}>
        <div className="card-header">Add Book</div>
        <div className="card-body">
          <form onSubmit={handleAddSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={addForm.title}
                onChange={handleAddInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={addForm.author}
              onChange={handleAddInputChange}
              className="form-control"
        
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={addForm.price}
              onChange={handleAddInputChange}
              className="form-control"
             
            />
          </div>
          <div className="form-group">
            <label >Category ID</label>
            <input
              type="text"
              name="category"
              value={addForm.category}
              onChange={handleAddInputChange}
              className="form-control"
             
            />
          </div>
          <div className="form-group">
            <label > Quantity :</label>
            <input
              type="text"
              name="quantity"
              value={addForm.quantity}
              onChange={handleAddInputChange}
              className="form-control"
              
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleAddImageChange}
              className="form-control-file"
             
            />
          </div>
          {addForm.image && (
            <img
              src={addForm.image}
              alt={`Cover of ${addForm.title}`}
              className="img-thumbnail mb-2"
              style={{ maxWidth: '200px' }}
            />
          )}
           
            <button type="submit" className="btn btn-primary mr-2">
              Add Book
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                className="card-img-top"
                src={book.image}
                alt={`Cover of ${book.title}`}
                style={imagestyleshow}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Price: ${book.price}</p>
         <p className="card-text">Category: {book.category}</p>
              <p className="card-text">Quantity: {book.quantity}</p>
                {editBookId === book.id ? (
                <form onSubmit={handleEditSubmit}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label> Author</label>
                    <input
                      type="text"
                      name="Author"
                      value={editForm.author}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label> Price</label>
                    <input
                      type="Number"
                      name="price"
                      value={editForm.price}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label> Category</label>
                    <input
                      type="text"
                      name="Author"
                      value={editForm.category}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label> Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      value={editForm.quantity}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                       <label>Image</label>
                       <input
                    type="file"
                         name="image"
                         onChange={handleImageChange}
                         className="form-control-file"
                       />
                     </div>
                     {editForm.image && (
                       <img
                         src={editForm.image}
                         alt={`Cover of ${editForm.title}`}
                         className="img-thumbnail mb-2"
                       />
                     )}
                
                  <button type="submit" className="btn btn-primary mr-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditBookId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                 
                  <div className="text-center">
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="btn btn-danger mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(book)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);}



export default Book;
