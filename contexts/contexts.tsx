import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface ChatContextProps {
  latestMessage: string;
  setLatestMessage: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with default values
export const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [latestMessage, setLatestMessage] = useState<string>('Default Name');

  return (
    <ChatContext.Provider value={{ latestMessage, setLatestMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
