import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./lightbox.css";
import "swiper/css";
import { useEffect, useState } from "react";
import Product from "./product";

const Lightbox = ({ lightbox, setlightbox }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = Product.find((item) => item.id === lightbox);
    setProduct(foundProduct);
  }, [lightbox]);

  if (!product) return null;

  return (
    <div
      className="lightbox"
      onClick={(e) => {
        if (e.target.classList.contains("lightbox")) {
          setlightbox(null);
        }
      }}
    >
      <div className="closebtn" onClick={() => setlightbox(null)}>
        ×
      </div>
      <Swiper
        className="lightbox-swiper"
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop={true}
        navigation
      >
        {product.Img?.map((currEl, index) => (
          <SwiperSlide key={index} className="lightbox-slide">
            <div className="slide-img-container">
              <img src={currEl} alt={`product-${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Lightbox;
