import React, { FC } from 'react';

function sidebarData(params:type) {
  function
}

interface SidebarProps {
  isOpen: boolean;
  topics: string[];
  currentTopic: string;
  toggleSidebar: () => void;
  handleNewChat: () => void;
  setCurrentTopic: (topic: string) => void;
}

const Sidebar: FC<SidebarProps> = ({
  isOpen,
  topics,
  currentTopic,
  toggleSidebar,
  handleNewChat,
  setCurrentTopic,
}) => {
  return (
    <div
      className={`${
        isOpen ? 'w-72' : 'w-20'
      } bg-medAqua text-white p-4 flex flex-col h-screen transition-all duration-300`}
    >
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="mb-4 text-white w-10 hover:bg-purple-600 p-2 rounded-full justify-center"
      >
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto">
        {isOpen && (
          <>
            <h2 className="text-lg font-semibold mb-4">Chats</h2>
            {/* Button container, not affected by overflow */}
            <div className="mb-4">
              <button
                onClick={handleNewChat}
                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
              >
                New Chat
              </button>
            </div>
            {/* Scrollable chat list */}
            <ul className="space-y-2">
              {topics.map((topic, index) => (
                <li
                  key={index}
                  className={`p-2 transparent cursor-pointer ${
                    currentTopic === topic ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                  onClick={() => setCurrentTopic(topic)}
                >
                  {topic}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Bottom Item - Always Visible */}
      <div className="p-4 bg-purple-600">
        <div className="flex items-center justify-center w-full h-12 bg-purple-600 text-white rounded-full shadow-md">
          <span className="text-lg font-semibold">New Item</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
