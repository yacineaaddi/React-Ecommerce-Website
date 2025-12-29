// React Router for navigation and links
import { NavLink, useNavigate } from "react-router-dom";

// Redux hooks for dispatching actions and accessing state
import { useDispatch, useSelector } from "react-redux";

// Action to toggle the side menu visibility
import { SetsideMenu } from "../../features/ui/uiSlice";

// Icon for user representation
import { FaRegUser } from "react-icons/fa";

// React hook for referencing DOM elements
import { useRef } from "react";

// Component-specific styles
import "./sidemenu.css";

const SideMenu = () => {
  // Get authentication details from Redux
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);

  // Get UI state for whether the side menu is open
  const { sideMenu } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const sidemenu = useRef();
  const navigate = useNavigate();

  // Close the side menu by dispatching the Redux action
  function closeSideMenu() {
    dispatch(SetsideMenu(false));
  }

  /*
  // Optional: Close side menu on Escape key press
  useKey("Escape", function () {
    if (!sidemenu.current.classList.contains("hidden")) {
      dispatch(SetsideMenu(false));
      console.log(2);
    } else {
      return;
    }
  });
  */

  return (
    <div ref={sidemenu} className={`sidemenu ${!sideMenu ? "hidden" : ""}`}>
      {/* Close button */}
      <button className="close-button" onClick={() => closeSideMenu()}>
        X
      </button>

      {/* Logo section */}
      <div className="logo" onClick={() => navigate("/")}>
        <NavLink to="/">
          <img src="./img/Logo-Electro.png" alt="Logo"></img>
        </NavLink>
      </div>

      {/* Navigation links */}
      <ul>
        <li onClick={() => closeSideMenu()}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li onClick={() => closeSideMenu()}>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li onClick={() => closeSideMenu()}>
          <NavLink to="/about">About</NavLink>
        </li>
        <li onClick={() => closeSideMenu()}>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>

      {/* User information */}
      <div className="user-detail">
        <div className="icon">
          <FaRegUser />
        </div>
        <div className="detail">
          {isAuthenticated ? (
            <>
              <h2>{userDetail.Name}</h2>
            </>
          ) : (
            // Prompt login if not authenticated
            <h2>Please, Sign in</h2>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the component
export default SideMenu;
