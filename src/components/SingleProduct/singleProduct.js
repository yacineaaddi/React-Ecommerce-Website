import { Product, Faq, ShippingAndDelivery } from "../../data/data";
import { setReduction } from "../../features/coupon/couponSlice";
import { setActiveCat } from "../../features/cart/cartSlice";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductSlider from "../ProductSlider/productslider";
import Newsletter from "../Newsletter/newsletter";
import StarRating from "../StarRating/starRating";
import "./singleproduct.css";
import Productbox from "../ProductBox/ProductBox";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../../features/cart/cartThunk";
import { selectIsInCart } from "../../features/cart/cartSelectors";
import { useMemo } from "react";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, title } = useParams();

  const product = useMemo(() => Product.find((x) => Number(id) === x.id), [id]);

  const similarproduct = useMemo(
    () =>
      product ? Product.filter((c) => c.Cat === product.Cat).slice(0, 5) : [],
    [product]
  );

  const { cart } = useSelector((state) => state.cart);
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);
  const { reduction } = useSelector((state) => state.coupon);

  const productInCart = useSelector((state) =>
    product ? selectIsInCart(state, product.id) : false
  );

  const [productQty, updateproductQty] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(false);

  const soldout = product?.Stock < 1;

  const singleproduct =
    product && Array.isArray(cart)
      ? cart.find((item) => String(item.CartId) === String(product.id))
      : null;

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

  function CustomerReview({ currEl, index }) {
    return (
      <>
        <div className="border">{currEl.review}</div>

        <div className="box" key={index}>
          <p className="border">{currEl.name}</p>
          <p className="border">{currEl.date}</p>
          <div className="rating border">
            <StarRating defaultRating={currEl.rating} />
            <span>{currEl.rating} / 5</span>
          </div>
        </div>
      </>
    );
  }

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function updateQty(n) {
    updateproductQty((prev) => {
      const updated = prev + n;
      return updated < 1 ? 1 : updated;
    });
  }
  const handleIncrease = () => {
    const spIncrease = singleproduct?.Qty >= product.Stock;
    const pIncrease = productQty >= product.Stock;

    if (pIncrease || spIncrease) return;

    if (singleproduct) {
      dispatch(
        increaseQty({
          product: singleproduct,
          userId: userDetail.id,
        })
      );
    } else {
      updateQty(1);
    }
  };

  return (
    product &&
    id && (
      <>
        <div className="single-product">
          <div className="product-container">
            <div className="links">
              <NavLink to="/shop">
                <p>Shop</p>
              </NavLink>
              <p>&gt;</p>
              <NavLink to="/shop">
                <p>Categories</p>
              </NavLink>
              <p>&gt;</p>
              <div
                onClick={() => {
                  dispatch(setActiveCat(product?.Cat));
                  navigate("/shop");
                }}
              >
                <NavLink>
                  <p>{product?.Cat}</p>
                </NavLink>
              </div>

              <p>&gt;</p>
              <p>Product Details</p>
            </div>
            <div className="product">
              {product && <ProductSlider product={product} />}
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
                    <p>{`${product?.BoughtLastMonth}+ bought in the last month`}</p>
                  </div>
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
                          ? dispatch(
                              decreaseQty({
                                product: singleproduct,
                                userId: userDetail.id,
                              })
                            )
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
                      onClick={() => handleIncrease()}
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
                  <p onClick={() => setCoupon((e) => !e)}>
                    Have a coupon code ?
                  </p>
                  {coupon && (
                    <div className="box">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        onChange={(e) => setCouponCode(e.target.value)}
                      ></input>
                      <div className="submit">
                        <FaArrowRightLong
                          onClick={() => dispatch(setReduction(couponCode))}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="buttons">
                  <button>Buy Now</button>
                  <button
                    onClick={() =>
                      product &&
                      dispatch(
                        addToCart({
                          product,
                          userId: userDetail.id,
                          isAuthenticated,
                        })
                      )
                    }
                  >
                    {product && productInCart
                      ? "Already in cart"
                      : "Add To Cart"}
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
          </div>

          <div className="accordion-container">
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggle(1)}>
                Technical Specifications
                <span className="icon">{openIndex === 1 ? "−" : "+"}</span>
              </button>

              {openIndex === 1 && (
                <div className="accordion-content">
                  {product?.Specifications?.map((spec, index) => {
                    const [label, value] = spec.split(":");
                    return (
                      <div className="qa-block">
                        <p>
                          <strong>{label}</strong>
                        </p>
                        <p className="answer">{value}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggle(2)}>
                Customer Reviews
                <span className="icon">{openIndex === 2 ? "−" : "+"}</span>
              </button>

              {openIndex === 2 && (
                <div className="accordion-content customer-review">
                  {product?.customerReviews?.map((currEl, index) => (
                    <CustomerReview currEl={currEl} index={index} />
                  ))}
                </div>
              )}
            </div>
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggle(3)}>
                Shipping & Delivery
                <span className="icon">{openIndex === 3 ? "−" : "+"}</span>
              </button>

              {openIndex === 3 && (
                <div className="accordion-content ">
                  {ShippingAndDelivery.map((currEl) => {
                    const [question, answer] = currEl.split("?");
                    return (
                      <div className="qa-block">
                        <p>
                          <strong>{question}?</strong>
                        </p>
                        <p className="answer">{answer}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggle(4)}>
                FAQ
                <span className="icon">{openIndex === 4 ? "−" : "+"}</span>
              </button>

              {openIndex === 4 && (
                <div className="accordion-content">
                  {Faq.map((currEl) => {
                    const [question, answer] = currEl.split("?");
                    return (
                      <div className="qa-block">
                        <p>
                          <strong>{question}?</strong>
                        </p>
                        <p className="answer">{answer}</p>
                      </div>
                    );
                  })}
                </div>
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
    )
  );
};

export default SingleProduct;
