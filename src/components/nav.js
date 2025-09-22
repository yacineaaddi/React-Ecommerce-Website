import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Nav = ({ Auth, setAuth, userDetail }) => {
  const [OpenNav, SetOpenNav] = useState(false);

  const Logout = () => {
    setAuth(false);
  };
  const navopen = () => {
    SetOpenNav(true);
  };
  const navclose = () => {
    SetOpenNav(false);
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
              <div className="navicon">
                {OpenNav ? (
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
          <div className={`bottom_bar ${OpenNav ? "active" : ""}`}>
            <div className="user-detail">
              <div className="icon">
                <FaRegUser />
              </div>
              <div className="detail">
                {Auth ? (
                  <>
                    <h2>{userDetail.Name}</h2>
                    <p>{userDetail.Email}</p>
                  </>
                ) : (
                  <h2>Please, Sign in</h2>
                )}
              </div>
            </div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <div className="offer">
              <h2>30% off in winter sale</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
