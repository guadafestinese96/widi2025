import "./Header.css"

import SearchRounded from "@mui/icons-material";
import Person2Rounded from "@mui/icons-material";
import widiLogo from '../../../public/images/widiLogoRedondo.png'
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../login/LoginButton";
import ProfileUser from "../login/ProfileUser";
import Logout from "../login/Logout";

export default function Header() {
 
  const { search, setSearch } = useContext(SearchContext);
  const {isAuthenticated} = useAuth0();

  return (
    <div className="headerContainer">
       <NavLink to={"/"}>
        <img src={widiLogo} alt="logo" className="logo" />
      </NavLink> 
      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input
          type="text"
          placeholder="Buscar"
          className="inputSearch"
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        />
      </div>

      <div className="loginHeaderContainer">
        {isAuthenticated ? <ProfileUser/> :
        <div className="imgLoginHeaderContainer">
           <Person2Rounded className="imgLoginHeader" /> 
           </div>}
          
       
        {isAuthenticated ? <Logout/> :<LoginButton/> }
        
      </div>

  

      
    </div>
  );
}
