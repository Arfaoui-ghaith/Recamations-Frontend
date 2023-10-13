import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import {Toaster} from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Toaster />
        <App />
  </React.StrictMode>
);
