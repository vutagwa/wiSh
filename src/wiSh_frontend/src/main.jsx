import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WishCoinsProvider } from './components/pages/WishCoinsContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WishCoinsProvider>
      <App />
    </WishCoinsProvider>
  </React.StrictMode>,
);
