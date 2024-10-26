import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MaintainTransactions.css';

const MaintainTransactions = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [book, setBook] = useState('');
  const [rent, setRent] = useState(0);

  // Fetch all members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members', error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (name) {
      try {
        const response = await axios.post('http://localhost:5000/members', { name });
        setMembers([...members, response.data]);
        setName('');
      } catch (error) {
        console.error('Error adding member', error);
      }
    }
  };

  const handleIssueBook = async (memberId) => {
    if (book) {
      try {
        const response = await axios.put(`http://localhost:5000/members/${memberId}/issue`, { book });
        setMembers(members.map(m => (m._id === memberId ? response.data : m)));
        setBook('');
      } catch (error) {
        console.error('Error issuing book', error);
      }
    }
  };

  const handleReturnBook = async (memberId, bookToReturn) => {
    if (rent > 0) {
      try {
        const response = await axios.put(`http://localhost:5000/members/${memberId}/return`, { book: bookToReturn, rent });
        setMembers(members.map(m => (m._id === memberId ? response.data : m)));
      } catch (error) {
        console.error('Error returning book', error);
      }
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`http://localhost:5000/members/${memberId}`);
      setMembers(members.filter(m => m._id !== memberId));
    } catch (error) {
      console.error('Error deleting member', error);
    }
  };

  return (
    <div className="maintain-transactions-container">
      <h2>Maintain Transactions</h2>
      <form onSubmit={handleAddMember} className="add-member-form">
        <div className="form-group">
          <label>Member Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Add Member</button>
      </form>

      <div className="members-list">
        <h3>Members List</h3>
        {members.length > 0 ? (
          <ul>
            {members.map((member) => (
              <li key={member._id} className="member-item">
                <div className="member-details">
                  <span>{member.name}</span>
                  <div>
                    <input type="text" value={book} onChange={(e) => setBook(e.target.value)} placeholder="Book Title" />
                    <button onClick={() => handleIssueBook(member._id)} className="issue-btn">Issue Book</button>
                    <button onClick={() => handleDeleteMember(member._id)} className="delete-btn">Delete</button>
                  </div>
                  <h4>Issued Books:</h4>
                  <ul>
                    {member.books.map((issuedBook, bookIndex) => (
                      <li key={bookIndex} className="issued-book">
                        {issuedBook}
                        <div>
                          <input type="number" value={rent} onChange={(e) => setRent(parseInt(e.target.value, 10))} placeholder="Rent Amount" min="0" />
                          <button onClick={() => handleReturnBook(member._id, issuedBook)} className="return-btn">Return</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p>Outstanding Debt: Rs. {member.debt}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members added</p>
        )}
      </div>
    </div>
  );
};

export default MaintainTransactions;
