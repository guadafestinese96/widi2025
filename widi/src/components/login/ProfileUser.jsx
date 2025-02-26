import { useAuth0 } from "@auth0/auth0-react"
import './Login.css'

export default function ProfileUser(){
    const {user, isAutenticated, isLoading} = useAuth0();
    console.log(user)
    if(isLoading) return <p>Cargando...</p>

    return(
        isAutenticated && (
            <div className="divUser">
                <h2>Bienvenido {user.given_name}</h2>
                <img src={user.picture} alt="userPicture" />
                <p>Email: {user.email}</p>
            </div>
        )
    )
}