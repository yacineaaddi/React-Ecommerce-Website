import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiPercent } from "react-icons/ci";
import { BiHeadphone } from "react-icons/bi";
import "./home.css";

const Home = ({ product, OneProduct }) => {
  const [sale, setSales] = useState([]);
  const [newProduct, setNewProduct] = useState([]);

  function fetchData() {
    const salefilter = product.filter((currElm) => currElm.type === "sale");
    const newproduct = product.filter((currElm) => currElm.type === "new");
    setSales(salefilter);
    setNewProduct(newproduct);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="home">
        <div className="top-banner">
          <div className="content">
            <div className="info">
              <h2>Take your gaming experience to the next level</h2>
              <p>
                Get
                <span> 30% off </span>This week
              </p>
              <Link to="/shop">
                <button>Discover Now</button>
              </Link>
            </div>
            <div className="img-box">
              <img src="./img/rsz_msi.png" alt="Best gaming console"></img>
            </div>
          </div>
        </div>
        <div className="about">
          <div className="container">
            <div className="box">
              <div className="icon">
                <FiTruck />
              </div>
              <div className="detail">
                <h3>Free Shipping</h3>
                <p>Oder above $1000</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <BsCurrencyDollar />
              </div>
              <div className="detail">
                <h3>Return & Refund</h3>
                <p>Money Back Gaurenty</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <CiPercent />
              </div>
              <div className="detail">
                <h3>Member Discount</h3>
                <p>Discount on every Oder</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <BiHeadphone />
              </div>
              <div className="detail">
                <h3>Customer Support</h3>
                <p>Every Time Call Support</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sale-product">
          <h2>Hot Deal Product</h2>
          <div className="container">
            {sale?.map((currEl) => (
              <OneProduct currEl={currEl} key={currEl.id} />
            ))}
          </div>
        </div>
        <div className="mid-banner">
          <div className="container">
            <div className="banner-box">
              <img src="./img/jk-banner-46.jpg" alt=""></img>
            </div>
            <div className="banner-box">
              <img src="./img/jk-banner-66.jpg" alt=""></img>
            </div>
          </div>
        </div>
        <div className="top-category">
          <div className="container">
            <div className="cat-box">
              <h2>Top Categories This Week</h2>
              <p>Text text text</p>
              <button>view all Categories</button>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="./img/category-slider-1.jpg" alt=""></img>
              </div>
              <div className="info">
                <h4>TV & Audio</h4>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="./img/category-slider-2.jpg" alt=""></img>
              </div>
              <div className="info">
                <h4>Game and Consoles</h4>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="./img/category-slider-3.jpg" alt=""></img>
              </div>
              <div className="info">
                <h4>Furnitures & Decor</h4>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="./img/category-slider-1.jpg" alt=""></img>
              </div>
              <div className="info">
                <h4>Fashion & and Clothing</h4>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="./img/b1.png" alt=""></img>
              </div>
              <div className="info">
                <h4>Computer & Laptop</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="featured-product">
          <h2>Featured Product</h2>
          <div className="container">
            {newProduct?.map((currEl) => (
              <OneProduct currEl={currEl} key={currEl.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
