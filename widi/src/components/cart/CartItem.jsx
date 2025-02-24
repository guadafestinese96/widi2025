import {
  AddRounded,
  DeleteForeverRounded,
  RemoveRounded,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import "./Cart.css";

export default function CartItem({ perfume }) {
  const { removeFromCart, incrementQuantity, decrementQuantity, formatNumber } =
    useContext(CartContext);

  return (
    <div className="cartItemContainer">
      <img src={`/images/${perfume.img}`} alt="imgItem" />

      <div className="cartItemDetails">
        <div className="cartNombrePrecio">
          <h2>{perfume.nombre}</h2>
          <p className="itemPriceValue">$ {formatNumber(perfume.precio)}</p>
        </div>

        <div className="cartItemButtons">
          <button
            onClick={() => decrementQuantity(perfume.id)}
            disabled={perfume.quantity === 1}
            className="btnDecrement"
          >
            <RemoveRounded />
          </button>

          <p className="quantity">{perfume.quantity}</p>
          <button
            onClick={() => incrementQuantity(perfume.id)}
            className="btnIncrement"
          >
            <AddRounded />
          </button>

          <button
            onClick={() => removeFromCart(perfume)}
            className="btnRemoveCart"
          >
            <DeleteForeverRounded />
          </button>
        </div>
      </div>
    </div>
  );
}
