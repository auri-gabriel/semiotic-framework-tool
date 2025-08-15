import React from 'react';

const SectionTitle = ({ title, className = '' }) => {
  return (
    <div className={`d-flex align-items-center mb-4 ${className}`}>
      <div
        className='bg-primary'
        style={{ width: '4px', height: '48px' }}
      ></div>
      <h2 className='ms-3 mb-0'>{title}</h2>
    </div>
  );
};

export default SectionTitle;
