import React from 'react';
import emllcLogo from '../../logo.svg';
import './footer.css';

const Footer = () => (
  <div className="emllc__footer">

    <div className="emllc__footer-links">
      <div className="emllc__footer-links_logo">
        <img src={emllcLogo} alt="emllc_logo" />
        <p>Austin, Texas<br /> All Rights Reserved</p>
      </div>
      <div className="emllc__footer-links_div">
        <h4>Links</h4>
        <p>Social Media</p>
        <p>Contact</p>
      </div>
      <div className="emllc__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="emllc__footer-links_div">
        <h4>Get in touch</h4>
        <p>Address Example</p>
        <p>123-456-6789</p>
        <p>email@gmail.com</p>
      </div>
    </div>

    <div className="emllc__footer-copyright">
      <p>@2024 EMLLC. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
