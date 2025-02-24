import {
  AddRounded,
  DeleteForeverRounded,
  RemoveRounded,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import "./Cart.css";

export default function CartItem({ perfume }) {
  const { removeFromCart } = useContext(CartContext);
  
  return (
    <div className="cartItemContainer">
      <img src={`/images/${perfume.img}`} alt="imgItem" />

      <div className="cartItemDetails">

        <div className="cartNombrePrecio">
          <h2>{perfume.nombre}</h2>
          <p className="itemPriceValue">$ {perfume.precio}</p>
        </div>
        <div className="cartItemButtons">
            <RemoveRounded />
            <p className="quantity">{perfume.quantity}</p>
            <AddRounded />
            <DeleteForeverRounded onClick={() => removeFromCart(perfume)} />
          </div>
        
      </div>
    </div>
  );
}
