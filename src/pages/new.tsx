import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null; // You can return null or a loading spinner if needed
};

export default NewPage;