import SideMenu from "./components/Sidemenu/sidemenu";
import Lightbox from "./components/Lightbox/lightbox";
import SideBar from "./components/Sidebar/sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/footer";
import { useSelector } from "react-redux";
import Nav from "./components/Nav/nav";
import "./components/Home/home.css";
import Rout from "./routes/rout";
import "./styles/App.css";

const App = () => {
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
