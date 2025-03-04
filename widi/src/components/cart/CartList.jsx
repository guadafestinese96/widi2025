import CartItem from "./CartItem";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import "./Cart.css";
import { CheckRounded, DeleteForeverOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DestacadosH1 = styled.h1`
  font-size: 18px;
  text-align: center;
  color: var(--colorPrimario);
  margin-bottom: 20px;
`;

export default function CartList() {
  const { cart, formatNumber, clearCart, totalPrecioCarrito } =
    useContext(CartContext);

  const phoneNumber = "5491161950112";

  const itemsWpCart = cart.map((item) => item.quantity + " " + item.nombre).join(", ");

  const mensaje = encodeURIComponent(
    `Hola Widi Store! Quiero comprar los perfumes: ${itemsWpCart}`
  );


  return (
    <div className="cartListContainer">
      {cart.length > 0 ? (
        <div>
          <DestacadosH1>Carrito</DestacadosH1>
          {cart.map((perfume) => (
            <CartItem perfume={perfume} key={perfume.id} />
          ))}
          <div className="footerCarrito">
            <p>Total: $ {formatNumber(totalPrecioCarrito)} </p>
            <div className="buttonsFooterCart">
              <button onClick={() => clearCart()} className="btnBorrarCarrito">
                {" "}
                Borrar carrito <DeleteForeverOutlined />
              </button>
              <NavLink
                to={`https://wa.me/${phoneNumber}?text=${mensaje}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btnFinalizarCompra">
                  Finalizar compra <CheckRounded />
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div>No hay productos en el carrito</div>
      )}
    </div>
  );
}
