import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './presentation/scss/main.scss';
import 'bootstrap/dist/js/bootstrap.js';
import App from './presentation/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
