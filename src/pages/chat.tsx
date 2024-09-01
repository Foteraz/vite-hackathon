import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@src/components/sidebar/Sidebar';
import ChatArea from '@src/components/chat/ChatArea';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const Chat: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [topics, setTopics] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>('New Chat');
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const chatDisplayRef = useRef<HTMLDivElement>(null);

  const refreshChatDisplay = () => {
    setRefresh(prev => !prev); // Toggle state to trigger refresh
  };


  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle starting a new chat
  const handleNewChat = () => {
    const newTopic = `Chat ${topics.length + 1}`;
    setTopics([...topics, newTopic]);
    setCurrentTopic(newTopic);
    setMessages([]); // Clear messages for a new chat
    setConversationId(null); // Reset conversation ID
    navigate('/new'); // Navigate to new chat route
  };

  // Effect to sync URL with conversationId
  useEffect(() => {
    const path = location.pathname.split('/');
    const id = path[path.length - 1];
    setConversationId(id === 'new' ? null : id);
  }, [location]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleNewChat={handleNewChat}
      />

      <div className="flex flex-col flex-grow w-full">

        {/* Chat Input Area */}
        <div className="bg-gray-200 p-4">
          <ChatArea
            input={input}
            setInput={setInput}
            messages={messages}
            setMessages={setMessages}
            conversationId={conversationId}
          />
        </div>
      </div>
    </div>
  );
};

const chartOptions: Highcharts.Options = {
  chart: {
    type: 'line', // You can change the chart type
  },
  title: {
    text: 'My Chart Title',
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  yAxis: {
    title: {
      text: 'Y Axis Title',
    },
  },
  series: [
    {
      name: 'Series 1',
      data: [1, 3, 2, 4, 6, 5, 7],
    },
  ],
};

// Create the ChartComponent within the same file
const ChartComponent: React.FC = () => {
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <div>
      <h1>My Highcharts Chart</h1>
      <ChartComponent />
    </div>
  );
};


export default Chat;


function setRefresh(arg0: (prev: any) => boolean) {
  throw new Error('Function not implemented.');
}

