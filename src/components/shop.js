import { useEffect, useState } from "react";
import React from "react";
import "./shop.css";
const Shop = ({ products, OneProduct, ShopProduct }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // filter products here
    alert("Filter between:", minPrice, "and", maxPrice);
  }
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
          <div className="propreties">
            <div className="price-rate">
              <div className="price"></div>
              <div className="rate"></div>
            </div>
            <form className="price-min-max" onSubmit={handleSubmit}>
              <label htmlFor="min">Min price</label>
              <input
                type="number"
                id="min"
                name="min"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <label htmlFor="max">Max price</label>
              <input
                type="number"
                id="max"
                name="max"
                placeholder="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />

              <button type="submit">Apply</button>
            </form>
            <div className="stock">
              <input type="checkbox"></input>
              <p></p>
            </div>
            <div className="results">
              <p>{}results</p>
            </div>
          </div>
          <div className="products">
            {Categorie?.map((currEl) => (
              <ShopProduct currEl={currEl} key={currEl.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
