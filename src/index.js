import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import App from './App.js';


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


import Navibar from './navibar.js';
const container = document.getElementById('App');
const root = createRoot(container);

root.render(
  <Router>
    <Navibar/>
    <App />
  </Router>
);
