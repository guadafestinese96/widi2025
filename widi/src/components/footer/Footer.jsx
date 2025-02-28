import {
  Chat,
  Favorite,
  HomeRounded,
  Settings,
  ShoppingCartRounded,
  EmailRounded,
  ArrowDropDownCircleRounded,
  Menu,
  MenuRounded,
} from "@mui/icons-material";
import IconsFooterContainer from "./IconsFooterContainer";
import "./Footer.css";
import perfumeIcon from "../../../public/images/perfumeIcon.png";
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function Footer() {
  const {cart} = useContext(CartContext)

  return (
    <div className="bottomMenu">
      <ul className="ulBottomMenu" id="menu">
        <IconsFooterContainer link={"/"} icon={<HomeRounded />} />
        <IconsFooterContainer link={"/vertodos"} icon={<MenuRounded />} />
        <IconsFooterContainer link={"/carrito"} icon={<ShoppingCartRounded className="cartIcon"/>} label={cart.length} />
        <IconsFooterContainer link={"/favoritos"} icon={<Favorite />} />
        <IconsFooterContainer link={"/contact"} icon={<EmailRounded />} />
   

        <div className="indicator"></div>
      </ul>
    </div>
  );
}

{
  /* <label htmlFor={checkCartId} className="labelCart">
        <div className="shoppingCart">
          <ShoppingCartRounded className="cartIcon" />
          {cart.length > 0 && (
            <div className="cartContent">
              <p className="pContent">{cart.length}</p>
            </div>
          )}
        </div>
      </label>
      <input type="checkbox" id={checkCartId} hidden /> */
}
