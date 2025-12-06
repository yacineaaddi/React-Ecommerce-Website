import Rout from "./rout";

import Nav from "./components/nav";
import SideBar from "./components/sidebar";
import "./components/home.css";

import Footer from "./components/footer";
import SideMenu from "./components/sidemenu";
import Lightbox from "./components/lightbox";
import { useUi } from "./components/uiContext";

import { Toaster } from "react-hot-toast";
import "./App.css";

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
