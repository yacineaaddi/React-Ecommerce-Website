import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  
  const [activeCat, setActiveCat] = useState("all");
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ activeCat, setActiveCat, cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
