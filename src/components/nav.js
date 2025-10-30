import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Nav = ({
  Auth,
  setAuth,
  userDetail,
  search,
  setSearch,
  setSidebar,
  sideMenu,
  SetsideMenu,
}) => {
  const Logout = () => {
    setAuth(false);
  };
  const navopen = () => {
    SetsideMenu(true);
  };
  const navclose = () => {
    SetsideMenu(false);
  };
  return (
    <>
      <div className="nav">
        <div className="container">
          {/*Top navbar*/}
          <div className="top_bar">
            <p>Free Shipping - 30 Day Money Back</p>
            {Auth ? (
              <p>
                <Link className="link" to="/login" onClick={Logout}>
                  Logout
                </Link>
              </p>
            ) : (
              <p>
                <Link className="link" to="/login">
                  Login
                </Link>
                &nbsp;/&nbsp;
                <Link className="link" to="/register">
                  Register
                </Link>
              </p>
            )}
          </div>
          <div className="mid_bar">
            <div className="content">
              <div className="navicon">
                {sideMenu ? (
                  <>
                    <div className="closenav" onClick={navclose}>
                      <IoClose />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="navopen" onClick={navopen}>
                      <FaBars />
                    </div>
                  </>
                )}
              </div>
              <div className="logo">
                <img src="./img/Logo-Electro.png" alt="Logo"></img>
              </div>
              <div className="search_bar">
                <input
                  type="text"
                  placeholder="Search Product"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                ></input>
                <div className="search">
                  <IoSearch />
                </div>
              </div>
              <div className="icons">
                <div className="icon" onClick={() => setSidebar("cart")}>
                  <Link className="link">
                    <FaShoppingCart />
                  </Link>
                </div>
                <div className="icon" onClick={() => setSidebar("wishlist")}>
                  <Link className="link">
                    <FaHeart />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom_bar">
            <div className="user-detail">
              <div className="icon">
                <FaRegUser />
              </div>
              <div className="detail">
                {Auth ? (
                  <>
                    <h2>{userDetail.Name}</h2>
                  </>
                ) : (
                  <h2>Please, Sign in</h2>
                )}
              </div>
            </div>

            <div className="offer">
              <div className="box" onClick={() => setSidebar("cart")}>
                <Link className="link">
                  <FaShoppingCart />
                </Link>

                <p>Cart</p>
              </div>
              <div className="box" onClick={() => setSidebar("wishlist")}>
                <Link className="link">
                  <FaHeart />
                </Link>

                <p>Wishlist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
