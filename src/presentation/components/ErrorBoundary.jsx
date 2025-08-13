import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-vh-100 d-flex align-items-center justify-content-center bg-light'>
          <div className='text-center'>
            <div className='mb-4'>
              <i
                className='bi bi-exclamation-triangle-fill text-warning'
                style={{ fontSize: '4rem' }}
              ></i>
            </div>
            <h2 className='text-dark mb-3'>Something went wrong</h2>
            <p className='text-muted mb-4'>
              We're sorry, but something unexpected happened. Please refresh the
              page to try again.
            </p>
            <button
              className='btn btn-primary'
              onClick={() => window.location.reload()}
            >
              <i className='bi bi-arrow-clockwise me-2'></i>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
