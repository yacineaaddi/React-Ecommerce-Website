import SingleProduct from "../components/singleProduct";
import { Route, Routes } from "react-router-dom";
import Contact from "../components/contact";
import Signup from "../components/Signup";
import Login from "../components/login";
import Shop from "../components/shop";
import About from "../components/about";
import Home from "../components/home";

const Rout = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id/:title" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default Rout;
