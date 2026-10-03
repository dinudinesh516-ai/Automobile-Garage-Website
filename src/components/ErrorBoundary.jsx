import { Component } from 'react';
import { business } from '../data/business';

/**
 * ErrorBoundary — catches render errors in a subtree so one broken section
 * never blanks the whole page. Wrap each section individually (see App.jsx).
 * `fallback` = 'section' renders a compact notice; default is full-page.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Hook point for a logging service (Sentry, LogRocket, …)
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  handleRetry = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback === 'section') {
      return (
        <div className="container py-5 text-center text-steel" role="alert">
          <p className="mb-2">This section couldn't load.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={this.handleRetry}>
            Try again
          </button>
        </div>
      );
    }

    return (
      <div className="error-fallback" role="alert">
        <div>
          <h1 className="mb-3">Something went wrong.</h1>
          <p className="text-steel mb-4">
            Please refresh the page, or reach us directly on{' '}
            <a href={business.phoneHref}>{business.phone}</a>.
          </p>
          <button type="button" className="btn btn-brand" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
