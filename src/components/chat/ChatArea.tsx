import React, { FC, useRef, useState, useEffect } from 'react';
import { ChatScrollButtons } from './ChatScrollButton'; // Adjust the path as necessary
import { PromptForm } from './PromptForm'; // Adjust the path as necessary
import { ChatDisplay } from './chatDisplay'; // Adjust the path as necessary

interface ChatAreaProps {
  input: string;
  setInput: (value: string) => void;
  messages: string[];
  setMessages: (messages: string[]) => void;
}

const ChatArea: FC<ChatAreaProps> = ({ input, setInput, messages, setMessages }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle scroll position
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setIsAtBottom(scrollTop + clientHeight === scrollHeight);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer?.addEventListener('scroll', handleScroll);

    return () => {
      chatContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-medAquaLight">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold">Chat Area</h1>
      </div>

      {/* Chat Display */}
      <div className="flex-grow overflow-auto" ref={chatContainerRef}>
        <ChatDisplay messages={messages} />
      </div>

      {/* Scroll Buttons */}
      <ChatScrollButtons
        isAtBottom={isAtBottom}
        scrollToBottom={() => chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' })}
      />

      {/* Prompt Form */}
      <div className=" bg-white border-t border-gray-300">
        <PromptForm
          input={input}
          setInput={setInput}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default ChatArea;
