// Redux action to set the currently active product category in the store
import { setActiveCat } from "../../features/cart/cartSlice";

// Fast-shipping icon (used for a shipping feature block)
import { LiaShippingFastSolid } from "react-icons/lia";

// Hooks for interacting with Redux state and dispatching actions
import { useDispatch, useSelector } from "react-redux";

// Hook used to navigate programmatically between pages
import { useNavigate } from "react-router-dom";

// Refund / money-back icon
import { RiRefund2Line } from "react-icons/ri";

// React hooks: side-effects + memoized values/computations
import { useEffect, useMemo } from "react";

// Discount / sale icon
import { TbDiscount } from "react-icons/tb";

// Customer support icon
import { BiSupport } from "react-icons/bi";

// Newsletter subscription component
import Newsletter from "../Newsletter/newsletter";

// Single product card component
import Productbox from "../ProductBox/ProductBox";

// Homepage slider / carousel component
import Slider from "../Slider/Slider";

// Box representing an individual product category
import CategoryBox from "./categoryBox";

// Styles specific to the Home page
import "./home.css";

// Home page component
const Home = () => {
  // Get all products from Redux store
  const { products } = useSelector((state) => state.product);

  // Redux dispatch + router navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set page title once when component mounts
  useEffect(function () {
    document.title = "Electro: Shop Online For Deals & Save";
  }, []);

  // Small internal component for rendering brand logos
  function Brand({ id }) {
    return (
      <div className="box">
        <img src={`/img/brand${id}.svg`} alt={`Brand number ${id}`}></img>
      </div>
    );
  }

  // Static list of homepage categories
  const homeCategories = [
    { key: "cameras", label: "Cameras", value: "cameras", id: 1 },
    { key: "tv", label: "Tv and Audio", value: "tv", id: 2 },
    {
      key: "computers",
      label: "Computer and Laptop",
      value: "computers",
      id: 3,
    },
    { key: "phones", label: "Phones and Tablettes", value: "phones", id: 4 },
    { key: "consoles", label: "Game and Consoles", value: "consoles", id: 5 },
  ];

  // Memoized list — recomputes only when products change
  // Special offers section
  const Bestsellers = useMemo(
    () => products.filter((p) => p.SubCat === "Specialoffers"),
    [products]
  );

  // Memoized — products flagged as "Bestsellers"
  const toprated = useMemo(
    () => products.filter((p) => p.SubCat === "Bestsellers"),
    [products]
  );

  // Memoized — top rated (rating = 5), limited to 5
  const sale = useMemo(
    () => products.filter((p) => p.Rating === 5).slice(0, 5),
    [products]
  );

  return (
    <>
      <div className="home">
        {/* Hero slider */}
        <Slider setActiveCat={setActiveCat} navigate={navigate} />

        {/* Feature icons (shipping, refund, etc.) */}
        <div className="about">
          <div className="container">
            <div className="box">
              <div className="icon">
                <LiaShippingFastSolid />
              </div>
              <div className="detail">
                <h3>Free Delivery</h3>
                <p>Order above $100</p>
              </div>
            </div>

            <div className="box">
              <div className="icon">
                <RiRefund2Line />
              </div>
              <div className="detail">
                <h3>Return & Refund</h3>
                <p>Money Back Gaurenty</p>
              </div>
            </div>

            <div className="box">
              <div className="icon">
                <TbDiscount />
              </div>
              <div className="detail">
                <h3>Member Discount</h3>
                <p>Discount on every Oder</p>
              </div>
            </div>

            <div className="box">
              <div className="icon">
                <BiSupport />
              </div>
              <div className="detail">
                <h3>Customer Support</h3>
                <p>Every Time Call Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special offers products */}
        <div className="sale-product">
          <h2>Special offers</h2>
          <div className="prod-container">
            {sale?.map((currEl) => (
              <Productbox
                currEl={currEl}
                key={currEl.id}
                variant="special-offers"
              />
            ))}
          </div>
        </div>

        {/* Banner section with category shortcuts */}
        <div className="mid-banner">
          <div className="container">
            <div className="banner-box">
              <img
                src="/img/banner2.jpg"
                alt=""
                onClick={() => {
                  dispatch(setActiveCat("phones"));
                  navigate("/shop");
                }}
              ></img>
            </div>

            <div className="banner-box">
              <img
                src="/img/banner1.jpg"
                alt=""
                onClick={() => {
                  dispatch(setActiveCat("computers"));
                  navigate("/shop");
                }}
              ></img>
            </div>
          </div>
        </div>

        {/* Categories section */}
        <div className="top-category">
          <div className="container">
            <div className="cat-box">
              <h2>Top Categories This Week</h2>
              <p>Fresh Deals, Just for You</p>

              {/* View all button resets category to "all" */}
              <button
                onClick={() => {
                  dispatch(setActiveCat("all"));
                  navigate("/shop");
                }}
              >
                view all Categories
              </button>
            </div>

            {/* Render each category card */}
            <div className="categories">
              {homeCategories.map((currEl) => (
                <CategoryBox
                  key={currEl.id}
                  currEl={currEl}
                  dispatch={dispatch}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top rated product list */}
        <div className="toprated-product">
          <h2>Top Rated</h2>
          <div className="prod-container">
            {toprated?.map((currEl) => (
              <Productbox
                currEl={currEl}
                key={currEl.id}
                variant="regular-box"
              />
            ))}
          </div>
        </div>

        {/* Best seller product list */}
        <div className="bestseller-product">
          <h2>Best Sellers</h2>
          <div className="prod-container">
            {Bestsellers?.map((currEl) => (
              <Productbox
                currEl={currEl}
                key={currEl.id}
                variant="regular-box"
              />
            ))}
          </div>
        </div>

        {/* Newsletter sign-up section */}
        <Newsletter />

        {/* Brand logo carousel */}
        <div className="brands">
          <div className="container">
            {Array.from({ length: 7 }, (_, i) => i + 1).map((num) => (
              <Brand key={num} id={num} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Export component
export default Home;
