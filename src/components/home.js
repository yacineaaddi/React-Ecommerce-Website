import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="top-banner">
          <div className="content">
            <div className="info">
              <h2>Newest Tablets – Power Up Your Play</h2>
              <p>
                Get
                <span>30% off</span>This week
              </p>
              <Link to="/shop">
                <button>Discover Now</button>
              </Link>
            </div>
            <div className="img-box">
              <img src="./img/slider-img.png" alt="Best gaming console"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
