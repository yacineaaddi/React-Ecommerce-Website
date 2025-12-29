// Importing navigation hook from react-router-dom
import { useNavigate } from "react-router-dom";

// Importing Redux action
import { setlightbox } from "../../features/ui/uiSlice";

// Importing a custom StarRating component
import StarRating from "../StarRating/starRating";

// Importing search icon
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

// Importing Redux hooks
import { useDispatch, useSelector } from "react-redux";

// Importing async thunk
import { toggleWishlist } from "../../features/wishlist/wishlistThunks";
import { addToCart } from "../../features/cart/cartThunk";

// Importing selector
import { selectIsInCart } from "../../features/cart/cartSelectors";
import { selectIsWishlisted } from "../../features/wishlist/wishlistSelectors";

// Productbox component
export default function Productbox({ currEl, variant }) {
  // Access authenticated user details from Redux store
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);

  // Redux dispatch function to send actions
  const dispatch = useDispatch();

  // Hook to programmatically navigate to product detail page
  const navigate = useNavigate();

  // Check if the product is already in the cart
  const isInCart = useSelector((state) => selectIsInCart(state, currEl.id));

  // Check if the product is already in the wishlist
  const isWishlisted = useSelector((state) =>
    selectIsWishlisted(state, currEl.id)
  );

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: currEl,
        userId: userDetail.id,
        isAuthenticated,
      })
    );
  };

  return (
    <div
      className="box"
      onClick={(e) => {
        // Prevent navigation if clicking on icons or buttons
        if (e.target.closest(".icon") || e.target.closest("button")) {
          return;
        }

        // Navigate to product detail page with URL slug
        navigate(
          `/shop/product/${currEl.id}/${currEl.Title.split(" ")
            .slice()
            .join("-")}`
        );
      }}
    >
      {/* Product image */}
      <div className="img-box">
        <img src={currEl.Img[0]} alt="Product-image"></img>
      </div>

      {/* Product details */}
      <div className="detail">
        {/* Icons for wishlist and lightbox */}
        <div className="icons">
          {/* Wishlist toggle */}
          <div
            className="icon"
            onClick={() =>
              dispatch(
                toggleWishlist({
                  product: currEl,
                  userId: userDetail.id,
                  isAuthenticated,
                })
              )
            }
          >
            <FaHeart color={isWishlisted ? "red" : ""} />
          </div>

          {/* Lightbox preview */}
          <div
            className="icon"
            onClick={() => {
              dispatch(setlightbox(currEl.id));
            }}
          >
            <CiSearch />
          </div>
        </div>

        {/* Product title */}
        <h3>{currEl.Title}</h3>

        {/* Variant: special-offers (show discounted price and rating) */}
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

        {/* Variant: regular-box (show rating and product state) */}
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

        {/* Product price */}
        <h4>{currEl.Price} $</h4>

        {/* Add to cart button */}
        <button onClick={handleAddToCart}>
          {isInCart ? "Already in cart" : "Add To Cart"}
        </button>
      </div>

      {/* Display wishlist icon if product is wishlisted */}
      {isWishlisted ? (
        <div className="wishlist-icon">
          <FaHeart color="red" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
