/**
 * @file main.jsx
 * @description Application entry point that initializes React and sets up routing.
 * This file is responsible for rendering the root App component within a BrowserRouter
 * to enable client-side routing throughout the application.
 */

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Initialize React application and render the root component
// BrowserRouter enables client-side routing using React Router
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
