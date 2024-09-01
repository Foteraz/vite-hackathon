import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-tailwind/react';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogin = () => {
    // Logic for login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic for logout (e.g., remove token from localStorage)
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">
        <Link to="/">MyApp</Link>
      </div>
      <div className="flex items-center">
        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="mr-4 text-blue-400">Sign Up</Link>
            <button onClick={handleLogin} className="bg-blue-500 px-4 py-2 rounded">
              Log In
            </button>
          </>
        ) : (
          <div className="relative">
            <Avatar 
              src="/path/to/avatar.png" 
              alt="User Avatar" 
              onClick={() => setShowMenu(!showMenu)} 
              className="cursor-pointer"
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-2">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

