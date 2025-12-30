// Import components that correspond to individual pages
import SingleProductPage from "../components/SingleProduct/SingleProductPage";
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
      {/* Define all application routes */}
      <Routes>
        {/* Auth pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Shop listing */}
        <Route path="/shop" element={<Shop />} />

        {/* Dynamic product details route (id + title params) */}
        <Route
          path="/shop/product/:id/:title"
          element={<SingleProductPage />}
        />

        {/* Static pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};
// Export component
export default Rout;
