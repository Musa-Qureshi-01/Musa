import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/poppins";
import "@fontsource/outfit";
import './index.css'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
