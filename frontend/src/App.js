import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import MaintainBooks from './components/MaintainBooks';
import MaintainMembers from './components/MaintainMembers';
import MaintainTransactions from './components/MaintainTransactions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/books" element={<MaintainBooks />} />
        <Route path="/dashboard/members" element={<MaintainMembers />} />
        <Route path="/dashboard/transactions" element={<MaintainTransactions />} />

      </Routes>
    </Router>
  );
};

export default App;
