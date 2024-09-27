import { FormLabel } from '@mui/material';
import React from 'react';

const LoginPopup = ({ onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your login form submission logic goes here
  };

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <input type="password" id="password" name="password" />
          </div>
          <div className="button-container">
            <button type="submit">Login</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
