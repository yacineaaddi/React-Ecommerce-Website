import { useEffect, useState } from "react";

import "./sidebar.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const SideBar = ({ sidebar, setSidebar }) => {
  const [quantity, setQuantity] = useState(1);
  function sidebarproduct() {
    return (
      <>
        <div className="box">
          <div className="product">
            <img></img>
          </div>
          <div className="product-detail">
            <h2></h2>
            <p></p>
            <div className="product-qty">
              <div className="quantity" onClick={setQuantity((e) => e - 1)}>
                -
              </div>
              <input type="number" value={quantity}></input>
              <div className="quantity" onClick={setQuantity((e) => e + 1)}>
                +
              </div>
            </div>
          </div>
          <div className="delete">
            <button></button>
            <p>productprice*quantity</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className={`sidebar ${!sidebar ? "hidden" : ""}`}>
      <button className="close-btn" onClick={() => setSidebar((e) => "")}>
        X
      </button>
      <div className="title">
        {sidebar === "cart" && (
          <>
            <FaShoppingCart />
            <p>Your Cart</p>
          </>
        )}
        {sidebar === "wishlist" && (
          <>
            <FaHeart />
            <p>Whishlist</p>
          </>
        )}
      </div>
      <div className="line"></div>
    </div>
  );
};

export default SideBar;
