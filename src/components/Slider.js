import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "./Slider.css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Data } from "./SliderData";

const Slider = () => {
  return (
    <div className="swiper">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop={true}
      >
        {Data?.map((currEl, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-box">
              <div className="info">
                <h2>{currEl.title}</h2>
                <p>{currEl.discount}</p>
                <Link>
                  <button>Discover Now</button>
                </Link>
              </div>
              <div className="image">
                <img className="card_image" src={currEl.image} alt="imagebox" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
