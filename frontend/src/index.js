import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css'
import './config/i18n'; // Import i18n configuration
import Problems from 'pages/test';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <App/>
  </React.StrictMode>
);

