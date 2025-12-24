import { useNavigate } from "react-router-dom";
import { setlightbox } from "../features/ui/uiSlice";
import StarRating from "./starRating";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistThunks";
import { addToCart } from "../features/cart/cartThunk";
import { selectIsInCart } from "../features/cart/cartSelectors";
import { selectIsWishlisted } from "../features/wishlist/wishlistSelectors";

export default function Productbox({ currEl, variant }) {
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = useSelector((state) => selectIsInCart(state, currEl.id));

  const isWishlisted = useSelector((state) =>
    selectIsWishlisted(state, currEl.id)
  );

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
        <button onClick={handleAddToCart}>
          {isInCart ? "Already in cart" : "Add To Cart"}
        </button>
      </div>
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
