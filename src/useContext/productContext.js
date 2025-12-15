import { createContext, useContext, useState } from "react";
import { Product } from "../data/data";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(Product);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
