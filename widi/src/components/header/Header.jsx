import {
  BarChart,
  SearchRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import "./Header.css";
import widiLogo from "../../assets/widiLogoRedondo.png";
import { NavLink } from "react-router-dom";
import { useContext, useId, useState } from "react";
import CartContext from "../context/CartContext";
import CartItem from "../cart/CartItem";
import SearchContext from "../context/SearchContext";

export default function Header() {
  const { cart, clearCart } = useContext(CartContext);
  const checkCartId = useId();
  const {search, setSearch} = useContext(SearchContext);


  return (
    <div className="headerContainer">
      <NavLink to={"/"}>
        <img src={widiLogo} alt="logo" className="logo" />
      </NavLink>
      <div className="inputBox">
        <SearchRounded className="searchIcon" />
        <input type="text" placeholder="Search" className="inputSearch" onChange={(e)=>{
            setSearch(e.target.value)
            console.log(search)
        }}/>
      </div>


      {/* <div className="profileContainer">
        <div className="imgBox">
          <img src={widiLogo} alt="imgProfile" className="profileImg" />
        </div>
        <h2 className="userName">Guada</h2>
      </div>

      <div className="toggleMenu">
        <BarChart className="toggleIcon" />
      </div> */}

      <label htmlFor={checkCartId} className="labelCart">
        <div className="shoppingCart">
          <ShoppingCartRounded className="cartIcon" />
          {cart.length>0 && (
            <div className="cartContent">
            <p className="pContent">{cart.length}</p>
          </div>
          )}
          
        </div>
      </label>
      <input type="checkbox" id={checkCartId} hidden />

      <div className="cartDropdown">
        {cart.map((perfume) => (
          <CartItem perfume={perfume} key={perfume.id}/>
        ))}
        {cart.length>0 ? (<button onClick={() => clearCart()}>Borrar carrito</button>) : (<div>No hay productos en el carrito</div>)}
          
      </div>
    </div>
  );
}
