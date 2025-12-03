import { CgArrowsExchangeAltV, CgArrowsExchangeV } from "react-icons/cg";
import { useMemo, useState } from "react";
import "./shop.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const categories = [
  { key: "all", label: "All", value: "" },
  { key: "cameras", label: "Cameras", value: "cameras" },
  { key: "tv", label: "Tv and Audio", value: "tv" },
  { key: "computers", label: "Computer and Laptop", value: "computers" },
  { key: "phones", label: "Phones and Tablettes", value: "phones" },
  { key: "consoles", label: "Game and Consoles", value: "consoles" },
];

const Shop = ({ products, Productbox }) => {
  const RESULT_PER_PAGE = 16;
  const [currentPage, setCurrentPage] = useState(0);
  const start = currentPage * RESULT_PER_PAGE;
  const end = start + RESULT_PER_PAGE;
  const [activeCat, setActiveCat] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceOrder, setPriceOrder] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [inStock, setInStock] = useState(false);
  const [noPriceResults, setNoPriceResults] = useState(false);

  const shuffledProducts = useMemo(
    () => [...products].sort(() => Math.random() - 0.5),
    [products]
  );

  const finalProducts = useMemo(() => {
    let list = [...shuffledProducts];

    const selected = categories.find((c) => c.key === activeCat);

    if (selected.value) {
      list = list.filter((p) => p.Cat === selected.value);
    }

    if (minPrice || maxPrice) {
      list = list.filter(
        (p) =>
          p.Price >= Number(minPrice || 0) &&
          p.Price <= Number(maxPrice || Infinity)
      );
      setNoPriceResults(list.length === 0);
    }

    if (inStock) {
      list = list.filter((p) => p.Stock < 1);
    }

    if (priceOrder !== null) {
      list.sort((a, b) => (priceOrder ? b.Price - a.Price : a.Price - b.Price));
    }

    if (ratingOrder !== null) {
      list.sort((a, b) =>
        ratingOrder ? b.Rating - a.Rating : a.Rating - b.Rating
      );
    }

    return list;
  }, [
    shuffledProducts,
    activeCat,
    minPrice,
    maxPrice,
    priceOrder,
    ratingOrder,
    inStock,
  ]);

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    if (!minPrice && !maxPrice) return;
    setPriceOrder(null);
    setRatingOrder(null);
  };

  return (
    <div className="shop">
      <div className="container">
        <div className="left-box">
          <h2>Categories</h2>
          <ul>
            {categories.map((c) => (
              <li
                key={c.key}
                onClick={() => setActiveCat(c.key)}
                style={{
                  backgroundColor: activeCat === c.key ? "#2196f3" : "",
                  color: activeCat === c.key ? "#fff" : "",
                }}
              >
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="right-box">
          <div className="propreties">
            <form className="price-min-max" onSubmit={handlePriceSubmit}>
              <label>Price min</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <label>Max</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />

              <button type="submit">Apply</button>
            </form>

            <div className="price-rate">
              <div className="price" onClick={() => setPriceOrder((p) => !p)}>
                {priceOrder ? <CgArrowsExchangeAltV /> : <CgArrowsExchangeV />}
                <p>{priceOrder ? "Price: High → Low" : "Price: Low → High"}</p>
              </div>

              <div className="rate" onClick={() => setRatingOrder((r) => !r)}>
                {ratingOrder ? <CgArrowsExchangeAltV /> : <CgArrowsExchangeV />}
                <p>{ratingOrder ? "Highest rating" : "Lowest rating"}</p>
              </div>
            </div>

            <div className="stock">
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => setInStock((v) => !v)}
              />
              <p>In Stock</p>
            </div>

            <div className="results">
              <p>
                {finalProducts.length ? `${finalProducts.length} results` : ""}
              </p>
            </div>
          </div>

          <div className="products">
            {noPriceResults ? (
              <p>No Products Found!</p>
            ) : (
              finalProducts
                .slice(start, end)
                .map((item) => (
                  <Productbox
                    key={item.id}
                    currEl={item}
                    variant="regular-box"
                  />
                ))
            )}
          </div>
          {finalProducts.length > RESULT_PER_PAGE && (
            <div className="pagination">
              <Swiper
                spaceBetween={0}
                slidesPerView={3}
                modules={[Navigation]}
                navigation={true}
                className="pagination-box"
              >
                {Array.from(
                  {
                    length: 5,
                  },
                  (_, i) => (
                    <SwiperSlide key={i}>
                      <div className="pagination-num">
                        <button
                          className={i === currentPage ? "active" : ""}
                          onClick={() => setCurrentPage(i)}
                        >
                          {i + 1}
                        </button>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
