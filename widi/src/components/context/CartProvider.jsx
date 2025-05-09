import { useEffect, useState } from "react";
import CartContext from "./CartContext";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  const [favoritos, setFavoritos] = useState(
    localStorage.getItem("favoritos")
      ? JSON.parse(localStorage.getItem("favoritos"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [[cart], [favoritos]]);

  const addToFavoritos = (perfume) => {
    const itemInFavoritos =
      favoritos.length > 0 && favoritos.find((item) => item.id === perfume.id);

    if (itemInFavoritos) {
      return "";
    } else {
      setFavoritos([...favoritos, perfume]);
      
    }
  };

  const deleteFromFavoritos = (perfume) =>{
    const newFav = favoritos.filter(item => item.id != perfume.id)
    setFavoritos(newFav)
   
  }

  console.log(favoritos);

  const addToCart = (perfume) => {
    setCart((carritoAnterior) => {
      const productoEnElCarrito = carritoAnterior.find(
        (item) => item.id === perfume.id
      );
      if (productoEnElCarrito) {
        return carritoAnterior.map((item) =>
          item.id === perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...carritoAnterior, { ...perfume, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    const newCart = cart.filter((itemBuscado) => itemBuscado.id != item.id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("es-ES").format(number);
  };

  const totalPrecioCarrito = cart.reduce((acumulador, item) => {
    return acumulador + item.quantity * item.precio;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        removeFromCart,
        clearCart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        totalPrecioCarrito,
        formatNumber,
        favoritos,
        addToFavoritos,
        deleteFromFavoritos
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
