import React, { useState } from "react";
import Rout from "./rout";
import { BrowserRouter } from "react-router-dom";
import Nav from "./nav";
const App = () => {
  // Storing User Detail In Usestate Hooks
  const [userDetail, setUserDetail] = useState("");
  const [Auth, setAuth] = useState(false);
  return (
    <BrowserRouter>
      <Nav Auth={Auth} setAuth={setAuth} userDetail={userDetail} />
      <Rout setUserDetail={setUserDetail} setAuth={setAuth} Auth={Auth} />
    </BrowserRouter>
  );
};

export default App;
