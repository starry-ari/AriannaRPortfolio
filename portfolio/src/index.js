// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Contact from './Contact';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

// Define routes
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/contact', element: <Contact /> },
]);

// Render once
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
