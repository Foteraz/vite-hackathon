import React, { FC, useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [conversations, setConversations] = useState<{ id: string; name: string; updatedAt: string }[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchConversations(storedToken);
    } else {
      setToken(null);
    }
  }, [isOpen]);

  const fetchConversations = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3030/model/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (data.success) {
        setConversations(JSON.parse(data.conversations));
      } else {
        console.error('Failed to fetch conversations');
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/new');
  };

  const handleConversationClick = (id: string) => {
    navigate(`/c/${id}`);
  };

  const handleNewChat = () => {
    navigate('/new');
  };

  const truncateName = (name: string) => {
    const words = name.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return name;
  };

  return (
    <div
      className={`${
        isOpen ? 'w-72' : 'w-20'
      } bg-medAqua text-white p-4 flex flex-col h-screen transition-all duration-300`}
    >
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="flex text-white w-10 h-10 hover:bg-purple-600 rounded-full justify-center items-center"
      >
        <Bars3Icon className="h-8 w-8 text-white" />
      </button>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto">
        {isOpen && (
          <>
            {/* Button container */}
            <div className="my-4">
              <button
                onClick={handleNewChat}
                className="bg-amber-600 text-stone-300 w-full py-2 rounded hover:bg-amber-400"
              >
                New Chat
              </button>
            </div>
            <h2 className="text-lg bg-a font-semibold mt-4">Recent</h2>
            {/* Display conversations */}
            {conversations.length > 0 ? (
              conversations.map(conv => (
                <div
                  key={conv.id}
                  className="p-2 bg-amber-600 rounded mb-2 cursor-pointer hover:bg-amber-500"
                  onClick={() => handleConversationClick(conv.id)}
                >
                  <p className="font-semibold">{truncateName(conv.name)}</p>
                  <p className="text-sm text-gray-600">Updated: {new Date(conv.updatedAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No conversations available</p>
            )}
          </>
        )}
      </div>

      {/* Bottom Item - Conditional Display */}
      <div className="p-4 transparent border-t-4 border-purple-600">
        {isOpen && (
          <div className="flex items-center justify-center w-full h-12 text-white rounded-full shadow-md">
            {token ? (
              <button
                onClick={handleSignOut}
                className="text-lg font-semibold bg-red-600 hover:bg-red-700 p-2 rounded"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="text-lg font-semibold bg-blue-600 hover:bg-blue-700 p-2 rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="text-lg font-semibold bg-green-600 hover:bg-green-700 p-2 rounded"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
