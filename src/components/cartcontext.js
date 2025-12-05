import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [activeCat, setActiveCat] = useState("all");

  return (
    <CartContext.Provider value={{ activeCat, setActiveCat }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
