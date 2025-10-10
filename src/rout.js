import React from "react";
import Register from "./components/register";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Shop from "./components/shop";

const Rout = ({
  setUserDetail,
  setAuth,
  Auth,
  products,
  OneProduct,
  Button,
  setProducts,
  ShopProduct,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={
            <Register
              setUserDetail={setUserDetail}
              setAuth={setAuth}
              Auth={Auth}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setUserDetail={setUserDetail}
              setAuth={setAuth}
              Auth={Auth}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              setUserDetail={setUserDetail}
              products={products}
              OneProduct={OneProduct}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop
              products={products}
              OneProduct={OneProduct}
              setProducts={setProducts}
              ShopProduct={ShopProduct}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Rout;
