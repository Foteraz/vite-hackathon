import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import { ArrowUpIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '@material-tailwind/react';
import { useEnterSubmit } from '@lib/hooks/use-enter-submit';

export const PromptForm = ({
  input,
  setInput,
  messages,
  setMessages,
}: {
  input: string;
  setInput: (value: string) => void;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId: string }>(); // Get conversationId from URL

  // Retrieve the token from local storage
  const token = React.useMemo(() => localStorage.getItem('token'), []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const value = input.trim();
    setInput('');
    if (!value || !token) return; // Ensure input and token are present

    // Optimistically add user message to UI
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: '', // ID will be handled by the backend
        text: value,
      },
    ]);

    // Prepare request payload based on new or existing conversation
    const body = conversationId
      ? { conversationId, query: value, token } // Existing conversation
      : { query: value, token }; // New conversation
    try {
      const response = await fetch('http://localhost:3030/model/main', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      const responseMessage = await response.json();
      console.log(responseMessage)
      setMessages((currentMessages) => [...currentMessages, responseMessage]);

      // Update URL if it's a new conversation
      if (!conversationId && responseMessage.conversationId) {
        navigate(`/c/${responseMessage.conversationId}`); // Navigate to the new conversation URL
      }
    } catch (error) {
      console.error('Failed to submit message:', error);
    }
  };

  // Handle starting a new chat
  const handleNewChat = () => {
    setInput(''); // Clear input field
    setMessages([]); // Clear messages
    navigate('/new'); // Navigate to start a new conversation
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} onKeyDown={onKeyDown}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip content="New Chat">
          <button
            type="button"
            className="absolute left-0 top-4 p-0 rounded-full bg-background sm:left-4"
            onClick={handleNewChat}
          >
            <PlusIcon className="h-6 w-6 text-gray-500" />
            <span className="sr-only">New Chat</span>
          </button>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip content="Send message">
            <button type="submit" disabled={input.trim() === ''}>
              <ArrowUpIcon className="h-6 w-6 text-blue-500" />
              <span className="sr-only">Send message</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </form>
  );
};
