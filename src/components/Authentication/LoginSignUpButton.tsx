import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const LoginSignupButton: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false); // Ensure sign-up modal is closed
  };

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false); // Ensure login modal is closed
  };

  const handleCloseModals = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    handleCloseModals();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsDropdownOpen(false); // Close dropdown on sign out
  };

  return (
    <div className="absolute top-5 right-5 flex items-center space-x-4">
      {!isLoggedIn ? (
        <>
          <button 
            onClick={handleOpenSignupModal} 
            className="text-blue-500 hover:text-gray-500 transition duration-300"
          >
            Sign Up
          </button>
          <button 
            onClick={handleOpenLoginModal} 
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700"
          >
            {/* Anonymous photo or icon */}
            <span className="text-2xl">👤</span>
          </button>
        </>
      ) : (
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
          >
            {/* User's avatar or icon */}
            <span className="text-gray-700">A</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <button 
                onClick={handleLogout}
                className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}

      {isLoginModalOpen && (
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={handleCloseModals} 
          onLogin={handleLogin} 
        />
      )}

      {isSignupModalOpen && (
        <SignupModal 
          isOpen={isSignupModalOpen} 
          onClose={handleCloseModals} 
          onLogin={handleLogin} 
        />
      )}
    </div>
  );
};

export default LoginSignupButton;

