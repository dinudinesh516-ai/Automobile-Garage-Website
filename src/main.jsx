import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css'; // self-hosted font (width + weight axes)
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './styles/main.scss';

const app = (
  <StrictMode>
    {/* Top-level boundary: last line of defence for anything outside a section */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

const root = document.getElementById('root');

// Production HTML is pre-rendered at build time (scripts/prerender.mjs), so we
// hydrate it; in `npm run dev` the root is empty and we render from scratch.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
