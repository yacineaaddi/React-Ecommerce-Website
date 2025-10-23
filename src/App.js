import React, { useState } from "react";
import Rout from "./rout";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/nav";
import SideBar from "./components/sidebar";
import Product from "./components/product1";
import "./components/home.css";
import { CiHeart, CiSearch } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import Footer from "./components/footer";
import StarRating from "./components/starRating";
import { db } from "./firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import "./App.css";

const App = () => {
  // Storing User Detail In Usestate Hooks
  const [userDetail, setUserDetail] = useState("");
  const [Auth, setAuth] = useState(false);
  const [products, setProducts] = useState(Product);
  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState();
  // Start : Firestore Add-to-Cart Function
  //Creates a React state variable
  const [cart, setCart] = useState([]); /**/
  //Reference to the "cartData" collection in Firestore
  const cartdbref = collection(db, "cartData"); /**/
  // Function to handle adding a product to the cart
  const addtocart = async (data) => {
    //Check if user is logged in
    if (Auth === false) {
      // stop the function if not logged in
      alert("Please Log In");
      return;
    } else {
      //1-Fetch all existing cart documents from Firestore
      const fetchcartdata = await getDocs(cartdbref);
      //Convert Firestore documents into plain JavaScript objects
      const cartsnap = fetchcartdata.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //Check if this product already exists in the user’s cart
      const findcartdata = cartsnap.find((x) => {
        return userDetail.id === x.userId && data.id === x.CartId;
      });

      //2-If product already exists in the cart, just update its quantity
      if (findcartdata) {
        //Finds a reference to the exact document in Firestore
        const cartdataref = doc(cartdbref, findcartdata.id);
        //Updates that document’s Qty field by adding 1
        await updateDoc(cartdataref, { Qty: findcartdata.Qty + 1 });
        alert("Quantity Added Successfully");
      }
      //If product doesn’t exist, add it as a new document
      else {
        //3
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
        alert("Product Added To Cart");
      }
    }
  };
  // End : Firestore Add-to-Cart Function

  function OneProduct({ currEl }) {
    return (
      <div className="box">
        <div className="img-box">
          <img src={currEl.Img} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div className="icon">
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
          <button onClick={() => addtocart(currEl)}>Add To Cart</button>
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
            <div className="icon">
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
          <button onClick={() => addtocart(currEl)}>Add To Cart</button>
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
            <div className="icon">
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
      <SideBar sidebar={sidebar} setSidebar={setSidebar} />
      <Nav
        Auth={Auth}
        setAuth={setAuth}
        userDetail={userDetail}
        search={search}
        setSearch={setSearch}
        setSidebar={setSidebar}
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
