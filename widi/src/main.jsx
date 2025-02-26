import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
//StateProvider initialState={initialState} reducer={reducer}
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-7cmkqcbih4h2hfid.us.auth0.com";
const clientId = "ydFRqL0ECs16TSeLwFmmScPSrVC97q3S";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <div className="app">
        <App />
      </div>
    </Auth0Provider>
  </StrictMode>
);
