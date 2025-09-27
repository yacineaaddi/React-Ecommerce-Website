import React, { useState } from "react";
import Rout from "./rout";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/nav";
import Product from "./components/product";
const App = () => {
  // Storing User Detail In Usestate Hooks
  const [userDetail, setUserDetail] = useState("");
  const [Auth, setAuth] = useState(false);
  const [product, setProduct] = useState(Product);
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Nav
        Auth={Auth}
        setAuth={setAuth}
        userDetail={userDetail}
        search={search}
        setSearch={setSearch}
      />
      <Rout
        setUserDetail={setUserDetail}
        setAuth={setAuth}
        Auth={Auth}
        product={product}
      />
    </BrowserRouter>
  );
};

export default App;
