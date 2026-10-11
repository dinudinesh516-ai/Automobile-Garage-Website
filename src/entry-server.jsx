import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

/**
 * Build-time render of the whole page to HTML (used by scripts/prerender.mjs).
 * Search engines and link previews (WhatsApp, Facebook) then see the full
 * content without running JavaScript. The tree must match main.jsx exactly.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}
