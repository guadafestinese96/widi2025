import "./Header.css"

import {SearchRounded }from "@mui/icons-material";
import widiLogo from '../../../public/images/widiLogoRedondo.png'
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";


export default function Header() {
 
  const { search, setSearch } = useContext(SearchContext);


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
       
  
        
      </div>

  

      
    </div>
  );
}
