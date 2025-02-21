import CartItem from "../cart/CartItem";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import './Header.css'

export default function CartList() {
  const { cart } = useContext(CartContext);
  console.log(cart.length);
  console.log(cart);

  return (
    <div className="cartListContainer">
      {cart.map((perfume) => ( 
          <CartItem perfume={perfume} />
      ))}
    </div>
  );
}
