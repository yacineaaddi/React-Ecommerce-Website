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

// Navigation component
const Nav = () => {
  // Get user and auth state from Redux
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);

  // Get products list
  const { products } = useSelector((state) => state.product);

  // Local state values
  const [filtredProducts, setfiltredProducts] = useState([]); 
  const [disableBlur, setDisableBlur] = useState(false);      
  const [enableblur, setEnableblur] = useState(true);         
  const [searchTerm, setSearchTerm] = useState("");           
  const [hidemenu, setHideMenu] = useState(true);           

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle blur/hover logic for search dropdown
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

  // Add sticky effect on navbar when scrolling
  useEffect(() => {
    function handleScroll() {
      const nav = document.querySelector(".nav");
      if (!nav) return;

      // Add active class when page scrolls down
      if (window.scrollY < 50) {
        nav.classList.remove("active");
      } else {
        nav.classList.add("active");
      }
    }

    window.addEventListener("scroll", handleScroll);
  }, []);

  // Filter products based on search input
  useEffect(() => {
    // If input empty → clear results
    if (searchTerm.trim() === "") {
      setfiltredProducts([]);
      return;
    }

    // Filter by title or category
    const results = products.filter(
      (item) =>
        item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Cat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setfiltredProducts(results);
  }, [searchTerm]);

  // Input reference
  const inputEl = useRef(null);

  return (
    <>
      <div className="nav">
        {/* Mobile side menu button */}
        <div
          className="menu-button"
          onClick={() => dispatch(SetsideMenu(true))}
        >
          <FiMenu />
        </div>

        {/* Logo */}
        <div className="logo">
          <NavLink to="/">
            <img src="./img/Logo-ElectroPNG.png" alt="Logo" />
          </NavLink>
        </div>

        {/* Main navigation links */}
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

        {/* Search bar */}
        <div className={`search_bar ${hidemenu ? "" : "expanded"}`}>
          <input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setHideMenu(false)}
            className="search_input"
            onBlur={() => {
              // Hide menu when input loses focus
              if (enableblur) {
                setHideMenu(true);
                setSearchTerm("");
              }
            }}
            ref={inputEl}
          />

          {/* Search icon */}
          <div className="search">
            <IoSearch />
          </div>

          {/* Search dropdown list */}
          {searchTerm && (
            <div
              className="search-result-box"
              onMouseEnter={() => setDisableBlur(true)}
              onMouseLeave={() => setDisableBlur(false)}
            >
              {filtredProducts.length > 0 ? (
                filtredProducts.map((item) => (
                  <div
                    className="search-result-item"
                    key={item.id}
                    onClick={() => {
                      // Navigate to product page when clicked
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
                    <span>
                      {item.Title.split(" ").slice(0, 5).join(" ")}
                    </span>
                    <p>{item.Price} $</p>
                  </div>
                ))
              ) : (
                <p className="no-results">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar shortcut buttons */}
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

        {/* Display user info when logged in */}
        {isAuthenticated && (
          <div className="user-detail">
            <div className="icon">
              <FaRegUser />
            </div>
            <div className="detail">
              <h2>{userDetail.Name}</h2>
            </div>
          </div>
        )}

        {/* Login / Logout buttons */}
        <div className="login-signup">
          {isAuthenticated ? (
            <p>
              <NavLink className="link" to="/" onClick={() => dispatch(logout())}>
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

// Export component
export default Nav;

