import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import

import App from './App';
import './index.css';

// Use the new createRoot API to mount your app
const container = document.getElementById('root');
const root = createRoot(container); // Create a root.
root.render(<App />); // Initial render
