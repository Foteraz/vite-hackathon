// src/api.ts
export const fetchConversations = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3030/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  };
  