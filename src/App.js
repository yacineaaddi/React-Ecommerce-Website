import SideMenu from "./components/sidemenu";
import Lightbox from "./components/lightbox";
import SideBar from "./components/sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";
import { useSelector } from "react-redux";
import Nav from "./components/nav";
import "./components/home.css";
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
