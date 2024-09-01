import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainRouter from './App'; // Adjust the path if you have MainRouter in a different file
import { ThemeProvider } from '@material-tailwind/react';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <MainRouter />
    </ThemeProvider>
  </React.StrictMode>
);
