import { useEffect, useState } from "react";

import "./sidebar.css";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { db } from "./firebase";
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import useKey from "./usekey";
import { useRef } from "react";
import toast from "react-hot-toast";
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
  updatestate,
  StarRating,
  RemoveFromWishlist,
}) => {
  const [coupon, setCoupon] = useState(false);
  const Subtotal = cart.reduce((sum, p) => sum + +(p.Price * p.Qty), 0);

  const sideBar = useRef();
  /*
  useKey("Escape", function () {
    if (!sideBar.current.classList.contains("hidden")) {
      setSidebar(false);
      console.log(3);
    } else {
      return;
    }
  });
*/
  function SidebarProduct({ currEl }) {
    return (
      <>
        <div className="box">
          <div className="product-details">
            <div className="product">
              <img src={currEl.Img} alt="Product-image"></img>
            </div>

            <div className="product-detail">
              <h2>{currEl.Title.split(" ").slice(0, 7).join(" ")}</h2>
              <p>{currEl.Brand}</p>

              {sidebar === "cart" ? (
                <>
                  <p
                    style={{
                      color: "#2196f3",
                    }}
                  >{`${currEl.Price} $`}</p>
                  <p
                    style={{
                      color: currEl.State === "Available" ? "green" : "red",
                    }}
                  >
                    {currEl.State}
                  </p>
                  <div className="product-qty">
                    <button
                      className="decrement"
                      onClick={() => decreseQty(currEl)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="value"
                      disabled
                      value={currEl.State !== "Available" ? "" : currEl.Qty}
                      style={{
                        backgroundColor:
                          currEl.State !== "Available" ? "#E0E0E0" : "",
                      }}
                    ></input>
                    <button
                      className="increment"
                      onClick={() => increseQty(currEl)}
                    >
                      +
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="rating">
                    <StarRating defaultRating={currEl.Rating} />
                    <p>{currEl.Rating}</p>
                  </div>

                  <p
                    style={{
                      color: currEl.State === "Available" ? "green" : "red",
                    }}
                  >
                    {currEl.State}
                  </p>
                </>
              )}
            </div>

            <div className="delete">
              <div
                className="deleteBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  sidebar === "wishlist"
                    ? RemoveFromWishlist(currEl)
                    : RemoveFromCart(currEl);
                }}
              >
                <MdDeleteForever />
              </div>
              <p
                style={{
                  color: "green",
                }}
              >{`${(currEl.Price * currEl.Qty).toFixed(0)} $`}</p>
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

  const increseQty = async (data) => {
    if (data.State !== "Available") {
      toast.error("Out of stock");
      return;
    }
    try {
      const cartdataref = doc(db, "users", userDetail.id, "cart", data.id);
      await updateDoc(cartdataref, { Qty: data.Qty + 1 });
      updatestate();
      toast.success("Quantity added successfully!");
    } catch (error) {
      toast.error("Error increasing Quantity");
    }
  };

  const decreseQty = async (data) => {
    if (data.State !== "Available") {
      toast.error("Out of stock");
      return;
    }
    try {
      if (data.Qty > 1) {
        const cartdataref = doc(db, "users", userDetail.id, "cart", data.id);
        await updateDoc(cartdataref, { Qty: data.Qty - 1 });
        toast.success("Quantity decreased successfully!");
        updatestate();
      }
    } catch (error) {
      toast.error("Error decreasing Quantity");
    }
  };

  const RemoveFromCart = async (data) => {
    try {
      await deleteDoc(doc(db, "users", userDetail.id, "cart", data.id));
      fetchcartdata();
      toast.success("Product removed successfully!");
    } catch (error) {
      console.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchcartdata(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Auth]);

  const fetchcartdata = async () => {
    if (!userDetail?.id) return; // <-- prevent error
    const cartdata = await getDocs(
      collection(db, "users", userDetail.id, "cart")
    );
    const cartsnap = cartdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCart(cartsnap);
  };

  useEffect(() => {
    fetchWishListdata(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Auth]);

  const fetchWishListdata = async () => {
    if (!userDetail?.id) return; // <-- prevent error
    const wishlistdata = await getDocs(
      collection(db, "users", userDetail.id, "wishlist")
    );
    const wishlistsnap = wishlistdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWishlist(wishlistsnap);
  };

  return (
    <div ref={sideBar} className={`sidebar ${!sidebar ? "hidden" : ""}`}>
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
            {cart.length > 0 ? (
              cart?.map((currEl) => (
                <SidebarProduct currEl={currEl} key={currEl.id} />
              ))
            ) : (
              <div className="empty">
                <p>Cart is empty !</p>
              </div>
            )}
          </>
        )}
        {sidebar === "wishlist" && (
          <>
            {wishlist.length > 0 ? (
              wishlist?.map((currEl) => (
                <SidebarProduct currEl={currEl} key={currEl.id} />
              ))
            ) : (
              <div className="empty">
                <p>Wishlist is empty !</p>
              </div>
            )}
          </>
        )}
      </div>
      {sidebar === "cart" && (
        <div className="checkout">
          <h1>Order Summary</h1>
          <span onClick={() => setCoupon((e) => !e)}>Have a coupon code ?</span>
          {coupon && (
            <div className="box">
              <input type="text" placeholder="Coupon code"></input>
              <div className="submit">
                <FaArrowRightLong />
              </div>
            </div>
          )}
          <div className="checkout-details">
            <div className="description">
              <p>Subtotal</p>
              <p>Delivery</p>
              <p>Discount</p>
            </div>
            <div className="prices">
              <p>{`$ ${Subtotal}`}</p>
              <p>{`$ ${cart.length > 0 ? "15" : "0"}`}</p>
              <p>{`$ ${Subtotal + 15} `}</p>
            </div>
          </div>
          <hr></hr>
          <div className="checkout-details" style={{ color: "#2196f3" }}>
            <div className="description">
              <h3>Total</h3>
            </div>
            <div className="prices">
              <p>{`$ ${Subtotal + 15} `}</p>
            </div>
          </div>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
