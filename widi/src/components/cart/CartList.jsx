import CartItem from "./CartItem";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import './Cart.css'
import { CheckRounded, ClearAllRounded, DeleteForeverOutlined, DeleteForeverRounded, DeleteOutlineRounded } from "@mui/icons-material";

export default function CartList() {
  const { cart, formatNumber, clearCart, totalPrecioCarrito } = useContext(CartContext);
  console.log(cart.length);
  console.log(cart);

  return (
    <div className="cartListContainer">
      {cart.map((perfume) => ( 
          <CartItem perfume={perfume} key={perfume.id}/>
      ))}
      {cart.length > 0 ? (
          <div className="footerCarrito">
            <p>Total: $ {formatNumber(totalPrecioCarrito)} </p>
            <div className="buttonsFooterCart">
              <button onClick={() => clearCart()} className="btnBorrarCarrito">
              {" "}
              Borrar carrito <DeleteForeverOutlined/>
            </button>
            <button className="btnFinalizarCompra">Finalizar compra <CheckRounded/></button>
            </div>
            
          </div>
        ) : (
          <div>No hay productos en el carrito</div>
        )}
    </div>
  );
}
