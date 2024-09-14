import React from 'react';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="emllc__header section__padding" id="home">
    <div className="emllc__header-content">
      <h1 className="gradient__text">Let&apos;s Build A Competitive Sales Commission Plan</h1>
      <p>Design an AI-powered sales commission program that maximizes motivation, transparency, and fairness while ensuring alignment with company objectives and individual performance metrics. Consider factors such as customizable parameters to cater to diverse sales teams and business needs.</p>
    </div>

    <div className="emllc__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
