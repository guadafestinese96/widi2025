import { useEffect, useState } from "react";
import CartContext from "./CartContext";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(cart);

  const addToCart = (perfume) => {
    setCart(carritoAnterior=>{
        const productoEnElCarrito = carritoAnterior.find(item=> item.id === perfume.id)
        if(productoEnElCarrito){
            return carritoAnterior.map(item=> item.id === perfume.id ? {...item, quantity: item.quantity +1} : item)
        }else{
            return [...carritoAnterior, {...perfume, quantity: 1}]
        }
    })
}
  

  const removeFromCart = (item) => {
    const newCart = cart.filter(
      (itemBuscado) => itemBuscado.id != item.id
    );
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider
      value={{ cart, removeFromCart, clearCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
