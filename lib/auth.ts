// utils/auth.js

export const authenticateUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3030/auth/login', {  // adjust port as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token); // Store the token in localStorage
        return data.token;
      } else {
        console.error('Authentication failed:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return null;
    }
  };
  