import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MaintainBooks.css';

const MaintainBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [stock, setStock] = useState('');

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (title && author && stock > 0) {
      const newBook = { title, author, stock: parseInt(stock, 10) };
      try {
        const response = await axios.post('http://localhost:5000/books', newBook);
        setBooks([...books, response.data]);
        clearInputs();
      } catch (error) {
        console.error('Error adding book', error);
      }
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  const handleUpdateStock = async (id, newStock) => {
    if (newStock >= 0) {
      try {
        const response = await axios.put(`http://localhost:5000/books/${id}`, { stock: newStock });
        setBooks(books.map(book => (book._id === id ? response.data : book)));
      } catch (error) {
        console.error('Error updating stock', error);
      }
    }
  };

  const clearInputs = () => {
    setTitle('');
    setAuthor('');
    setStock('');
  };

  return (
    <div className="maintain-books-container">
      <h2>Maintain Books</h2>
      <form onSubmit={handleAddBook} className="add-book-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required min="1" />
        </div>
        <button type="submit" className="btn">Add Book</button>
      </form>

      <div className="books-list">
        <h3>Book Inventory</h3>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book._id} className="book-item">
                <div className="book-details">
                  <span>{book.title} by {book.author}</span>
                  <span>Stock: 
                    <input 
                      type="number" 
                      value={book.stock} 
                      min="0"
                      onChange={(e) => handleUpdateStock(book._id, parseInt(e.target.value, 10))}
                    />
                  </span>
                  <button 
                    onClick={() => handleDeleteBook(book._id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books in inventory</p>
        )}
      </div>
    </div>
  );
};

export default MaintainBooks;
