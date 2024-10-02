import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { APIProvider } from "@vis.gl/react-google-maps";
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <APIProvider apiKey="AIzaSyDu8mqAzl88lu18Vlrb51GeyFl3zh92NEg"> 
      <App />
    </APIProvider>
  </StrictMode>,
)
