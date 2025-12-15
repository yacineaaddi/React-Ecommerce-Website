import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useUpdateStates } from "../useContext/updatestatesContext";
import { useEffect, useReducer, useState, useRef } from "react";
import { useWishlist } from "../useContext/wishlistContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../useContext/cartContext";
import { useAuth } from "../useContext/authContext";
import {} from "../useContext/updatestatesContext";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useUi } from "../useContext/uiContext";
import { db } from "../services/firebase";
/*import useKey from "./useCustomHook";*/
import StarRating from "./starRating";
import toast from "react-hot-toast";
import "./sidebar.css";

const SideBar = () => {
  const {
    addtocart,
    updatestate,
    RemoveFromWishlist,
    increaseQty,
    decreseQty,
    reducer,
  } = useUpdateStates();
  const initialstate = "";
  const { userDetail, Auth } = useAuth();
  const { cart, setCart } = useCart();
  const { sidebar, setSidebar } = useUi();
  const { wishlist, setWishlist } = useWishlist();
  const [coupon, setCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const Subtotal = cart.reduce((sum, p) => sum + +(p.Price * p.Qty), 0);
  const [state, dispatch] = useReducer(reducer, initialstate);

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
              <img src={currEl.Img[0]} alt="Product-image"></img>
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
                      onClick={() =>
                        decreseQty(currEl, userDetail.id, updatestate)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="value"
                      disabled
                      value={currEl.Qty < 1 ? "" : currEl.Qty}
                      style={{
                        backgroundColor: currEl.Qty < 1 ? "#E0E0E0" : "",
                      }}
                    ></input>
                    <button
                      className="increment"
                      onClick={() =>
                        increaseQty(currEl, userDetail.id, updatestate)
                      }
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
                onClick={() => {
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
          <hr></hr>
        </div>
      </>
    );
  }

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
    if (!userDetail?.id) return;
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
      <button className="close-btn" onClick={() => setSidebar(() => "")}>
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
              <input
                type="text"
                placeholder="Coupon code"
                onChange={(e) => setCouponCode(e.target.value)}
              ></input>
              <div className="submit">
                <FaArrowRightLong
                  onClick={() => dispatch({ type: `${couponCode}` })}
                />
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
              <p>{state ? `${state}%` : "0%"}</p>
            </div>
          </div>
          <hr></hr>
          <div className="checkout-details" style={{ color: "#2196f3" }}>
            <div className="description">
              <h3>Total</h3>
            </div>
            <div className="prices">
              <p>{`$ ${Subtotal + 15 - (((Subtotal * state) / 100) | 0)} `}</p>
            </div>
          </div>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
