import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';  // Tailwind CSS'i dahil ettiğimiz kısım

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
