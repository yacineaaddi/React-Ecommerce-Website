import React, { useState } from "react";
import Rout from "./rout";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/nav";
import Product from "./components/product";
import "./components/home.css";
import { CiHeart, CiSearch } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import Footer from "./components/footer";

const App = () => {
  // Storing User Detail In Usestate Hooks
  const [userDetail, setUserDetail] = useState("");
  const [Auth, setAuth] = useState(false);
  const [products, setProducts] = useState(Product);
  const [search, setSearch] = useState("");

  function OneProduct({ currEl }) {
    return (
      <div className="box">
        <div className="img-box">
          <img src={currEl.Img} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div className="icon">
              <CiHeart />
            </div>
            <div className="icon">
              <TfiReload />
            </div>
            <div className="icon">
              <CiSearch />
            </div>
          </div>
          <h3>{currEl.Title}</h3>
          <h4>{currEl.Price} $</h4>
          <button>Add To Cart</button>
        </div>
      </div>
    );
  }

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
        products={products}
        OneProduct={OneProduct}
        setProducts={setProducts}
      />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
