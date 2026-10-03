import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './styles/main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Top-level boundary: last line of defence for anything outside a section */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
