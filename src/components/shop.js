import { useEffect, useState } from "react";
import "./shop.css";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CgArrowsExchangeV } from "react-icons/cg";

const Shop = ({ products, ShopProduct }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceOrder, setPriceOrder] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [inStock, setinStock] = useState(false);
  const [Categorie, setCategorie] = useState([]);
  const [inStockProd, setinStockProd] = useState([]);
  const [activeCat, setActiveCat] = useState("all");

  function setCat(cat) {
    const temProducts = products
      .filter((currElm) => currElm.Cat === cat)
      .sort(() => Math.random() - 0.5);
    setCategorie(temProducts);
  }

  function fetchProducts() {
    const randomProducts = [...products].sort(() => Math.random() - 0.5);
    setCategorie(randomProducts);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (minPrice === "" && maxPrice === "") return;
    const filtered = [...Categorie].filter(
      (p) => p.Price >= Number(minPrice) && p.Price <= Number(maxPrice)
    );
    console.log(minPrice, maxPrice);
    console.log(filtered);
    setCategorie(filtered);
    setMinPrice("");
    setMaxPrice("");
  }
  useEffect(() => {
    if (priceOrder !== null) {
      const sortedByPrice = [...Categorie].sort((a, b) =>
        priceOrder ? b.Price - a.Price : a.Price - b.Price
      );
      setCategorie(sortedByPrice);
      setRatingOrder(null);
    }
  }, [priceOrder]);
  useEffect(() => {
    if (ratingOrder !== null) {
      const sortedByRate = (inStock ? [...inStockProd] : [...Categorie]).sort(
        (a, b) => (ratingOrder ? b.Rating - a.Rating : a.Rating - b.Rating)
      );
      setCategorie(sortedByRate);
      setPriceOrder(null);
    }
  }, [ratingOrder]);

  useEffect(() => {
    if (inStock) {
      const filteredByStock = [...Categorie].filter(
        (p) => p.State === "Available"
      );
      setinStockProd(filteredByStock);
      console.log("true");
      console.log(Categorie);
    } else {
      // show all if unchecked
      setinStockProd([]);
      console.log("false");
    }
  }, [inStock]);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  return (
    <div className="shop">
      <div className="container">
        <div className="left-box">
          <h2>Categories</h2>
          <ul>
            <li
              onClick={() => {
                setCategorie(products);
                setActiveCat("all");
              }}
              style={{
                backgroundColor: activeCat === "all" ? "#2196f3" : "",
                color: activeCat === "all" ? "#fff" : "",
              }}
            >
              All
            </li>
            <li
              onClick={() => {
                setCat("cameras");
                setActiveCat("cameras");
              }}
              style={{
                backgroundColor: activeCat === "cameras" ? "#2196f3" : "",
                color: activeCat === "cameras" ? "#fff" : "",
              }}
            >
              Cameras
            </li>
            <li
              onClick={() => {
                setCat("tv");
                setActiveCat("tv");
              }}
              style={{
                backgroundColor: activeCat === "tv" ? "#2196f3" : "",
                color: activeCat === "tv" ? "#fff" : "",
              }}
            >
              Tv & Audio
            </li>
            <li
              onClick={() => {
                setCat("computers");
                setActiveCat("computers");
              }}
              style={{
                backgroundColor: activeCat === "computers" ? "#2196f3" : "",
                color: activeCat === "computers" ? "#fff" : "",
              }}
            >
              Computer & Laptop
            </li>
            <li
              onClick={() => {
                setCat("phones");
                setActiveCat("phones");
              }}
              style={{
                backgroundColor: activeCat === "phones" ? "#2196f3" : "",
                color: activeCat === "phones" ? "#fff" : "",
              }}
            >
              Phones & Tablettes
            </li>
            <li
              onClick={() => {
                setCat("consoles");
                setActiveCat("consoles");
              }}
              style={{
                backgroundColor: activeCat === "consoles" ? "#2196f3" : "",
                color: activeCat === "consoles" ? "#fff" : "",
              }}
            >
              Game and Consoles
            </li>
          </ul>
        </div>
        <div className="right-box">
          <div className="propreties">
            <form className="price-min-max" onSubmit={handleSubmit}>
              <label htmlFor="min">Price min</label>
              <input
                type="number"
                id="min"
                name="min"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <label htmlFor="max">Max</label>
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
            <div className="price-rate">
              <div className="price" onClick={() => setPriceOrder((e) => !e)}>
                {priceOrder ? (
                  <CgArrowsExchangeAltV
                    style={{
                      color: priceOrder ? "green" : "black",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <CgArrowsExchangeV
                    style={{
                      color: priceOrder ? "green" : "black",
                      fontSize: "20px",
                    }}
                  />
                )}
                <p>
                  {priceOrder ? "Price : High to low" : "Price : Low to high"}
                </p>
              </div>
              <div className="rate" onClick={() => setRatingOrder((e) => !e)}>
                {ratingOrder ? (
                  <CgArrowsExchangeAltV
                    style={{
                      color: ratingOrder ? "green" : "black",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <CgArrowsExchangeV
                    style={{
                      color: ratingOrder ? "green" : "black",
                      fontSize: "20px",
                    }}
                  />
                )}
                <p>{ratingOrder ? "Highest rating" : "Lowest rating"}</p>
              </div>
            </div>
            <div className="stock">
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => setinStock((e) => !e)}
              ></input>
              <p>In Stock</p>
            </div>
            <div className="results">
              <p>
                {Categorie.length !== 0
                  ? `${
                      inStockProd.length === 0
                        ? Categorie.length
                        : inStockProd.length
                    } results`
                  : ""}
              </p>
            </div>
          </div>
          <div className="products">
            {(inStockProd.length === 0 ? Categorie : inStockProd).map(
              (currEl) => (
                <ShopProduct currEl={currEl} key={currEl.id} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
