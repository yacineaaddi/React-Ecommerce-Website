import { useEffect, useState } from "react";

import "./sidebar.css";

const SideBar = ({ sidebar, setSidebar }) => {
  return (
    <div className={`sidebar ${!sidebar ? "hidden" : ""}`}>
      <button className="close-btn" onClick={() => setSidebar((e) => !e)}>
        X
      </button>
    </div>
  );
};

export default SideBar;
