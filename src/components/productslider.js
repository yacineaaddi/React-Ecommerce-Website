import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Scrollbar } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import "./productslider.css";
import "swiper/css";
import "swiper/css/scrollbar";
import { BsAspectRatio } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

const ProductSlider = ({ product, setlightbox, wishlist, updatewishlist }) => {
  const [thumbsSwiper, setThumbSwiper] = useState(null);

  function isWishlisted(product) {
    const { id } = product;
    const result = wishlist?.some((item) => String(item.CartId) === String(id));
    console.log(result);
    console.log(wishlist);
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
              setlightbox(product.id);
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
