import { useUi } from "./useContext/uiContext";
import SideMenu from "./components/sidemenu";
import Lightbox from "./components/lightbox";
import SideBar from "./components/sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";
import Nav from "./components/nav";
import "./components/home.css";
import Rout from "./routes/rout";
import "./styles/App.css";

const App = () => {
  const { lightbox, setlightbox } = useUi();

  return (
    <>
      {/*<UploadProductsOnce />*/}
      {lightbox && <Lightbox lightbox={lightbox} setlightbox={setlightbox} />}
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
