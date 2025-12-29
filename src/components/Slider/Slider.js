// Swiper modules for pagination and autoplay functionality
import { Pagination, Autoplay } from "swiper/modules";

// Core Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import the data to display in the slider
import { Data } from "../../data/data";

// Import Swiper styles for pagination and autoplay
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import custom styles for your slider component
import "./Slider.css";

// Import core Swiper styles (required for basic Swiper functionality)
import "swiper/css";

// Slider component: displays a carousel using React Swiper Slide
const Slider = ({ setActiveCat, navigate }) => {
  return (
    <div className="home-swiper">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop={true}
      >
        {/* Loop through data to render each slide */}
        {Data?.map((currEl, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-box">
              <div className="info">
                <h2>{currEl.title}</h2>
                <p>{currEl.discount}</p>

                {/* When clicked: set active category and navigate to shop page */}
                <button
                  onClick={() => {
                    setActiveCat(currEl.cat);
                    navigate("/shop");
                  }}
                >
                  Discover Now
                </button>
              </div>

              {/* Slide image */}
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

// Export the Slider component
export default Slider;
