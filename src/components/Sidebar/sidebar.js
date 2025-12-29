// Firestore functions to access collections, fetch documents, and subscribe to real-time updates
import { collection, onSnapshot } from "firebase/firestore";

// async thunk function
import { fetchCart } from "../../features/cart/cartThunk";
import { fetchWishlist } from "../../features/wishlist/wishlistThunks";

// Redux actions for updating wishlist and coupon state
import { setWishlist } from "../../features/wishlist/wishListSlice";
import { setReduction } from "../../features/coupon/couponSlice";

// React hooks
import { useEffect, useState, useRef } from "react";

// Icons from React Icons library
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

// Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/cart/cartSlice";
import { setSidebar } from "../../features/ui/uiSlice";

// import sidebarProduct component
import SidebarProduct from "./sidebarProduct";

// Firestore database instance
import { db } from "../../services/firebase";

// custom hook for key events
// import useKey from "./useCustomHook";

// Component-specific CSS
import "./sidebar.css";

const SideBar = () => {
  // Redux state selectors
  const { cart } = useSelector((state) => state.cart);
  const { sidebar } = useSelector((state) => state.ui);
  const { userDetail } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { reduction } = useSelector((state) => state.coupon);

  const dispatch = useDispatch();
  // Ref for the sidebar DOM element
  const sideBar = useRef();

  // Real-time Firestore subscription for cart updates
  useEffect(() => {
    if (!userDetail?.id) return;

    const unsub = onSnapshot(
      collection(db, "users", userDetail.id, "cart"),
      (snapshot) => {
        dispatch(
          setCart(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        );
      }
    );

    // Cleanup subscription on unmount
    return () => unsub();
  }, [userDetail?.id, dispatch]);

  // Real-time Firestore subscription for wishlist updates
  useEffect(() => {
    if (!userDetail?.id) return;

    const unsub = onSnapshot(
      collection(db, "users", userDetail.id, "wishlist"),
      (snapshot) => {
        dispatch(
          setWishlist(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      }
    );

    // Cleanup subscription on unmount
    return () => unsub();
  }, [userDetail?.id, dispatch]);

  // Local state for coupon display and input
  const [coupon, setCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // Calculate subtotal of cart
  const Subtotal = cart.reduce((sum, p) => sum + +(p.Price * p.Qty), 0);

  /*
  // Optional Escape key handling to close sidebar
  useKey("Escape", function () {
    if (!sideBar.current.classList.contains("hidden")) {
      dispatch(setSidebar(false));
    }
  });
  */

  useEffect(() => {
    if (userDetail?.id) {
      dispatch(fetchCart(userDetail.id));
      dispatch(fetchWishlist(userDetail.id));
    }
  }, [dispatch, userDetail?.id]);

  // Render Sidebar component
  return (
    <div ref={sideBar} className={`sidebar ${!sidebar ? "hidden" : ""}`}>
      {/* Close button */}
      <button className="close-btn" onClick={() => dispatch(setSidebar(""))}>
        X
      </button>

      {/* Sidebar title */}
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

      {/* Products list */}
      <div className="products">
        {sidebar === "cart" &&
          (cart.length > 0 ? (
            cart.map((currEl) => (
              <SidebarProduct currEl={currEl} key={currEl.id} />
            ))
          ) : (
            <div className="empty">
              <p>Cart is empty !</p>
            </div>
          ))}

        {sidebar === "wishlist" &&
          (wishlist.length > 0 ? (
            wishlist.map((currEl) => (
              <SidebarProduct currEl={currEl} key={currEl.id} />
            ))
          ) : (
            <div className="empty">
              <p>Wishlist is empty !</p>
            </div>
          ))}
      </div>

      {/* Checkout section (only for cart) */}
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
              />
              <div className="submit">
                <FaArrowRightLong
                  onClick={() => dispatch(setReduction(couponCode))}
                />
              </div>
            </div>
          )}

          {/* Price breakdown */}
          <div className="checkout-details">
            <div className="description">
              <p>Subtotal</p>
              <p>Delivery</p>
              <p>Discount</p>
            </div>
            <div className="prices">
              <p>{`$ ${Subtotal}`}</p>
              <p>{`$ ${cart.length > 0 ? "15" : "0"}`}</p>
              <p>{reduction ? `${reduction}%` : "0%"}</p>
            </div>
          </div>

          <hr />

          {/* Total */}
          <div className="checkout-details" style={{ color: "#2196f3" }}>
            <div className="description">
              <h3>Total</h3>
            </div>
            <div className="prices">
              <p>{`$ ${
                Subtotal + 15 - (((Subtotal * reduction) / 100) | 0)
              } `}</p>
            </div>
          </div>

          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

// Export the component
export default SideBar;
