import { useEffect, useState } from "react";
import "./shop.css";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { CgArrowsExchangeV } from "react-icons/cg";

const Shop = ({ products, OneProduct, ShopProduct }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceOrder, setPriceOrder] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [inStock, setinStock] = useState(false);
  const [PricedProducts, setPricedProducts] = useState([]);
  /*const [sortType, setSortType] = useState(null);*/
  const [Categorie, setCategorie] = useState([]);
  const [inStockProd, setinStockProd] = useState([]);

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
  }
  useEffect(() => {
    if (priceOrder !== null) {
      const sortedByPrice = [...Categorie].sort((a, b) =>
        priceOrder ? b.Price - a.Price : a.Price - b.Price
      );
      setCategorie(sortedByPrice);
      setRatingOrder(null);
    }
  }, [priceOrder, inStock]);
  useEffect(() => {
    if (ratingOrder !== null) {
      const sortedByRate = (inStock ? [...inStockProd] : [...Categorie]).sort(
        (a, b) => (ratingOrder ? b.Rating - a.Rating : a.Rating - b.Rating)
      );
      setCategorie(sortedByRate);
      setPriceOrder(null);
    }
  }, [ratingOrder, inStock]);

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
  /*
  const togglePriceSort = () => {
    setSortType("price");
    setSortOrder((prev) => !prev); // toggle ascending/descending
  };

  const toggleRatingSort = () => {
    setSortType("rating");
    setSortOrder((prev) => !prev); // toggle ascending/descending
  };
  
  useEffect(() => {
    let temp = [...Categorie];

    //if (inStock) temp = temp.filter((p) => p.Rating === 4.5);

    // 3️⃣ Filter by min/max price
    if (minPrice !== "" && maxPrice !== "") {
      temp = temp.filter(
        (p) =>
          p.Price >= parseFloat(minPrice) && p.Price <= parseFloat(maxPrice)
      );
    }
    /*
    // 4️⃣ Sort by price or rating
    if (sortType === "price") {
      temp.sort((a, b) => (sortOrder ? a.Price - b.Price : b.Price - a.Price));
    } else if (sortType === "rating") {
      temp.sort((a, b) =>
        sortOrder ? a.Rating - b.Rating : b.Rating - a.Rating
      );
    }

    setCategorie(temp);
  }, [products, Categorie, inStock, minPrice, maxPrice, sortType, sortOrder]);
*/
  /*
  // Then sort by price if user clicked price sort
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
    // Then sort by rating if user clicked rating sort
    if (ratingOrder !== null) {
      const sortedByRate = [...Categorie].sort((a, b) =>
        ratingOrder ? b.Rating - a.Rating : a.Rating - b.Rating
      );
      setCategorie(sortedByRate);
      setPriceOrder(null);
    }
  }, [ratingOrder]);

  useEffect(() => {
    if (inStock) {
      const filteredByStock = Categorie.filter((p) => p.Rating === 4.3);
      setCategorie(filteredByStock);
    } else {
      // show all if unchecked
      setCategorie(Categorie);
    }
  }, [inStock]);
  // Sort by price if user clicked price sort
  /*
  let sortedProducts = [...Categorie];

  // Sort by price if user clicked price sort
  if (priceOrder !== null) {
    setRatingOrder(null);
    sortedProducts.sort((a, b) =>
      priceOrder ? a.Price - b.Price : b.Price - a.Price
    );
  }

  // Then sort by rating if user clicked rating sort
  if (ratingOrder !== null) {
    setPriceOrder(null);
    sortedProducts.sort((a, b) =>
      ratingOrder ? a.Rating - b.Rating : b.Rating - a.Rating
    );
  }*/

  useEffect(() => {
    fetchProducts();
  }, [products]);

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
