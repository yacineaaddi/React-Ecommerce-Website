// Import Swiper modules for gallery behavior
import { FreeMode, Navigation, Thumbs, Scrollbar } from "swiper/modules";

// Redux thunk to toggle wishlist
import { toggleWishlist } from "../../features/wishlist/wishlistThunks";

// React-Redux helpers
import { useDispatch, useSelector } from "react-redux";

// UI slice action for opening the lightbox
import { setlightbox } from "../../features/ui/uiSlice";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Icons
import { IoMdHeartEmpty } from "react-icons/io";
import { BsAspectRatio } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";

// React state
import { useState } from "react";

// Swiper styles
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "./ProductSlider.css";
import "swiper/css/thumbs";
import "swiper/css";

// Selector to check if product is wishlisted
import { selectIsWishlisted } from "../../features/wishlist/wishlistSelectors";

// Component receives `product` as prop
const ProductSlider = ({ product }) => {
  // Get auth data from Redux
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);

  // Redux dispatcher
  const dispatch = useDispatch();

  // Check if product is already in wishlist
  const isWishlisted = useSelector((state) =>
    selectIsWishlisted(state, product.id)
  );

  // State to store the Swiper instance used for thumbnails
  const [thumbsSwiper, setThumbSwiper] = useState(null);

  return (
    <div className="product-gallery-wrapper">
      {/* MAIN IMAGE SLIDER */}
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-main-swiper"
      >
        {/* TOP RIGHT ACTION ICONS */}
        <div className="swiper-icons">
          {/* Open lightbox (full-screen view) */}
          <div
            className="fill"
            onClick={() => {
              dispatch(setlightbox(product.id));
            }}
          >
            <BsAspectRatio />
          </div>

          {/* Toggle wishlist */}
          <div
            className="heart"
            onClick={() =>
              dispatch(
                toggleWishlist({
                  product: product,
                  userId: userDetail.id,
                  isAuthenticated,
                })
              )
            }
          >
            {isWishlisted ? (
              <IoMdHeart
                style={{
                  color: "red",
                }}
              />
            ) : (
              <IoMdHeartEmpty />
            )}
          </div>
        </div>

        {/* MAIN PRODUCT IMAGES */}
        {product?.Img.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={index} style={{ width: "100%" }} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* THUMBNAIL SLIDER */}
      <Swiper
        scrollbar={{
          hide: false,
        }}
        onSwiper={setThumbSwiper}
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs, Scrollbar]}
        className="product-thumbs-swiper"
      >
        {/* THUMBNAIL IMAGES */}
        {product?.Img.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={index}
              style={{
                width: "100%",
                cursor: "pointer",
                borderRadius: "6px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
