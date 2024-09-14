import React, { useState } from 'react';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import logo from '../../logo.svg';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false); // Add state for register popup

  const handleLogInClick = () => {
    setShowLoginPopup(true);
    setToggleMenu(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterPopup(true);
    setToggleMenu(false);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleCloseRegisterPopup = () => {
    setShowRegisterPopup(false);
  };
  return (
    <div className="emllc__navbar">
      <div className="emllc__navbar-links">
        <div className="emllc__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="emllc__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#emllc">Create Commission Plan</a></p>
        </div>
      </div>
      <div className="emllc__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="emllc__navbar-menu_container scale-up-center">
          <div className="emllc__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#emllc">Create Commission Plan</a></p>
          </div>
        </div>
        )}
      </div>
      <div className="emllc__navbar-sign">
        <div className="emllc__navbar-sign-buttons">
          <button type="button" onClick={handleLogInClick}>Log In</button>
          <button type="button" onClick={handleRegisterClick}>Register</button>
        </div>
      </div>
      {showLoginPopup && <LoginPopup onClose={handleCloseLoginPopup} />}
      {showRegisterPopup && <RegisterPopup onClose={handleCloseRegisterPopup} />}
    </div>
  );
};

export default Navbar;
