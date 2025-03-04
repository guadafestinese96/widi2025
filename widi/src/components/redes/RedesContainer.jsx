import { NavLink } from "react-router-dom";
import { Instagram, WhatsApp } from "@mui/icons-material";
import styled from "styled-components";
import { useContext } from "react";
import CartContext from "../context/CartContext";

const RedesContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  padding: 8px 25px 8px 25px;
  bottom: 0;
  position: fixed;
  background-color: var(--colorSecundario);
  border-radius: 25px 25px 0 0;
`;
const IgWpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;
const IgWp = styled.div`
  background-color: var(--colorPrimario);
  border-radius: 5px;
  padding: 5px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  color: black;

  &:hover {
    color: var(--colorSecundario);
  }
`;
const IgWpP = styled.p`
  font-size: 12px;
  font-weight: bold;

  &:hover {
    color: var(--colorPrimario);
    transition: 0.5s;
  }
`;
export default function RedesContainer() {
  const phoneNumber = "5491161950112";
  const { cart } = useContext(CartContext);
  console.log(cart);
  
  const itemsWpCart = cart.map((item) => item.marca + " " + item.nombre).join(", ");
  
  console.log(itemsWpCart);

  const mensaje = encodeURIComponent(
    `Hola! Quiero comprar los perfumes ${itemsWpCart}`
  );
  console.log(mensaje);

  return (
    <RedesContainerDiv>
      <NavLink to="https://www.instagram.com/widistoreok__" target="_blank">
        <IgWpContainer>
          <IgWp>
            <Instagram />
          </IgWp>
          <IgWpP>@widistoreok__</IgWpP>
        </IgWpContainer>
      </NavLink>

      <NavLink
        to={`https://wa.me/${phoneNumber}?text=${mensaje}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IgWpContainer>
          <IgWp>
            <WhatsApp />
          </IgWp>
          <IgWpP>+549 1161950112</IgWpP>
        </IgWpContainer>
      </NavLink>
    </RedesContainerDiv>
  );
}
