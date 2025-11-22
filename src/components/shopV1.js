import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CgArrowsExchangeV } from "react-icons/cg";
import { useEffect, useState } from "react";
import "./shop.css";

const Shop = ({ products, ShopProduct }) => {
  const [Categorie, setCategorie] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceOrder, setPriceOrder] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [inStock, setinStock] = useState(false);
  const [inStockProd, setinStockProd] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [PriceRangeProducts, setPriceRangeProducts] = useState([]);
  const [temProducts, settemProducts] = useState([]);
  const [finalProducts, setfinalProducts] = useState([]);
  const [PricedProducts, setPricedProducts] = useState(false);

  function resetState() {
    setinStock(false);
    settemProducts([]);
    setPriceOrder(null);
    setRatingOrder(null);
  }
  function setCat(cat) {
    resetState();
    settemProducts([]);
    setPriceRangeProducts([]);

    const temProducts = [...products]
      .filter((currElm) => (cat === "" ? true : currElm.Cat === cat))
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
    if (!filtered || filtered.length === 0) {
      setPricedProducts(true);
    } else {
      setPricedProducts(false);
      setPriceRangeProducts(filtered);
      setMinPrice("");
      setMaxPrice("");
      resetState();
    }
  }
  useEffect(() => {
    if (priceOrder !== null) {
      const sortedByPrice = (
        PriceRangeProducts.length > 0 ? [...PriceRangeProducts] : [...Categorie]
      ).sort((a, b) => (priceOrder ? b.Price - a.Price : a.Price - b.Price));
      settemProducts(sortedByPrice);
      setRatingOrder(null);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceOrder]);
  useEffect(() => {
    if (ratingOrder !== null) {
      const sortedByRate = (
        PriceRangeProducts.length > 0 ? [...PriceRangeProducts] : [...Categorie]
      ).sort((a, b) =>
        ratingOrder ? b.Rating - a.Rating : a.Rating - b.Rating
      );
      settemProducts(sortedByRate);
      setPriceOrder(null);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratingOrder]);

  useEffect(() => {
    if (inStock) {
      const filteredByStock = (
        temProducts.length > 0
          ? [...temProducts]
          : PriceRangeProducts.length > 0
          ? [...PriceRangeProducts]
          : [...Categorie]
      ).filter((p) => p.State === "Available");
      setinStockProd(filteredByStock);
    } else {
      // show all if unchecked
      setinStockProd([]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inStock]);

  useEffect(() => {
    fetchProducts(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    setfinalProducts(
      inStockProd.length > 0
        ? inStockProd
        : temProducts.length > 0
        ? temProducts
        : PriceRangeProducts.length > 0
        ? PriceRangeProducts
        : Categorie
    );
  }, [inStockProd, temProducts, PriceRangeProducts, Categorie]);

  return (
    <div className="shop">
      <div className="container">
        <div className="left-box">
          <h2>Categories</h2>
          <ul>
            <li
              onClick={() => {
                setCat("");
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
              Tv and Audio
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
              Computer and Laptop
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
              Phones and Tablettes
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
                {finalProducts.length !== 0
                  ? `${finalProducts.length} results`
                  : ""}
              </p>
            </div>
          </div>
          <div className="products">
            {PricedProducts ? (
              <p>No Products found !</p>
            ) : (
              finalProducts.map((currEl) => (
                <ShopProduct currEl={currEl} key={currEl.id} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
