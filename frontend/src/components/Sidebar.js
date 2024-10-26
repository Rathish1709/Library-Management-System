import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  // Sample book data 
  const [books] = useState([
    { name: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { name: '1984', author: 'George Orwell' },
    { name: 'Moby Dick', author: 'Herman Melville' },
    { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Handle search query input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter books based on search input
    const results = books.filter(book =>
      book.name.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  return (
    <div className="sidebar">
      <h3>Library Management</h3>
      
      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search by book or author" 
        value={searchQuery} 
        onChange={handleSearchChange}
        className="search-bar"
      />

      {/* Display search results */}
      {searchQuery && (
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((book, index) => (
                <li key={index} className="search-item">
                  <span>{book.name} by {book.author}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}

      <ul>
        <li>
          <Link to="/dashboard/books" className="sidebar-link">Maintain Books</Link>
        </li>
        <li>
          <Link to="/dashboard/transactions" className="sidebar-link">Maintain Transactions</Link>
        </li>
        <li>
          <Link to="/dashboard/members" className="sidebar-link">Maintain Members</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
