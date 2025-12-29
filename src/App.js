// UI components used throughout the app
import SideMenu from "./components/Sidemenu/sidemenu";
import Lightbox from "./components/Lightbox/lightbox";
import SideBar from "./components/Sidebar/sidebar";

// Toast notifications library
import { Toaster } from "react-hot-toast";

// Layout components
import Footer from "./components/Footer/footer";
import Nav from "./components/Nav/nav";

// Access Redux state
import { useSelector } from "react-redux";

// Global styles and routing
import "./components/Home/home.css";
import Rout from "./routes/rout";
import "./styles/App.css";

const App = () => {
  // Get the lightbox visibility flag from the UI slice of Redux state
  const { lightbox } = useSelector((state) => state.ui);

  return (
    <>
      {/*<UploadProductsOnce />*/}
      {lightbox && <Lightbox />}
      <Toaster position="buttom-center" reverseOrder={false} />
      <SideMenu />
      <SideBar />
      <Nav />
      <Rout />
      <Footer />
    </>
  );
};

export default App;
