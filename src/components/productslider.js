import { FreeMode, Navigation, Thumbs, Scrollbar } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { setlightbox } from "../features/ui/uiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsAspectRatio } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { useState } from "react";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "./productslider.css";
import "swiper/css/thumbs";
import "swiper/css";

const ProductSlider = ({ product, updatewishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [thumbsSwiper, setThumbSwiper] = useState(null);

  function isWishlisted(product) {
    const { id } = product;
    const result = wishlist?.some((item) => String(item.CartId) === String(id));
    return result;
  }

  return (
    <div className="product-gallery-wrapper">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-main-swiper"
      >
        <div className="swiper-icons">
          <div
            className="fill"
            onClick={() => {
              dispatch(setlightbox(product.id));
            }}
          >
            <BsAspectRatio />
          </div>

          <div className="heart" onClick={() => updatewishlist(product)}>
            {isWishlisted(product) ? (
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

        {product?.Img.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={index} style={{ width: "100%" }} />
          </SwiperSlide>
        ))}
      </Swiper>
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
