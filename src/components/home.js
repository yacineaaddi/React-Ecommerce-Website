import { useEffect, useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiRefund2Line } from "react-icons/ri";
import { TbDiscount } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Data } from "./SliderData";
import Carousel from "./Carousel";

import "./home.css";

const Home = ({ products, ShopProduct, Specialoffers }) => {
  const [sale, setSales] = useState([]);
  const [Bestsellers, setBestsellers] = useState([]);
  const [toprated, setToprated] = useState([]);

  function Brand({ id }) {
    return (
      <div className="box">
        <img src={`/img/brand${id}.svg`} alt={`Brand number ${id}`}></img>
      </div>
    );
  }

  function CategoryBox({ id, Title }) {
    return (
      <>
        <div className="box">
          <div className="img-box">
            <img
              src={`/img/category-slider-${id}.jpg`}
              alt={`Category Box ${id}`}
            ></img>
          </div>
          <div className="info">
            <h4>{Title}</h4>
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
        <div
          className="top-banner"
          //style={{
          // backgroundImage: `url(${background})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          //  }}
        >
          {<Carousel images={Data} />}
          {/*  <div className="content">
            <div className="info">
              <h2>Bring cinematic moments to your living room</h2>
              <p>
                Get
                <span> 30% off </span>This week
              </p>
              <Link to="/shop">
                <button>Discover Now</button>
              </Link>
            </div>
            <div className="img-box">
              <img src="/img/tv77.png" alt="Best gaming console"></img>
            </div>
          </div>*/}
        </div>
        <div className="about">
          <div className="container">
            <div className="box">
              <div className="icon">
                <LiaShippingFastSolid />
              </div>
              <div className="detail">
                <h3>Free Shipping</h3>
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
              <Specialoffers currEl={currEl} key={currEl.id} />
            ))}
          </div>
        </div>
        <div className="mid-banner">
          <div className="container">
            <div className="banner-box">
              <img src="/img/banner2.jpg" alt=""></img>
            </div>
            <div className="banner-box">
              <img src="/img/banner1.jpg" alt=""></img>
            </div>
          </div>
        </div>
        <div className="top-category">
          <div className="container">
            <div className="cat-box">
              <h2>Top Categories This Week</h2>
              <p>Fresh Deals, Just for You</p>
              <button>view all Categories</button>
            </div>
            <div className="categories">
              <CategoryBox id={1} Title={"Game and Consoles"} />
              <CategoryBox id={4} Title={"Phones & Tablettes"} />
              <CategoryBox id={2} Title={"Cameras"} />
              <CategoryBox id={5} Title={"Computers & Laptops"} />
              <CategoryBox id={3} Title={"Tv & Audio"} />
            </div>
          </div>
        </div>
        <div className="toprated-product">
          <h2>Top Rated</h2>
          <div className="prod-container">
            {toprated?.map((currEl) => (
              <ShopProduct currEl={currEl} key={currEl.id} />
            ))}
          </div>
        </div>
        <div className="bestseller-product">
          <h2>Best Sellers</h2>
          <div className="prod-container">
            {Bestsellers?.map((currEl) => (
              <ShopProduct currEl={currEl} key={currEl.id} />
            ))}
          </div>
        </div>

        <div className="newsletter">
          <div className="container">
            <div className="main">
              <h3>Newsletter Sign Up</h3>
              <p>
                Get <span>30 % OFF</span> coupon today subscribers
              </p>
            </div>

            <div className="box">
              <input type="text" placeholder="Enter Your Email"></input>
              <div className="submit">
                <FaArrowRightLong />
              </div>
            </div>
          </div>
        </div>
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
