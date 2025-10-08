import { useEffect, useState } from "react";
import React from "react";
import "./shop.css";
const Shop = ({ products, OneProduct }) => {
  const [Categorie, setCategorie] = useState([]);
  function setCat(cat) {
    const temProducts = products.filter((currElm) => currElm.Cat === cat);
    setCategorie(temProducts);
  }
  function fetchProducts() {
    setCategorie(products);
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="shop">
      <div className="container">
        <div className="left-box">
          <h2>Categories</h2>
          <ul>
            <li onClick={() => setCategorie(products)}>All</li>
            <li onClick={() => setCat("cameras")}>Cameras</li>
            <li onClick={() => setCat("tv")}>Tv & Audio</li>
            <li onClick={() => setCat("computers")}>Computer & Laptop</li>
            <li onClick={() => setCat("phones")}>Phones & Tablettes</li>
            <li onClick={() => setCat("consoles")}>Game and Consoles</li>
          </ul>
        </div>
        <div className="right-box">
          {Categorie?.map((currEl) => (
            <OneProduct currEl={currEl} key={currEl.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
