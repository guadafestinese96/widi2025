import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";
import Logout from "./Logout";

export default function ProfileUser() {
  const { user } = useAuth0();

  return (
    <div className="divUser">
      <img src={user.picture} alt={user.name}/>
      {/* <h2>{user.name}</h2>   
      <p>{user.email}</p> */}
    </div>
  );
}
