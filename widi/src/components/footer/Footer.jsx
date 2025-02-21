import {
  Chat,
  Favorite,
  HomeRounded,
  Settings,
  ShoppingCartRounded,
  EmailRounded,
} from "@mui/icons-material";
import IconsFooterContainer from "./IconsFooterContainer";
import "./Footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bottomMenu">
      <ul className="ulBottomMenu" id="menu">
        <IconsFooterContainer link={"/"} icon={<HomeRounded />} />
        <IconsFooterContainer link={"#"} icon={<Chat />} />
        <IconsFooterContainer link={"#"} icon={<ShoppingCartRounded />} />
        <IconsFooterContainer link={"#"} icon={<Favorite />} />
        <IconsFooterContainer link={"/contact"} icon={<EmailRounded />} />
        <IconsFooterContainer link={"#"} icon={<Settings />} />

        <div className="indicator"></div>
      </ul>
    </div>
  );
}
