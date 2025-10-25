import { useEffect, useState } from "react";

import "./sidebar.css";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { db } from "./firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const SideBar = ({
  sidebar,
  setSidebar,
  userDetail,
  setCart,
  cart,
  Auth,
  wishlist,
  setWishlist,
  addtocart,
}) => {
  //Reference to the "cartData" collection in Firestore
  const cartdbref = collection(db, "cartData");
  const wishListdbref = collection(db, "wishList"); /**/

  function SidebarProduct({ currEl }) {
    return (
      <>
        <div className="box">
          <div className="product-details">
            <div className="product">
              <img src={currEl.Img} alt="Product-image"></img>
            </div>

            <div className="product-detail">
              <h2>{currEl.Title.split(" ").slice(0, 5).join(" ")}</h2>
              <p>{currEl.Brand}</p>

              <div className="product-qty">
                <button
                  className="quantity"
                  onClick={() => RemoveFromCart(currEl)}
                >
                  -
                </button>
                <input type="number" disabled value={currEl.Qty}></input>
                <button className="quantity">+</button>
              </div>
            </div>

            <div className="delete">
              <div className="deleteBtn">
                <MdDeleteForever />
              </div>
              <p>{`${currEl.Price * currEl.Qty} $`}</p>
            </div>
          </div>
          {sidebar === "wishlist" ? (
            <div className="add-to-cart" onClick={() => addtocart(currEl)}>
              Add To Cart
            </div>
          ) : (
            <div className="add-to-cart" onClick={() => RemoveFromCart(currEl)}>
              Remove From Cart
            </div>
          )}
        </div>
      </>
    );
  } /*First Method*/
  const RemoveFromCart = async (data) => {
    try {
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
        await deleteDoc(cartdataref);

        //1-Fetch all existing cart documents from Firestore
        const fetchcartdata = await getDocs(cartdbref);
        //Convert Firestore documents into plain JavaScript objects
        const cartsnap = fetchcartdata.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCart(cartsnap);
        console.log(cartsnap);

        alert("Product removed successfully from your cart!");
      }
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }; /**/

  /*Second Method*/ /*
        const RemoveFromCart = async (data) => {
        
          try {
            await deleteDoc(doc(db, "cartData", data.id));
          //1-Fetch all existing cart documents from Firestore
                  const fetchcartdata = await getDocs(cartdbref);
                  //Convert Firestore documents into plain JavaScript objects
                  const cartsnap = fetchcartdata.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
            setCart(cartsnap);
            console.log(cartsnap)
             alert("Item deleted!");
        }
        catch (error) { console.error("Error deleting product: ", error) }
        /**/

  useEffect(() => {
    fetchcartdata();
  }, [Auth]);

  const fetchcartdata = async () => {
    const cartdata = await getDocs(cartdbref);
    //Convert Firestore documents into plain JavaScript objects
    const cartsnap = cartdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    //Check if this product already exists in the user’s cart
    const findcartdata = cartsnap.filter((x) => {
      return userDetail.id === x.userId;
    }); //IIIIIIINFINIT LOOP
    setCart(findcartdata);
    console.log(findcartdata);
  };

  useEffect(() => {
    fetchWishListdata();
  }, [Auth]);

  const fetchWishListdata = async () => {
    const cartdata = await getDocs(wishListdbref);
    //Convert Firestore documents into plain JavaScript objects
    const wishlistsnap = cartdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    //Check if this product already exists in the user’s cart
    const findwishListdata = wishlistsnap.filter((x) => {
      return userDetail.id === x.userId;
    }); //IIIIIIINFINIT LOOP
    setWishlist(findwishListdata);
    console.log(findwishListdata);
  };

  /*const [quantity, setQuantity] = useState(1);*/
  return (
    <div className={`sidebar ${!sidebar ? "hidden" : ""}`}>
      <button className="close-btn" onClick={() => setSidebar((e) => "")}>
        X
      </button>
      <div className="title">
        {sidebar === "cart" && (
          <>
            <FaShoppingCart />
            <p>Your Cart</p>
          </>
        )}
        {sidebar === "wishlist" && (
          <>
            <FaHeart />
            <p>Whishlist</p>
          </>
        )}
      </div>
      <div className="line"></div>

      <div className="products">
        {sidebar === "cart" && (
          <>
            {cart ? (
              cart?.map((currEl) => (
                <SidebarProduct currEl={currEl} key={currEl.id} />
              ))
            ) : (
              <p>Cart is empty !</p>
            )}
          </>
        )}
        {sidebar === "wishlist" && (
          <>
            {wishlist ? (
              wishlist?.map((currEl) => (
                <SidebarProduct currEl={currEl} key={currEl.id} />
              ))
            ) : (
              <p>Wishlist is empty !</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
