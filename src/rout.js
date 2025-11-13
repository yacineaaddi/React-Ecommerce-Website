import Signup from "./components/Signup";
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
  setProducts,
  ShopProduct,
  Specialoffers,
  userDetail,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={<Signup setUserDetail={setUserDetail} setAuth={setAuth} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setUserDetail={setUserDetail}
              setAuth={setAuth}
              Auth={Auth}
              userDetail={userDetail}
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
              ShopProduct={ShopProduct}
              Specialoffers={Specialoffers}
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
