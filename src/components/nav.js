import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import "./nav.css";

const Nav = ({
  Auth,
  setAuth,
  userDetail,
  search,
  setSearch,
  setSidebar,
  sideMenu,
  SetsideMenu,
  products,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtredProducts, setfiltredProducts] = useState([]);
  const [hidemenu, setHideMenu] = useState(true);

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

  const Logout = () => {
    setAuth(false);
  };
  const navopen = () => {
    SetsideMenu(true);
  };
  const navclose = () => {
    SetsideMenu(false);
  };
  {
    /*
  return (
    <>
      <div className="nav">
        <div className="container">
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
                <Link className="link" to="/signup">
                  Sign up
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                ></input>

                {searchTerm && (
                  <div className="search-result-box">
                    {filtredProducts.length > 0 ? (
                      filtredProducts.map((item) => (
                        <div
                          className="search-result-item"
                          key={item.id}
                          onClick={() => alert("clicked")}
                        >
                          <img src={item.Img} alt={item.Title} width="40" />
                          <span>{item.Title}</span>
                        </div>
                      ))
                    ) : (
                      <p className="no-results">No results found</p>
                    )}
                  </div>
                )}

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
                  <h2>Account</h2>
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
  );*/
  }
  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src="./img/Logo-ElectroPNG.png" alt="Logo"></img>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {hidemenu && (
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
          )}
        </ul>
        <div className="search_bar">
          <input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setHideMenu(false)}
            onBlur={() => setHideMenu(true)}
            className={`search_bar ${hidemenu ? "" : "expanded"}`}
          ></input>

          {searchTerm && (
            <div className="search-result-box">
              {filtredProducts.length > 0 ? (
                filtredProducts.map((item) => (
                  <div
                    className="search-result-item"
                    key={item.id}
                    onClick={() => alert("clicked")}
                  >
                    <img src={item.Img} alt={item.Title} width="40" />
                    <span>{item.Title}</span>
                  </div>
                ))
              ) : (
                <p className="no-results">No results found</p>
              )}
            </div>
          )}

          <div className="search">
            <IoSearch />
          </div>
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
              <h2>Account</h2>
            )}
          </div>
        </div>

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
