import { useAuth0 } from "@auth0/auth0-react"

export default function Logout(){
    const {logout} = useAuth0();
    return(
        <button className="btnLogin" onClick={()=>logout( {logoutParams: {returnTo: window.location.origin}})}>Cerrar Sesión</button>
    )
}