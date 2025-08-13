import React from 'react';

const LoadingSpinner = ({
  size = 'md',
  text,
  overlay = false,
  className = '',
  variant = 'primary',
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  };

  const spinnerContent = (
    <div
      className={`d-flex flex-column align-items-center justify-content-center ${className}`}
    >
      <div
        className={`spinner-border text-${variant} ${sizeClasses[size]} mb-3`}
        role='status'
        style={{
          width: size === 'lg' ? '3rem' : undefined,
          height: size === 'lg' ? '3rem' : undefined,
        }}
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
      {text && (
        <div
          className={`fw-semibold text-${
            variant === 'light' ? 'light' : 'secondary'
          } fade-in-delay`}
        >
          {text}
        </div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div
        className='position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center fade-in'
        style={{
          background: 'rgba(0,0,0,0.6)',
          zIndex: 2000,
          pointerEvents: 'all',
        }}
      >
        <div className='bg-white shadow-lg rounded p-5 d-flex flex-column align-items-center'>
          <div
            className={`spinner-border text-${variant} ${sizeClasses[size]} mb-3`}
            role='status'
          >
            <span className='visually-hidden'>Loading...</span>
          </div>
          {text && <div className='fw-semibold text-secondary'>{text}</div>}
        </div>
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;
