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
                <button className="decrement">-</button>
                <input
                  type="number"
                  className="value"
                  disabled
                  value={currEl.Qty}
                ></input>
                <button className="increment">+</button>
              </div>
            </div>

            <div className="delete">
              <div
                className="deleteBtn"
                onClick={() =>
                  sidebar === "wishlist"
                    ? RemoveFromWishlist(currEl)
                    : RemoveFromCart(currEl)
                }
              >
                <MdDeleteForever />
              </div>
              <p>{`${currEl.Price * currEl.Qty} $`}</p>
            </div>
          </div>
          {sidebar === "wishlist" && (
            <div className="add-to-cart" onClick={() => addtocart(currEl)}>
              Add To Cart
            </div>
          )}
        </div>
      </>
    );
  }
  const RemoveFromCart = async (data) => {
    try {
      await deleteDoc(doc(cartdbref, data.id));

      const updatedCartData = await getDocs(cartdbref);
      const updatedCart = updatedCartData.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((x) => x.userId === userDetail.id);

      setCart(updatedCart);
      alert("Product removed successfully from your cart!");
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };
  const RemoveFromWishlist = async (data) => {
    try {
      await deleteDoc(doc(wishListdbref, data.id));

      const updatedWishlistData = await getDocs(wishListdbref);
      const updatedWishlist = updatedWishlistData.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((x) => x.userId === userDetail.id);

      setWishlist(updatedWishlist);
      alert("Product removed successfully from your wishlist!");
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

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
