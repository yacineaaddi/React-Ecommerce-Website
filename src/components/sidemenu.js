import { FaRegUser } from "react-icons/fa";
import "./sidemenu.css";
import useKey from "./useCustomHook";
import { useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const SideMenu = ({ sideMenu, SetsideMenu, userDetail, Auth }) => {
  const sidemenu = useRef();
  const navigate = useNavigate();

  function closeSideMenu() {
    SetsideMenu(() => false);
  }
  /*
  useKey("Escape", function () {
    if (!sidemenu.current.classList.contains("hidden")) {
      SetsideMenu(false);
      console.log(2);
    } else {
      return;
    }
  });*/
  return (
    <div ref={sidemenu} className={`sidemenu ${!sideMenu ? "hidden" : ""}`}>
      <button className="close-button" onClick={() => closeSideMenu()}>
        X
      </button>
      <div className="logo" onClick={() => navigate("/")}>
        <NavLink to="/">
          <img src="./img/Logo-Electro.png" alt="Logo"></img>
        </NavLink>
      </div>
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
    </div>
  );
};

export default SideMenu;
