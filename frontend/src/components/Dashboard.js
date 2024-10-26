
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Dashboard.css'; 

// Placeholder components
const Books = () => <h2>Maintain Books</h2>;
const Transactions = () => <h2>Maintain Transactions</h2>;
const Members = () => <h2>Maintain Members</h2>;

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
