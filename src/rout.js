import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Shop from "./components/shopV2";
import Contact from "./components/contact";
import About from "./components/about";
import SingleProduct from "./components/singleProduct";

const Rout = ({
  setUserDetail,
  setAuth,
  Auth,
  Productbox,
  products,
  setProducts,
  userDetail,
  setlightbox,
  wishlist,
  updatewishlist,
  addtocart,
  isInCart,
  updatestate,
  cart,
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
          element={<Home products={products} Productbox={Productbox} />}
        />
        <Route
          path="/shop"
          element={
            <Shop
              products={products}
              setProducts={setProducts}
              Productbox={Productbox}
            />
          }
        />
        <Route
          path="/shop/product/:id/:title"
          element={
            <SingleProduct
              setlightbox={setlightbox}
              wishlist={wishlist}
              updatewishlist={updatewishlist}
              addtocart={addtocart}
              isInCart={isInCart}
              userDetail={userDetail}
              cart={cart}
              updatestate={updatestate}
              Productbox={Productbox}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default Rout;
