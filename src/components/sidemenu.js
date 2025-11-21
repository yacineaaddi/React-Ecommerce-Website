import { FaRegUser } from "react-icons/fa";
import "./sidemenu.css";
import useKey from "./useCustomHook";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideMenu = ({ sideMenu, SetsideMenu, userDetail, Auth }) => {
  const sidemenu = useRef();
  const navigate = useNavigate();
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
      <button className="close-button" onClick={() => SetsideMenu(() => false)}>
        X
      </button>
      <div className="logo" onClick={() => navigate("/")}>
        <img src="./img/Logo-Electro.png" alt="Logo"></img>
      </div>
      <ul>
        <li onClick={() => SetsideMenu(false)}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => SetsideMenu(false)}>
          <Link to="/shop">Shop</Link>
        </li>
        <li onClick={() => SetsideMenu(false)}>
          <Link to="/about">About</Link>
        </li>
        <li onClick={() => SetsideMenu(false)}>
          <Link to="/contact">Contact</Link>
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
