import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
//StateProvider initialState={initialState} reducer={reducer}
import { Auth0Provider } from '@auth0/auth0-react'

const domain = "dev-7cmkqcbih4h2hfid.us.auth0.com";
const clientId = "cfwZNVB17ijh5VbqlrkPZ9WLz3iclyPT";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="app">
      <Auth0Provider domain={domain} clientId={clientId}
          authorizationParams={{redirect_uri: window.location.origin}}>
      <App />
      </Auth0Provider>
    </div>
    
  </StrictMode>,
)
