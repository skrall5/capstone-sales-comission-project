import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';

const RegisterPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="register-popup">
      <div className="register-popup-content">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <FormControl component="fieldset" className="role-label">
            <FormLabel component="legend">Select Role:</FormLabel>
            <RadioGroup aria-label="role" name="role" value={formData.role} onChange={handleChange}>
              <FormControlLabel value="sales_rep" control={<Radio />} label="Sales Representative" />
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>
          <div className="button-container">
            <button type="submit">Register</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;
