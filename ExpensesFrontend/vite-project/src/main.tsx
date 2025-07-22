import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
//import Landing from './Landing'

createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <App/>
  </StrictMode>
)
