import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/chat'; // Adjust the path as necessary
import NewPage from './pages/new';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/c/:conversationId" element={<Chat />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
};

export default MainRouter;

