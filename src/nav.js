import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Nav = ({ Auth, setAuth, userDetail }) => {
  const Logout = () => {
    setAuth(false);
  };
  return (
    <>
      <div className="nav">
        <div className="container">
          {/*Top navbar*/}
          <div className="top_bar">
            <p>Get free shipping - Free 30 day money back guarantee</p>
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
                /
                <Link className="link" to="/register">
                  Register
                </Link>
              </p>
            )}
          </div>
          {/*Buttom navbar*/}
          <div className="mid_bar">
            <div className="content">
              <div className="logo">
                <img src="../public/img/logo.svg" alt="Logo"></img>
              </div>
              <div className="search_bar">
                <input type="text" placeholder="Search Product"></input>
                <button>Search</button>
              </div>
              <div className="icons">
                <div className="icon">
                  <Link className="link" to="/cart">
                    <FaShoppingCart />
                  </Link>
                </div>
                <div className="icon">
                  <CiHeart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
