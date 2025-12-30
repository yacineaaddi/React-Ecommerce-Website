// Import user icon , shopping cart icon, and heart from react-icons
import { FaRegUser, FaShoppingCart, FaHeart } from "react-icons/fa";

// Import UI actions to toggle sidebar and side menu
import { setSidebar, SetsideMenu } from "../../features/ui/uiSlice";

// Redux hooks: dispatch actions and read values from state
import { useDispatch, useSelector } from "react-redux";

// React hooks for lifecycle, local state, and DOM references
import { useEffect, useState, useRef } from "react";

// Import logout action to sign the user out
import { logout } from "../../features/auth/authSlice";

// Hook for navigating programmatically between routes
import { useNavigate } from "react-router-dom";

// Import search icon
import { IoSearch } from "react-icons/io5";

// NavLink component for navigation links with active styles
import { NavLink } from "react-router-dom";

// Custom keyboard shortcut hook (currently disabled/commented out)
// import useKey from "../hooks/useKeyHook";

// Menu (hamburger) icon for mobile navigation
import { FiMenu } from "react-icons/fi";

import "./nav.css";

const Nav = () => {
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const [filtredProducts, setfiltredProducts] = useState([]);
  const [disableBlur, setDisableBlur] = useState(false);
  const [enableblur, setEnableblur] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hidemenu, setHideMenu] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      if (disableBlur) {
        setEnableblur(false);
        console.log("false");
      } else {
        setEnableblur(true);
        console.log("true");
      }
    }
    handleScroll();
  }, [disableBlur]);

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

  const inputEl = useRef(null);

  return (
    <>
      <div className="nav">
        <div
          className="menu-button"
          onClick={() => dispatch(SetsideMenu(true))}
        >
          <FiMenu />
        </div>
        <div className="logo">
          <NavLink to="/">
            <img src="./img/Logo-ElectroPNG.png" alt="Logo"></img>
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>

          <>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Contact
              </NavLink>
            </li>
          </>
        </ul>
        <div className={`search_bar ${hidemenu ? "" : "expanded"}`}>
          <input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setHideMenu(false)}
            className="search_input"
            onBlur={() => {
              if (enableblur) {
                setHideMenu(true);
                setSearchTerm("");
              }
            }}
            ref={inputEl}
          ></input>

          <div className="search">
            <IoSearch />
          </div>
          {searchTerm && (
            <div
              className="search-result-box"
              onMouseEnter={() => setDisableBlur(true)} // fires before blur
              onMouseLeave={() => setDisableBlur(false)}
            >
              {filtredProducts.length > 0 ? (
                filtredProducts.map((item) => (
                  <div
                    className="search-result-item"
                    key={item.id}
                    onClick={() => {
                      navigate(
                        `shop/product/${item?.id}/${item?.Title.split(" ")
                          .slice()
                          .join("-")}`
                      );
                      setSearchTerm("");
                      setHideMenu(true);
                    }}
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
          <div className="cart" onClick={() => dispatch(setSidebar("cart"))}>
            <FaShoppingCart />
            <p>Cart</p>
          </div>
          <div
            className="wishlist"
            onClick={() => dispatch(setSidebar("wishlist"))}
          >
            <FaHeart />

            <p>Wishlist</p>
          </div>
        </div>
        {isAuthenticated && (
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
          {isAuthenticated ? (
            <p>
              <NavLink
                className="link"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </NavLink>
            </p>
          ) : (
            <p>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active-link" : "link"
                }
                to="/login"
              >
                Login
              </NavLink>
              &nbsp;/&nbsp;
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active-link" : "link"
                }
                to="/signup"
              >
                Sign up
              </NavLink>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
