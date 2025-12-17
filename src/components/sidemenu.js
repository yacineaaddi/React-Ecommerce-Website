import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../useContext/authContext";
import { useUi } from "../useContext/uiContext";
import { FaRegUser } from "react-icons/fa";
import useKey from "../hooks/useKeyHook";
import { useRef } from "react";
import "./sidemenu.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setUserDetail } from "../features/auth/authSlice";

const SideMenu = () => {
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const sidemenu = useRef();
  const navigate = useNavigate();
  /*const { userDetail, Auth } = useAuth();*/
  const { sideMenu, SetsideMenu } = useUi();

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
          {isAuthenticated ? (
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
