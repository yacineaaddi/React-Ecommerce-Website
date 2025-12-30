// Import Redux action
import { setActiveCat } from "../../features/cart/cartSlice";

// Import Hook to dispatch Redux actions
import { useDispatch } from "react-redux";

// Component for rendering a single category card on the Home page
const CategoryBox = ({ currEl, navigate }) => {
  // Redux dispatch to update the active category
  const dispatch = useDispatch();

  return (
    <>
      {/* Category card container */}
      <div
        className="box"
        onClick={() => {
          // Set the active category in Redux store
          dispatch(setActiveCat(currEl.key));
          // Navigate to the shop page
          navigate("/shop");
        }}
      >
        {/* Category image */}
        <div className="img-box">
          <img
            src={`/img/category-slider-${currEl.id}.jpg`}
            alt={`Category Box ${currEl.id}`}
          ></img>
        </div>

        {/* Category label */}
        <div className="info">
          <h4>{currEl.label}</h4>
        </div>
      </div>
    </>
  );
};

// Export component
export default CategoryBox;
