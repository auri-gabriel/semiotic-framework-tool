import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './presentation/scss/main.scss';
import 'bootstrap/dist/js/bootstrap.js';
import App from './presentation/App.jsx';
import ErrorBoundary from './presentation/components/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
