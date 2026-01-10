// Import Swiper modules that add extra functionality
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Redux hooks to read state and dispatch actions
import { useDispatch, useSelector } from "react-redux";

// Action to open the lightbox
import { setlightbox } from "../../features/ui/uiSlice";

// Swiper core React components
import { Swiper, SwiperSlide } from "swiper/react";

// React hooks for local state and side-effects
import { useEffect, useState } from "react";

// Product data source
import { Product } from "../../data/data";

// Swiper feature styles 
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Component-specific styles for the lightbox
import "./lightbox.css";

// Base Swiper styles
import "swiper/css";

// Lightbox component 
const Lightbox = () => {
  // Get the currently selected product id from UI slice, null if closed
  const { lightbox } = useSelector((state) => state.ui);

  // Local state to hold the product object that matches the selected id
  const [product, setProduct] = useState(null);

  // Allows us to dispatch UI actions
  const dispatch = useDispatch();

  // Whenever `lightbox` changes, find the matching product and store it locally
  useEffect(() => {
    const foundProduct = Product.find((item) => item.id === lightbox);
    setProduct(foundProduct);
  }, [lightbox]);

  // If no product is selected, don't render anything
  if (!product) return null;

  return (
    // Overlay container 
    <div
      className="lightbox"
      onClick={(e) => {
        // Only close if user clicked the background, not the content
        if (e.target.classList.contains("lightbox")) {
          dispatch(setlightbox(null));
        }
      }}
    >
      {/* Close button (×) in the corner */}
      <div className="closebtn" onClick={() => dispatch(setlightbox(null))}>
        ×
      </div>

      {/* Swiper slider to show product images */}
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
        {/* Render all product images */}
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

// Export component
export default Lightbox;
