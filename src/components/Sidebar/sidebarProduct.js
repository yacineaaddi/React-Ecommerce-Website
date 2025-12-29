// Icons from React Icons library
import { MdDeleteForever } from "react-icons/md";

// Import StarRating Component
import StarRating from "../StarRating/starRating";

// Async thunks for handling cart actions
import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../../features/cart/cartThunk";
// Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";

// Async thunk for removing items from wishlist
import { removeFromWishlist } from "../../features/wishlist/wishlistThunks";

const SidebarProduct = ({ currEl }) => {
  // Get the `dispatch` function from Redux to dispatch actions to the store
  const dispatch = useDispatch();

  // Extract the `sidebar` state from the `ui` slice of the Redux store
  const { sidebar } = useSelector((state) => state.ui);

  // Extract the `userDetail, isAuthenticated` state from the `ui` slice of the Redux store
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="box">
      <div className="product-details">
        {/* Product image */}
        <div className="product">
          <img src={currEl.Img[0]} alt="Product-image" />
        </div>

        {/* Product info */}
        <div className="product-detail">
          <h2>{currEl.Title.split(" ").slice(0, 7).join(" ")}</h2>
          <p>{currEl.Brand}</p>

          {sidebar === "cart" ? (
            <>
              <p style={{ color: "#2196f3" }}>{`${currEl.Price} $`}</p>
              <p
                style={{
                  color: currEl.State === "Available" ? "green" : "red",
                }}
              >
                {currEl.State}
              </p>

              {/* Quantity controls */}
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
                />
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
              {/* Wishlist item rating */}
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

        {/* Delete button */}
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
          <p style={{ color: "green" }}>{`${(currEl.Price * currEl.Qty).toFixed(
            0
          )} $`}</p>
        </div>
      </div>

      {/* Add wishlist item to cart */}
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
          }}
        >
          Add To Cart
        </div>
      )}
      <hr />
    </div>
  );
};

export default SidebarProduct;
