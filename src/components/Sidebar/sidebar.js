import { doc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { setWishlist } from "../../features/wishlist/wishlistSlice";
import { setReduction } from "../../features/coupon/couponSlice";
import { useEffect, useState, useRef } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/cart/cartSlice";
import { setSidebar } from "../../features/ui/uiSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { db } from "../../services/firebase";
/*import useKey from "./useCustomHook";*/
import StarRating from "../StarRating/starRating";
import toast from "react-hot-toast";
import "./sidebar.css";
import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../../features/cart/cartThunk";
import { removeFromWishlist } from "../../features/wishlist/wishlistThunks";

const SideBar = () => {
  const { cart } = useSelector((state) => state.cart);
  const { sidebar } = useSelector((state) => state.ui);
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { reduction, isValid } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const sideBar = useRef();

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

    return () => unsub();
  }, [userDetail?.id, dispatch]);

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

    return () => unsub();
  }, [userDetail?.id, dispatch]);

  const [coupon, setCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const Subtotal = cart.reduce((sum, p) => sum + +(p.Price * p.Qty), 0);

  /*
  useKey("Escape", function () {
    if (!sideBar.current.classList.contains("hidden")) {
      dispatch(setSidebar(false));
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
                        dispatch(
                          decreaseQty({
                            product: currEl,
                            userId: userDetail.id,
                          })
                        )
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
                        dispatch(
                          increaseQty({
                            product: currEl,
                            userId: userDetail.id,
                          })
                        )
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
                    ? dispatch(
                        removeFromWishlist({
                          itemId: currEl.id,
                          userId: userDetail.id,
                        })
                      )
                    : dispatch(
                        removeFromCart({
                          productId: currEl.id,
                          userId: userDetail.id,
                        })
                      );
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
            <div
              className="add-to-cart"
              onClick={() => {
                dispatch(
                  addToCart({
                    product: currEl,
                    userId: userDetail.id,
                    isAuthenticated,
                  })
                );
                console.log(currEl, userDetail.id, isAuthenticated);
              }}
            >
              Add To Cart
            </div>
          )}
          <hr></hr>
        </div>
      </>
    );
  }

  useEffect(() => {
    fetchcartdata(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (isValid === true) {
      toast.success("Coupon code added successfully!");
    } else if (isValid === false) {
      toast.error("Coupon code is not valid!");
    }
  }, [isValid]);

  const fetchcartdata = async () => {
    if (!userDetail?.id) return; // <-- prevent error
    const cartdata = await getDocs(
      collection(db, "users", userDetail.id, "cart")
    );
    const cartsnap = cartdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setCart(cartsnap));
  };

  useEffect(() => {
    fetchWishListdata(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchWishListdata = async () => {
    if (!userDetail?.id) return;
    const wishlistdata = await getDocs(
      collection(db, "users", userDetail.id, "wishlist")
    );
    const wishlistsnap = wishlistdata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setWishlist(wishlistsnap));
  };

  return (
    <div ref={sideBar} className={`sidebar ${!sidebar ? "hidden" : ""}`}>
      <button className="close-btn" onClick={() => dispatch(setSidebar(""))}>
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
                  onClick={() => dispatch(setReduction(couponCode))}
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
              <p>{reduction ? `${reduction}%` : "0%"}</p>
            </div>
          </div>
          <hr></hr>
          <div className="checkout-details" style={{ color: "#2196f3" }}>
            <div className="description">
              <h3>Total</h3>
            </div>
            <div className="prices">
              <p>
                {`$ ${Subtotal + 15 - (((Subtotal * reduction) / 100) | 0)} `}
              </p>
            </div>
          </div>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
