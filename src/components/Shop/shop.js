// Importing two arrow exchange icons from the 'react-icons' library (from the 'cg' set)
import { CgArrowsExchangeAltV, CgArrowsExchangeV } from "react-icons/cg";

// Importing the 'setActiveCat' action from the Redux cart slice
import { setActiveCat } from "../../features/cart/cartSlice";

// Importing Redux hooks: 'useDispatch' to dispatch actions and 'useSelector' to access state
import { useDispatch, useSelector } from "react-redux";

// Importing React hooks: 'useMemo' for memoizing values, 'useState' for state management, and 'useEffect' for side effects
import { useMemo, useState, useEffect } from "react";

// Importing Swiper components for building a slider/carousel
import { Swiper, SwiperSlide } from "swiper/react";

// Importing Swiper modules, in this case the Navigation module for next/prev arrows
import { Navigation } from "swiper/modules";

// Importing a custom component for displaying individual products
import Productbox from "../ProductBox/ProductBox";

// Importing Swiper CSS for navigation functionality
import "swiper/css/navigation";

// Importing Swiper CSS for autoplay functionality
import "swiper/css/autoplay";

// Importing custom CSS specific to the Shop page
import "../Shop/shop.css";

// Importing base Swiper CSS (required for all Swiper components)
import "swiper/css";

const categories = [
  { key: "all", label: "All", value: "" },
  { key: "cameras", label: "Cameras", value: "cameras" },
  { key: "tv", label: "Tv and Audio", value: "tv" },
  { key: "computers", label: "Computer and Laptop", value: "computers" },
  { key: "phones", label: "Phones and Tablettes", value: "phones" },
  { key: "consoles", label: "Game and Consoles", value: "consoles" },
];

// Shop component: displays a list of products with filtering, sorting, and pagination
const Shop = () => {
  // Access products state from Redux store
  const { products } = useSelector((state) => state.product);

  // Access currently active category from Redux store
  const { activeCat } = useSelector((state) => state.cart);

  // Redux dispatch function to send actions
  const dispatch = useDispatch();

  // Number of products to display per page
  const RESULT_PER_PAGE = 16;

  // Current page state for pagination
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the start and end index for slicing the products array
  const start = currentPage * RESULT_PER_PAGE;
  const end = start + RESULT_PER_PAGE;

  // State for filtering products by price range
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // State for sorting products by price and rating
  const [priceOrder, setPriceOrder] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);

  // State for filtering in-stock products
  const [inStock, setInStock] = useState(false);

  // State to show message if no products match price filter
  const [noPriceResults, setNoPriceResults] = useState(false);

  // useEffect to set the page title on component mount
  useEffect(function () {
    document.title = "Shop | Electro";
  }, []);

  // Shuffle products randomly to show different order each time
  const shuffledProducts = useMemo(
    () => [...products].sort(() => Math.random() - 0.5),
    [products]
  );

  // Compute the final list of products based on filters and sorting
  const finalProducts = useMemo(() => {
    let list = [...shuffledProducts];

    // Filter by active category if one is selected
    const selected = categories.find((c) => c.key === activeCat);
    if (selected.value) {
      list = list.filter((p) => p.Cat === selected.value);
    }

    // Filter by price range if min or max price is provided
    if (minPrice || maxPrice) {
      list = list.filter(
        (p) =>
          p.Price >= Number(minPrice || 0) &&
          p.Price <= Number(maxPrice || Infinity)
      );
      // Show message if no products match the price range
      setNoPriceResults(list.length === 0);
    }

    // Filter products that are in stock
    if (inStock) {
      list = list.filter((p) => p.Stock > 1);
    }

    // Sort products by price if priceOrder is set
    if (priceOrder !== null) {
      list.sort((a, b) => (priceOrder ? b.Price - a.Price : a.Price - b.Price));
    }

    // Sort products by rating if ratingOrder is set
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

  // Calculate total number of pages for pagination
  const NumberofPages = Math.round(finalProducts.length / RESULT_PER_PAGE);

  // Handle price filter form submission
  const handlePriceSubmit = (e) => {
    e.preventDefault();
    if (!minPrice && !maxPrice) return;
    // Reset sorting when applying price filter
    setPriceOrder(null);
    setRatingOrder(null);
  };

  return (
    <div className="shop">
      <div className="container">
        {/* Left sidebar: categories */}
        <div className="left-box">
          <h2>Categories</h2>
          <ul>
            {categories.map((c) => (
              <li
                key={c.key}
                onClick={() => dispatch(setActiveCat(c.key))}
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

        {/* Right side: filters, sorting, products */}
        <div className="right-box">
          <div className="propreties">
            {/* Price filter form */}
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

            {/* Sorting controls */}
            <div className="price-rate">
              {/* Price sorting */}
              <div className="price" onClick={() => setPriceOrder((p) => !p)}>
                {priceOrder ? <CgArrowsExchangeAltV /> : <CgArrowsExchangeV />}
                <p>{priceOrder ? "Price: High → Low" : "Price: Low → High"}</p>
              </div>

              {/* Rating sorting */}
              <div className="rate" onClick={() => setRatingOrder((r) => !r)}>
                {ratingOrder ? <CgArrowsExchangeAltV /> : <CgArrowsExchangeV />}
                <p>{ratingOrder ? "Highest rating" : "Lowest rating"}</p>
              </div>
            </div>

            {/* In-stock filter */}
            <div className="stock">
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => setInStock((v) => !v)}
              />
              <p>In Stock</p>
            </div>

            {/* Display number of results */}
            <div className="results">
              <p>
                {finalProducts.length ? `${finalProducts.length} results` : ""}
              </p>
            </div>
          </div>

          {/* Products grid */}
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

          {/* Pagination if more products than per page */}
          {finalProducts.length > RESULT_PER_PAGE && (
            <div className="pagination">
              <Swiper
                spaceBetween={0}
                slidesPerView={3}
                modules={[Navigation]}
                navigation={true}
              >
                {Array.from({ length: NumberofPages }, (_, i) => (
                  <SwiperSlide key={i} style={{ width: "0px" }}>
                    <div className="pagination-num">
                      <button
                        className={i === currentPage ? "active" : ""}
                        onClick={() => setCurrentPage(i)}
                      >
                        {i + 1}
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the component
export default Shop;
