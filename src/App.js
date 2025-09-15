import React, { useState } from "react";
import Rout from "./rout";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  // Storing User Detail In Usestate Hooks
  const [userDetail, setUserDetail] = useState("");
  return (
    <BrowserRouter>
      <Rout setUserDetail={setUserDetail} />
    </BrowserRouter>
  );
};

export default App;
