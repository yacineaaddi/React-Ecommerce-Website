import { LiaShippingFastSolid } from "react-icons/lia";
import { useUpdateStates } from "./updatestatesContext";
import { useNavigate } from "react-router-dom";
import { RiRefund2Line } from "react-icons/ri";
import { useProduct } from "./productContext";
import { useEffect, useState } from "react";
import { TbDiscount } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { useCart } from "./cartContext";
import Newsletter from "./newsletter";
import Slider from "./Slider";
import "./home.css";

const Home = () => {
  const { activeCat, setActiveCat } = useCart();
  const { Productbox } = useUpdateStates();
  const { products } = useProduct();
  const [sale, setSales] = useState([]);
  const [Bestsellers, setBestsellers] = useState([]);
  const [toprated, setToprated] = useState([]);
  const navigate = useNavigate();

  useEffect(function () {
    document.title = "Electro: Shop Online For Deals & Save";
  }, []);

  function Brand({ id }) {
    return (
      <div className="box">
        <img src={`/img/brand${id}.svg`} alt={`Brand number ${id}`}></img>
      </div>
    );
  }
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

  function CategoryBox({ currEl }) {
    return (
      <>
        <div
          className="box"
          onClick={() => {
            setActiveCat(currEl.key);
            navigate("/shop");
          }}
        >
          <div className="img-box">
            <img
              src={`/img/category-slider-${currEl.id}.jpg`}
              alt={`Category Box ${currEl.id}`}
            ></img>
          </div>
          <div className="info">
            <h4>{currEl.label}</h4>
          </div>
        </div>
      </>
    );
  }
  function fetchData() {
    const salefilter = products.filter(
      (currElm) => currElm.SubCat === "Specialoffers"
    );
    const newproduct = products.filter(
      (currElm) => currElm.SubCat === "Bestsellers"
    );
    const topratedProduct = products
      .filter((currElm) => currElm.Rating === 5)
      .slice(0, 5);

    setSales(salefilter);
    setBestsellers(newproduct);
    setToprated(topratedProduct);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="home">
        <Slider setActiveCat={setActiveCat} navigate={navigate} />
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
        <div className="mid-banner">
          <div className="container">
            <div className="banner-box">
              <img
                src="/img/banner2.jpg"
                alt=""
                onClick={() => {
                  setActiveCat("phones");
                  navigate("/shop");
                }}
              ></img>
            </div>
            <div className="banner-box">
              <img
                src="/img/banner1.jpg"
                alt=""
                onClick={() => {
                  setActiveCat("computers");
                  navigate("/shop");
                }}
              ></img>
            </div>
          </div>
        </div>
        <div className="top-category">
          <div className="container">
            <div className="cat-box">
              <h2>Top Categories This Week</h2>
              <p>Fresh Deals, Just for You</p>
              <button
                onClick={() => {
                  setActiveCat("all");
                  navigate("/shop");
                }}
              >
                view all Categories
              </button>
            </div>
            <div className="categories">
              {homeCategories.map((currEl) => (
                <CategoryBox key={currEl.id} currEl={currEl} />
              ))}
            </div>
          </div>
        </div>
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
        <Newsletter />
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

export default Home;
