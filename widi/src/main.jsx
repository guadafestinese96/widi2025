import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
//StateProvider initialState={initialState} reducer={reducer}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="app">
      <App />
    </div>
    
  </StrictMode>,
)
