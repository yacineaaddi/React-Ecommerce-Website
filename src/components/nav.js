import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import "./nav.css";
import useKey from "./useCustomHook";

const Nav = ({
  Auth,
  setAuth,
  userDetail,
  setSidebar,
  SetsideMenu,
  products,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtredProducts, setfiltredProducts] = useState([]);
  const [hidemenu, setHideMenu] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const nav = document.querySelector(".nav");
      if (!nav) return;

      if (window.scrollY < 50) {
        nav.classList.remove("active");
      } else {
        nav.classList.add("active");
      }
    }

    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setfiltredProducts([]);
      return;
    }
    const results = products.filter(
      (item) =>
        item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setfiltredProducts(results);
  }, [searchTerm]);

  /*
  useKey("Escape", function () {
    if (document.activeElement === inputEl.current) {
      resetSearch();
      console.log(1);
    } else {
      return;
    }
  });*/
  const Logout = () => {
    setAuth(false);
  };

  const resetSearch = () => {
    setHideMenu(true);
    setSearchTerm("");
    inputEl.current.blur();
  };
  const inputEl = useRef(null);

  return (
    <>
      <div className="nav">
        <div className="menu-button" onClick={() => SetsideMenu(() => true)}>
          <FiMenu />
        </div>
        <div className="logo">
          <img src="./img/Logo-ElectroPNG.png" alt="Logo"></img>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </>
        </ul>
        <div className={`search_bar ${hidemenu ? "" : "expanded"}`}>
          <input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setHideMenu(false)}
            onBlur={() => resetSearch()}
            className="search_input"
            ref={inputEl}
          ></input>

          <div className="search">
            <IoSearch />
          </div>
          {searchTerm && (
            <div className="search-result-box">
              {filtredProducts.length > 0 ? (
                filtredProducts.map((item) => (
                  <div
                    className="search-result-item"
                    key={item.id}
                    onClick={() => alert("clicked")}
                  >
                    <img src={item.Img[0]} alt={item.Title} width="40" />
                    <span>{item.Title.split(" ").slice(0, 5).join(" ")}</span>
                    <p>{item.Price} $</p>
                  </div>
                ))
              ) : (
                <p className="no-results">No results found</p>
              )}
            </div>
          )}
        </div>
        <div className="sidebar-wishlist">
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
        {Auth && (
          <>
            <div className="user-detail">
              <div className="icon">
                <FaRegUser />
              </div>
              <div className="detail">
                <h2>{userDetail.Name}</h2>
              </div>
            </div>
          </>
        )}

        <div className="login-signup">
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
              <Link className="link" to="/signup">
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
