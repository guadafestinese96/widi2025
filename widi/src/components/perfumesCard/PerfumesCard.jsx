import { AddShoppingCartRounded, CheckRounded } from "@mui/icons-material";
import "./PerfumesCard.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function PerfumesCard({ perfume }) {
  const { cart, addToCart } = useContext(CartContext);
    const isItemInCart = cart.find(item=> item.id === perfume.id)

  return (
    <div className="cardContainer">
      <img src={`src/assets/${perfume.img}`} alt="imgCard" />
      <h3>{perfume.marca}</h3>
      <h4>{perfume.nombre}</h4>
      <p>${perfume.precio}</p>
      {isItemInCart ? (<CheckRounded/>) : ( 
        <button className="addToCart" onClick={() => addToCart(perfume)}>
      <AddShoppingCartRounded />
      </button>
      )}
      
    </div>
  );
}
