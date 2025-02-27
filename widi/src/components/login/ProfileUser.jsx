import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";
import Logout from "./Logout";
import { Person2Rounded } from "@mui/icons-material";

export default function ProfileUser() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="divUser">
      {isAuthenticated ? (
        <img src={user.picture} alt={user.name} />
      ) : (
        <Person2Rounded />
      )}
    </div>
  );
}
