import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/ToastProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStrip from './components/BrandStrip';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

/** Each section gets its own boundary so a failure stays contained. */
const Safe = ({ children }) => <ErrorBoundary fallback="section">{children}</ErrorBoundary>;

export default function App() {
  return (
    <ToastProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Safe><Navbar /></Safe>

      <main id="main">
        <Safe><Hero /></Safe>
        <Safe><BrandStrip /></Safe>
        <Safe><Services /></Safe>
        <Safe><About /></Safe>
        <Safe><Gallery /></Safe>
        <Safe><Reviews /></Safe>
        <Safe><Contact /></Safe>
      </main>

      <Safe><Footer /></Safe>
      <Safe><FloatingActions /></Safe>
    </ToastProvider>
  );
}
