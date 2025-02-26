import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "./LoginButton";
import ProfileUser from "./ProfileUser";

export default function CompleteUser(){
    const {user, isAutenticated, isLoading} = useAuth0();
    console.log(user)
    if(isLoading) return <p>Cargando...</p>
    
    return(
        isAutenticated ? <ProfileUser/> : <LoginButton/>
    )
}