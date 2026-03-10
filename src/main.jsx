/*
 * Copyright (c) 2025 GEInfoEdu
 * SPDX-License-Identifier: GPL-3.0-only
 * Author: Auri Gabriel Castro de Melo
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './presentation/scss/main.scss';
import 'flag-icons/css/flag-icons.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './presentation/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
