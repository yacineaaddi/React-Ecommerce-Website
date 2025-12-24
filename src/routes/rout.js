import SingleProduct from "../components/SingleProduct/singleProduct";
import { Route, Routes } from "react-router-dom";
import Contact from "../components/Contact/contact";
import Signup from "../components/SignUp/Signup";
import Login from "../components/Login/login";
import Shop from "../components/Shop/shop";
import About from "../components/About/about";
import Home from "../components/Home/home";

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
