import React, { useState } from 'react';
import { PromptForm } from './PromptForm';
import { ChatDisplay } from './chatDisplay';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');

  const refreshChatDisplay = () => {
    // This function could be used to refresh the chat display if needed
    // For example, to re-fetch the conversation data
  };

  return (
    <div className="chat-container">
      <ChatDisplay messages={messages} refresh={refreshChatDisplay} />
      <PromptForm
        input={input}
        setInput={setInput}
        messages={messages}
        setMessages={setMessages}
        refreshChatDisplay={refreshChatDisplay}
      />
    </div>
  );
};
