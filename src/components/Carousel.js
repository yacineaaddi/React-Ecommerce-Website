import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoplay] = useState(true);
  let timeOut = null;
  console.log(images);

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  useEffect(() => {
    if (autoPlay) {
      setTimeout(() => {
        slideRight();
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [autoPlay, slideRight]);
  return (
    <div
      className="carousel"
      // onMouseEnter={() => {
      //  setAutoplay(false);
      // clearTimeout(timeOut);
      //}}
      // onMouseLeave={() => {
      //  setAutoplay(true);
      //}}
    >
      <div className="carousel_wrapper">
        {images.map((image, index) => {
          let offset = index - current;

          // When looping from last to first
          if (current === 0 && index === images.length - 1) {
            offset = -1;
          }
          // When looping from first to last
          else if (current === images.length - 1 && index === 0) {
            offset = 1;
          }
          return (
            <div
              key={index}
              className={
                index === current
                  ? "carousel_card carousel_card_active"
                  : "carousel_card"
              }
              style={{
                transform: `translateX(${offset * 100}%)`,
                opacity: Math.abs(offset) < 1 ? 1 : 0,
                transition: "transform 1s ease-in-out, opacity 1s ease-in",
              }}
            >
              <div className="info">
                <h2>{image.title}</h2>
                <p>{image.discount}</p>
                <Link to="/shop">
                  <button>Discover Now</button>
                </Link>
              </div>
              <div className="image">
                <img className="card_image" src={image.image} alt="imagebox" />
              </div>
            </div>
          );
        })}
        {/*<div className="carousel_arrow_left" onClick={slideLeft}>
          &lsaquo;
        </div>
        <div className="carousel_arrow_right" onClick={slideRight}>
          &rsaquo;
        </div>*/}
        <div className="carousel_pagination">
          {images.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  index == current
                    ? "pagination_dot pagination_dot-active"
                    : "pagination_dot"
                }
                onClick={() => setCurrent(index)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
