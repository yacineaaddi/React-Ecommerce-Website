import { setWishlist } from "../features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../features/cart/cartSlice";
import { setlightbox } from "../features/ui/uiSlice";
import StarRating from "../components/starRating";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {
  doc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const UpdateStatesContext = createContext();

export function UpdateStatesProvider({ children }) {
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function isInCart(p) {
    if (!p) return false; // avoid errors
    if (!cart || !Array.isArray(cart)) return false;

    return cart.some((item) => String(item.CartId) === String(p.id));
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
    if (!isAuthenticated || !userDetail?.id) {
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
      dispatch(setWishlist(updatedWishlist));
      toast.success("Product removed successfully!");
    } catch (error) {
      toast.error("Error deleting product: ", error);
    }
  };
  const updatewishlist = async (data) => {
    if (!isAuthenticated) {
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
      dispatch(setWishlist(updatedWishlist));
      toast.success("Product Added To Wishlist");
    }
  };

  function Productbox({ currEl, variant }) {
    return (
      <div
        className="box"
        onClick={(e) => {
          if (e.target.closest(".icon") || e.target.closest("button")) {
            return;
          }

          navigate(
            `shop/product/${currEl.id}/${currEl.Title.split(" ")
              .slice()
              .join("-")}`
          );
        }}
      >
        <div className="img-box">
          <img src={currEl.Img[0]} alt="Product-image"></img>
        </div>
        <div className="detail">
          <div className="icons">
            <div className="icon" onClick={() => updatewishlist(currEl)}>
              <FaHeart color={isWishlisted(currEl) ? "red" : ""} />
            </div>
            <div
              className="icon"
              onClick={() => {
                dispatch(setlightbox(currEl.id));
              }}
            >
              <CiSearch />
            </div>
          </div>
          <h3>{currEl.Title}</h3>

          {variant === "special-offers" && (
            <>
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
            </>
          )}

          {variant === "regular-box" && (
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
          )}

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
  const increaseQty = async (data, userId, updatestate) => {
    console.log(data);
    if (data.State !== "Available") {
      toast.error("Out of stock");
      return;
    }

    try {
      const cartRef = doc(db, "users", userId, "cart", data.id);
      await updateDoc(cartRef, { Qty: data.Qty + 1 });

      updatestate();
      toast.success("Quantity added successfully!");
    } catch (error) {
      toast.error("Error increasing quantity");
    }
  };
  const decreseQty = async (data, userId, updatestate) => {
    if (data.State !== "Available") {
      toast.error("Out of stock");
      return;
    }
    try {
      if (data.Qty > 1) {
        const cartdataref = doc(db, "users", userId, "cart", data.id);
        await updateDoc(cartdataref, { Qty: data.Qty - 1 });
        toast.success("Quantity decreased successfully!");
        updatestate();
      }
    } catch (error) {
      toast.error("Error decreasing Quantity");
    }
  };
  function reducer(state, action) {
    const couponmsg = "Coupon code added successfully!";
    switch (action.type) {
      case "X7p9alq2":
        toast.success(couponmsg);
        return 20;
      case "M4zt82rw":
        toast.success(couponmsg);
        return 30;
      case "qh9lk3vj":
        toast.success(couponmsg);
        return 50;
      default:
        toast.error("Coupon code is not valid!");
        return state;
    }
  }
  return (
    <UpdateStatesContext.Provider
      value={{
        isInCart,
        isWishlisted,
        updatestate,
        addtocart,
        RemoveFromWishlist,
        updatewishlist,
        Productbox,
        increaseQty,
        decreseQty,
        reducer,
      }}
    >
      {children}
    </UpdateStatesContext.Provider>
  );
}

export function useUpdateStates() {
  return useContext(UpdateStatesContext);
}
