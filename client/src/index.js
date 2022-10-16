import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios";
import './App.css';
 
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />}/>
      </Routes>
    </Router>
  </React.StrictMode>,
  
);
