import { useState, useEffect } from "react";
import Rout from "./rout";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/nav";
import SideBar from "./components/sidebar";
import Product from "./components/product";
import "./components/home.css";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import Footer from "./components/footer";
import StarRating from "./components/starRating";
import SideMenu from "./components/sidemenu";
import { db } from "./components/firebase";
import Lightbox from "./components/lightbox";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";

const App = () => {
  const [userDetail, setUserDetail] = useState("");
  const [Auth, setAuth] = useState(false);
  const [products, setProducts] = useState(Product);
  const [sidebar, setSidebar] = useState(false);
  const [sideMenu, SetsideMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [lightbox, setlightbox] = useState();

  {
    /*useEffect(() => {
    const isAnyOpen = sidebar || sideMenu;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isAnyOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [sidebar, sideMenu]);*/
  }
  function isInCart(p) {
    return cart.some((product) => String(product.CartId) === String(p.id));
  }
  function isWishlisted(p) {
    return wishlist.some((product) => String(product.CartId) === String(p.id));
  }

  const updatestate = async () => {
    if (!userDetail?.id) return;
    const cartRef = collection(db, "users", userDetail.id, "cart");
    const fetchcartdata = await getDocs(cartRef);
    const cartsnap = fetchcartdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCart(cartsnap);
  };
  const addtocart = async (data) => {
    if (!Auth || !userDetail?.id) {
      toast.error("Please Log In");
      return;
    }

    const cartRef = collection(db, "users", userDetail.id, "cart");
    const fetchcartdata = await getDocs(cartRef);
    const cartsnap = fetchcartdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const findcartdata = cartsnap.find((x) => x.CartId === data.id);

    if (findcartdata) {
      toast.success("Product already in cart");
    } else {
      await addDoc(cartRef, {
        CartId: data.id,
        Title: data.Title,
        Cat: data.Cat,
        Price: data.Price,
        Img: data.Img,
        SubCat: data.SubCat,
        Brand: data.Brand,
        Model: data.Model,
        WebCode: data.WebCode,
        Rating: data.Rating,
        NumRev: data.NumRev,
        State: data.State,
        Qty: 1,
      });
      updatestate();
      toast.success("Product Added To Cart");
    }
  };

  const RemoveFromWishlist = async (data) => {
    if (!userDetail?.id) return;
    try {
      //Build the Firestore reference to the exact wishlist item
      const wishlistRef = doc(db, "users", userDetail.id, "wishlist", data.id);
      //Deletes the product from the user's wishlist
      await deleteDoc(wishlistRef);
      //Re-fetch the updated wishlist, Reads all remaining wishlist items belonging to this user
      const updatedWishlistData = await getDocs(
        collection(db, "users", userDetail.id, "wishlist")
      );
      //Turns Firestore documents into plain objects
      const updatedWishlist = updatedWishlistData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //Update your React state
      setWishlist(updatedWishlist);
      toast.success("Product removed successfully!");
    } catch (error) {
      toast.error("Error deleting product: ", error);
    }
  };

  // Add product to wishlist
  const addtowishlist = async (data) => {
    if (!Auth) {
      toast.error("Please Log In");
      return;
    }
    if (!userDetail?.id) return;

    const wishlistRef = collection(db, "users", userDetail.id, "wishlist");
    const fetchWishlistData = await getDocs(wishlistRef);
    const wishlistSnap = fetchWishlistData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const findwishlistdata = wishlistSnap.find((x) => x.CartId === data.id);

    if (findwishlistdata) {
      RemoveFromWishlist(findwishlistdata);
    } else {
      await addDoc(wishlistRef, {
        CartId: data.id,
        Title: data.Title,
        Cat: data.Cat,
        Price: data.Price,
        Img: data.Img,
        SubCat: data.SubCat,
        Brand: data.Brand,
        Model: data.Model,
        WebCode: data.WebCode,
        Rating: data.Rating,
        NumRev: data.NumRev,
        State: data.State,
        Qty: 1,
      });

      const updatedWishlistData = await getDocs(wishlistRef);
      const updatedWishlist = updatedWishlistData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishlist(updatedWishlist);
      toast.success("Product Added To Wishlist");
    }
  };
  function OneProduct({ currEl }) {
    return (
      <div
        className="box"
        onClick={(e) => {
          if (e.target.closest(".icon") || e.target.closest("button")) {
            return;
          }

          alert("yes");
        }}
      >
        <div className="img-box">
          <img src={currEl.Img[0]} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div className="icon" onClick={() => addtowishlist(currEl)}>
              <FaHeart color={isWishlisted(currEl) ? "red" : ""} />
            </div>
            <div
              className="icon"
              onClick={() => {
                setlightbox(currEl.id);
              }}
            >
              <CiSearch />
            </div>
          </div>
          <h3>{currEl.Title}</h3>
          <h4>{currEl.Price} $</h4>
          <button onClick={() => addtocart(currEl)}>
            {isInCart(currEl) ? "Already in cart" : "Add To Cart"}
          </button>
        </div>
        {isWishlisted(currEl) ? (
          <div className="wishlist-icon">
            <FaHeart color="red" />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  function ShopProduct({ currEl }) {
    return (
      <div
        className="box"
        onClick={(e) => {
          if (e.target.closest(".icon") || e.target.closest("button")) {
            return;
          }

          alert("yes");
        }}
      >
        <div className="img-box">
          <img src={currEl.Img[0]} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div className="icon" onClick={() => addtowishlist(currEl)}>
              <FaHeart color={isWishlisted(currEl) ? "red" : ""} />
            </div>
            <div
              className="icon"
              onClick={() => {
                setlightbox(currEl.id);
              }}
            >
              <CiSearch />
            </div>
          </div>

          <h3>{currEl.Title}</h3>
          <div className="prod-details">
            <div className="rating">
              <StarRating defaultRating={currEl.Rating} />
              <p>{currEl.Rating}</p>
              <p>({currEl.NumRev} reviews)</p>
            </div>
            <div
              className="productState"
              style={{
                color: currEl.State === "Available" ? "green" : "red",
              }}
            >
              {currEl.State}
            </div>
          </div>
          <h4>{currEl.Price} $</h4>
          <button onClick={() => addtocart(currEl)}>
            {isInCart(currEl) ? "Already in cart" : "Add To Cart"}
          </button>
        </div>
        {isWishlisted(currEl) ? (
          <div className="wishlist-icon">
            <FaHeart color="red" />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  function Specialoffers({ currEl }) {
    return (
      <div
        className="box"
        onClick={(e) => {
          if (e.target.closest(".icon") || e.target.closest("button")) {
            return;
          }

          alert("yes");
        }}
      >
        <div className="img-box">
          <img src={currEl.Img[0]} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div className="icon" onClick={() => addtowishlist(currEl)}>
              <FaHeart color={isWishlisted(currEl) ? "red" : ""} />
            </div>
            <div
              className="icon"
              onClick={() => {
                setlightbox(currEl.id);
              }}
            >
              <CiSearch />
            </div>
          </div>

          <h3>{currEl.Title}</h3>
          <div className="prod-details">
            <div className="rating">
              <StarRating defaultRating={currEl.Rating} />
              <p>{currEl.Rating}</p>
              <p>({currEl.NumRev} reviews)</p>
            </div>
          </div>
          <div className="discount">
            <h4
              style={{
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {currEl.Price} $
            </h4>
            <h4 style={{ color: "red", fontWeight: "bold" }}>
              {currEl.DisountedPrice} $
            </h4>
          </div>
          <button onClick={() => addtocart(currEl)}>
            {isInCart(currEl) ? "Already in cart" : "Add To Cart"}
          </button>
        </div>
        {isWishlisted(currEl) ? (
          <div className="wishlist-icon">
            <FaHeart color="red" />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <BrowserRouter>
      {lightbox && <Lightbox lightbox={lightbox} setlightbox={setlightbox} />}
      <Toaster position="buttom-center" reverseOrder={false} />
      <SideMenu
        sideMenu={sideMenu}
        SetsideMenu={SetsideMenu}
        userDetail={userDetail}
        Auth={Auth}
      />
      <SideBar
        sidebar={sidebar}
        setSidebar={setSidebar}
        userDetail={userDetail}
        cart={cart}
        setCart={setCart}
        Auth={Auth}
        wishlist={wishlist}
        setWishlist={setWishlist}
        addtocart={addtocart}
        updatestate={updatestate}
        StarRating={StarRating}
        RemoveFromWishlist={RemoveFromWishlist}
      />
      <Nav
        Auth={Auth}
        setAuth={setAuth}
        userDetail={userDetail}
        setSidebar={setSidebar}
        SetsideMenu={SetsideMenu}
        products={products}
      />
      <Rout
        setUserDetail={setUserDetail}
        setAuth={setAuth}
        Auth={Auth}
        products={products}
        OneProduct={OneProduct}
        setProducts={setProducts}
        ShopProduct={ShopProduct}
        Specialoffers={Specialoffers}
        userDetail={userDetail}
      />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
