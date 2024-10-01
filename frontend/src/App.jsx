import React from 'react';

import { Navbar } from './Components';
import { Footer, Form, Header } from './containers';

import './App.css';
import './index.css'; /* added during polishing frontend to access root vars*/

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Form />
    <Footer />
  </div>
);

export default App;
