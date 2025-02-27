import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
//StateProvider initialState={initialState} reducer={reducer}
import { Auth0Provider } from "@auth0/auth0-react";


createRoot(document.getElementById("root")).render(
  <Auth0Provider
  domain="dev-7cmkqcbih4h2hfid.us.auth0.com"
  clientId="ydFRqL0ECs16TSeLwFmmScPSrVC97q3S"
  authorizationParams={{ redirect_uri: window.location.origin }}
>
    <StrictMode>
      <div className="app">
        <App />
      </div>
    </StrictMode>
    </Auth0Provider>
);


