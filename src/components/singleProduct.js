import { useParams } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import "./singleproduct.css";
import { Product } from "./data";
import Newsletter from "./newsletter";
import StarRating from "./starRating";
import ProductSlider from "./productslider";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";
import { increaseQty, decreseQty } from "./updatestates";
import { reducer } from "./updatestates";
import { FaArrowRightLong } from "react-icons/fa6";

const SingleProduct = ({
  setlightbox,
  Productbox,
  wishlist,
  updatewishlist,
  addtocart,
  isInCart,
  userDetail,
  updatestate,
  cart,
}) => {
  const initialstate = "";
  const [openIndex, setOpenIndex] = useState(null);
  const { id, title } = useParams();
  const [product, setProduct] = useState(null);
  const [coupon, setCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [state, dispatch] = useReducer(reducer, initialstate);
  const [similarproduct, setSimilarproduct] = useState([]);
  const [productQty, updateproductQty] = useState(1);
  const soldout = product?.Stock < 1;
  const productinCart = product ? isInCart(product) : false;

  useEffect(
    function () {
      if (!title) return;
      document.title = `${title}`;

      return function () {
        document.title = "Electro";
      };
    },
    [title]
  );

  const singleproduct =
    product && Array.isArray(cart)
      ? cart.find((item) => String(item.CartId) === String(product.id))
      : null;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  function updateQty(n) {
    updateproductQty((prev) => {
      console.log(cart);
      const updated = prev + n;
      return updated < 1 ? 1 : updated;
    });
  }

  function CustomerReview({ review }) {
    return (
      <div className="customer-review">
        <p>{`${review.name} - ${review.date}`}</p>
        <p>{review.observation}</p>
        <div className="customer-review">
          <StarRating defaultRating={review.rating} />
          <p>{review.rating}</p>
        </div>
      </div>
    );
  }
  useEffect(() => {
    updateproductQty(1);
  }, []);

  useEffect(() => {
    function getproduct() {
      const currEl = Product.find((x) => Number(id) === x.id);
      setProduct(currEl);
      const similar_product = Product.filter((c) => c.Cat === currEl.Cat).slice(
        0,
        5
      );
      setSimilarproduct(similar_product);
      console.log(similar_product);
      console.log(product);
    }
    getproduct();
  }, [id]);

  return (
    <>
      <div className="single-product">
        <div className="product">
          {/*
            <div className="product-image">
              <img
                className="preview"
                src={product?.Img[preview]}
                alt="Image-view-1"
                onClick={() => {
                  setlightbox(product.id);
                }}
              />
              {product?.Img?.map((src, i) => (
                <img
                  key={i + 1}
                  src={src}
                  alt={`img-${i + 1}`}
                  onClick={() => setPreview(i)}
                  style={{ border: preview === i ? "2px solid #2196f3" : "" }}
                />
              ))}
            </div>*/}
          {product && (
            <ProductSlider
              product={product}
              setlightbox={setlightbox}
              wishlist={wishlist}
              updatewishlist={updatewishlist}
            />
          )}
          <div className="singleproduct-details">
            <div className="product-des">
              <h1>{product?.Title}</h1>
              <div className="product-info">
                <p>
                  <strong>Brand : </strong>
                  {product?.Brand}
                </p>
                <p>
                  <b>Model : </b>
                  {product?.Model}
                </p>
                <p>
                  <b>Web Code : </b>
                  {product?.WebCode}
                </p>
              </div>

              <div className="rating">
                <StarRating defaultRating={product?.Rating} size={20} />
                <p>{product?.Rating}</p>
                <p>({product?.NumRev} reviews)</p>
              </div>
              <div className="sold-qty">
                <div className="qty-icon">
                  <MdOutlineShoppingCart />
                </div>
                <p>{`${35}+ bought in the last month`}</p>
              </div>
              {/*<div className="product-info">
                <p>
                  <strong>Availability : </strong>
                  <span className="stock">{`${product?.Stock} items in stock`}</span>
                </p>
              </div>*/}
            </div>
            <hr />
            <div className="product-info">
              <p>
                <strong>Product overview : </strong>
                {product?.Overview}
              </p>
            </div>
            <hr />
            <div className="payment">
              <h2>{`$${product?.Price} or ${(product?.Price / 12).toFixed(
                2
              )}/month`}</h2>
              <p>Suggested payments with 12 months special financing</p>
            </div>
            <hr />
            <div className="quantity">
              <div className="product-qty">
                <button
                  className="decrement"
                  onClick={() =>
                    singleproduct
                      ? decreseQty(singleproduct, userDetail.id, updatestate)
                      : updateQty(-1)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  className="value"
                  disabled
                  value={singleproduct ? singleproduct.Qty : productQty}
                  style={{
                    backgroundColor: soldout ? "#E0E0E0" : "",
                  }}
                ></input>
                <button
                  className="increment"
                  onClick={() =>
                    singleproduct
                      ? increaseQty(singleproduct, userDetail.id, updatestate)
                      : updateQty(1)
                  }
                >
                  +
                </button>
              </div>
              {soldout ? (
                <p>
                  <span className="orange">Sold Out</span>
                </p>
              ) : (
                <p>
                  only
                  <span className="orange">{` ${product?.Stock} items `}</span>
                  Left!
                </p>
              )}
            </div>
            <div className="coupon">
              <p onClick={() => setCoupon((e) => !e)}>Have a coupon code ?</p>
              {coupon && (
                <div className="box">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    onChange={(e) => setCouponCode(e.target.value)}
                  ></input>
                  <div className="submit">
                    <FaArrowRightLong
                      onClick={() => dispatch({ type: `${couponCode}` })}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="buttons">
              <button>Buy Now</button>
              <button onClick={() => product && addtocart(product)}>
                {product && productinCart ? "Already in cart" : "Add To Cart"}
              </button>
            </div>

            <div className="additional-info">
              <div className="box">
                <div className="icon">
                  <LiaShippingFastSolid />
                </div>
                <div className="detail">
                  <h3>Free Delivery</h3>
                  <p>Order above $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-container">
          <div className="accordion-item">
            <button className="accordion-header" onClick={() => toggle(1)}>
              Technical Specifications
              <span className="icon">{openIndex === 1 ? "−" : "+"}</span>
            </button>

            {openIndex === 1 && (
              <div className="accordion-content">{product?.Specifications}</div>
            )}
          </div>
          <div className="accordion-item">
            <button className="accordion-header" onClick={() => toggle(2)}>
              Customer Reviews
              <span className="icon">{openIndex === 2 ? "−" : "+"}</span>
            </button>

            {openIndex === 2 && (
              <div className="accordion-content">{product?.Specifications}</div>
            )}
          </div>
          <div className="accordion-item">
            <button className="accordion-header" onClick={() => toggle(3)}>
              Shipping & Delivery
              <span className="icon">{openIndex === 3 ? "−" : "+"}</span>
            </button>

            {openIndex === 3 && (
              <div className="accordion-content">{product?.Specifications}</div>
            )}
          </div>
          <div className="accordion-item">
            <button className="accordion-header" onClick={() => toggle(4)}>
              FAQ
              <span className="icon">{openIndex === 4 ? "−" : "+"}</span>
            </button>

            {openIndex === 4 && (
              <div className="accordion-content">{product?.Specifications}</div>
            )}
          </div>
        </div>

        <div className="bestseller-product">
          <h2>Similar Products</h2>
          <div className="prod-container">
            {similarproduct &&
              similarproduct?.map((currEl) => (
                <Productbox
                  currEl={currEl}
                  key={currEl.id}
                  variant="regular-box"
                />
              ))}
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default SingleProduct;
