import React, { useState, useEffect } from "react";
import Rout from "./rout";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/nav";
import SideBar from "./components/sidebar";
import Product from "./components/product";
import "./components/home.css";
import { CiHeart, CiSearch } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import Footer from "./components/footer";
import StarRating from "./components/starRating";
import SideMenu from "./components/sidemenu";
import { db } from "./components/firebase";
import useKey from "./components/usekey";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import "./App.css";

const App = () => {
  const [userDetail, setUserDetail] = useState("");
  const [Auth, setAuth] = useState(false);
  const [products, setProducts] = useState(Product);
  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [sideMenu, SetsideMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const cartdbref = collection(db, "cartData");
  const wishListdbref = collection(db, "wishList");

  useKey("Escape", function () {
    SetsideMenu(false);
    setSidebar(false);
  });

  useEffect(() => {
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
  }, [sidebar, sideMenu]);

  function isInCart(p) {
    /*console.log(cart.some((item) => item.id === p.id));*/
  }
  function isWishlisted(p) {
    return cart.some((item) => item.id === p.id);
  }

  const updatestate = async () => {
    const fetchcartdata = await getDocs(cartdbref);
    const cartsnap = fetchcartdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCart(cartsnap);
  };
  const addtocart = async (data) => {
    //1-Check if user is logged in
    if (Auth === false) {
      //2-stop the function if not logged in
      alert("Please Log In");
      return;
    } else {
      //3-Fetch all existing cart documents from Firestore
      const fetchcartdata = await getDocs(cartdbref);
      //4-Convert Firestore documents into plain JavaScript objects
      const cartsnap = fetchcartdata.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //5-Check if this product already exists in the user’s cart
      const findcartdata = cartsnap.find((x) => {
        return userDetail.id === x.userId && data.id === x.CartId;
      });

      //6-If product already exists in the cart, just update its quantity
      if (findcartdata) {
        alert("Product already in cart");
      }
      //7-If product doesn’t exist, add it as a new document
      else {
        const addCartData = await addDoc(cartdbref, {
          userId: userDetail.id,
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
        alert("Product Added To Cart");
      }
    }
  };

  const addtowishlist = async (data) => {
    //Check if user is logged in
    if (Auth === false) {
      // stop the function if not logged in
      alert("Please Log In");
      return;
    } else {
      //1-Fetch all existing cart documents from Firestore
      const fetchwListchdata = await getDocs(wishListdbref);
      //Convert Firestore documents into plain JavaScript objects
      const cartsnap = fetchwListchdata.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //Check if this product already exists in the user’s cart
      const findwishlistdata = cartsnap.find((x) => {
        return userDetail.id === x.userId && data.id === x.CartId;
      });

      //2-If product already exists in the cart, just update its quantity
      if (findwishlistdata) {
        alert("Product Already In Wishlist");
      }
      //If product doesn’t exist, add it as a new document
      else {
        //3
        const addWishlistData = await addDoc(wishListdbref, {
          userId: userDetail.id,
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
        }); //1-Fetch all existing cart documents from Firestore
        const fetchwListchdata = await getDocs(wishListdbref);
        //Convert Firestore documents into plain JavaScript objects
        const cartsnap = fetchwListchdata.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWishlist(cartsnap);
        alert("Product Added To Wishlist");
      }
    }
  };
  function OneProduct({ currEl }) {
    return (
      <div className="box">
        <div className="img-box">
          <img src={currEl.Img} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div className="icon" onClick={() => addtowishlist(currEl)}>
              <CiHeart />
            </div>
            <div className="icon">
              <TfiReload />
            </div>
            <div className="icon">
              <CiSearch />
            </div>
          </div>
          <h3>{currEl.Title}</h3>
          <h4>{currEl.Price} $</h4>
          <button onClick={() => addtocart(currEl)}>
            {isInCart(currEl) ? "Already in cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    );
  }
  function ShopProduct({ currEl }) {
    return (
      <div className="box">
        <div className="img-box">
          <img src={currEl.Img} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div
              className="icon"
              onClick={() => addtowishlist(currEl)}
              style={{ display: isWishlisted(currEl) ? "none" : "block" }}
            >
              <CiHeart />
            </div>
            <div className="icon">
              <TfiReload />
            </div>
            <div className="icon">
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
      </div>
    );
  }
  function Specialoffers({ currEl }) {
    return (
      <div className="box">
        <div className="img-box">
          <img src={currEl.Img} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div className="icon" onClick={() => addtowishlist(currEl)}>
              <CiHeart />
            </div>
            <div className="icon">
              <TfiReload />
            </div>
            <div className="icon">
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
          <button onClick={() => addtocart(currEl)}>Add To Cart</button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
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
      />
      <Nav
        Auth={Auth}
        setAuth={setAuth}
        userDetail={userDetail}
        search={search}
        setSearch={setSearch}
        setSidebar={setSidebar}
        sideMenu={sideMenu}
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
      />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
