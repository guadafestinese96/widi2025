import {
  BarChart,
  Login,
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
import Logout from "../login/Logout";
import LoginButton from "../login/Login";
import ProfileUser from "../login/ProfileUser";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { cart, clearCart, formatNumber, totalPrecioCarrito } = useContext(CartContext);
  const checkCartId = useId();
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

      {/* <div className="profileContainer">
        <div className="imgBox">
          <img src={widiLogo} alt="imgProfile" className="profileImg" />
        </div>
        <h2 className="userName">Guada</h2>
      </div>

      <div className="toggleMenu">
        <BarChart className="toggleIcon" />
      </div> */}
  <div>
    <LoginButton/>
    <ProfileUser/>
    <Logout/>
  </div>
      

      <label htmlFor={checkCartId} className="labelCart">
        <div className="shoppingCart">
          <ShoppingCartRounded className="cartIcon" />
          {cart.length > 0 && (
            <div className="cartContent">
              <p className="pContent">{cart.length}</p>
            </div>
          )}
        </div>
      </label>
      <input type="checkbox" id={checkCartId} hidden />

      <div className="cartDropdown">
        {cart.map((perfume) => (
          <CartItem perfume={perfume} key={perfume.id} />
        ))}
        {cart.length > 0 ? (
          <div className="footerCarrito">
            <p>Total: $ {formatNumber(totalPrecioCarrito)} </p>
            <button onClick={() => clearCart()} className="btnBorrarCarrito"> Borrar carrito</button>
            <button className="btnFinalizarCompra">Finalizar compra</button>
          </div>
        ) : (
          <div>No hay productos en el carrito</div>
        )}
      </div>
    </div>
  );
}
