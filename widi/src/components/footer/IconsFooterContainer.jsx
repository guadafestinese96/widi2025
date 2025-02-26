import { NavLink } from "react-router-dom";
import "./Footer.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function IconsFooterContainer({ link, icon, label }) {
  const { cart } = useContext(CartContext);
  return (
    <li>
      <NavLink to={link}>
        <div className="divSpanIcon">
          <span className="spanIcon">{icon}</span>
          {cart.length>0 ? label && (
            <div className="labelIconContainer">
              <span className="labelIcon">{label}</span>
            </div>
          ): ""}
        </div>
      </NavLink>
    </li>
  );
}
