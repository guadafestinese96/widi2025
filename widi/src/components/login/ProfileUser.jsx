import { useAuth0 } from "@auth0/auth0-react"

export default function ProfileUser(){
    const {user, isAutenticated, isLoading} = useAuth0();

    if(isLoading) return <p>Cargando...</p>
    return(
        isAutenticated && (
            <div>
                <h2>Bienvenido {user.name}</h2>
                <img src={user.picture} alt="userPicture" />
                <p>Email: {user.email}</p>
            </div>
        )
    )
}