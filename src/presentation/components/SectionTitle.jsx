/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import React from 'react';

const SectionTitle = ({ title, className = 'text-dark' }) => {
  return (
    <div className={`d-flex align-items-center mb-4`}>
      <div
        className='border-start border-primary border-4 me-3'
        style={{ height: '3rem' }}
      ></div>
      <h2 className={`fw-bold mb-0 ${className}`}>{title}</h2>
    </div>
  );
};

export default SectionTitle;
