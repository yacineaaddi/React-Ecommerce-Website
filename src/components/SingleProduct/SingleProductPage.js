// Import React + Router
import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

//Redux imports
import { selectIsInCart } from "../../features/cart/cartSelectors";
import { setReduction } from "../../features/coupon/couponSlice";
import { setActiveCat } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../../features/cart/cartThunk";

// Import ecommerce website data
import { Product, Faq, ShippingAndDelivery } from "../../data/data";

// Import icons & components
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductSlider from "../ProductSlider/ProductSlider";
import Productbox from "../ProductBox/ProductBox";
import Newsletter from "../Newsletter/newsletter";
import StarRating from "../StarRating/starRating";

// Import styles
import "./SingleProductPage.css";

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get product id + title from the URL
  const { id, title } = useParams();

  // Find product only when `id` changes
  const product = useMemo(() => Product.find((x) => Number(id) === x.id), [id]);

  // Build list of similar products (same category)
  const similarproduct = useMemo(
    () =>
      product
        ? Product.filter(
            (p) => p.Cat === product.Cat && p.id !== product.id
          ).slice(0, 5)
        : [],
    [product]
  );

  // Redux state selectors
  const { cart } = useSelector((state) => state.cart);
  const { userDetail, isAuthenticated } = useSelector((state) => state.auth);
  const { reduction } = useSelector((state) => state.coupon);

  // Check if product is in cart
  const productInCart = useSelector((state) =>
    product ? selectIsInCart(state, product.id) : false
  );

  // Local UI state
  const [productQty, updateproductQty] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponInput, setCouponVisible] = useState(false);

  // Derived values
  const soldout = product?.Stock < 1;

  // Check the current product if it's already in cart
  const singleproduct =
    product && Array.isArray(cart)
      ? cart.find((item) => String(item.CartId) === String(product.id))
      : null;

  // Update page title dynamically
  useEffect(
    function () {
      if (!title) return;
      document.title = `${title}`;

      return () => {
        document.title = "Electro";
      };
    },
    [title]
  );

  // Reusable customer review component
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

  // Accordion open/close handler
  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // Update local quantity safely
  function updateQty(n) {
    updateproductQty((prev) => Math.max(1, prev + n));
  }

  // Handle increase button click
  const handleIncrease = () => {
    /*const spIncrease = singleproduct?.Qty >= singleproduct?.Stock;*/
    const pIncrease = productQty >= product.Stock;

    if (pIncrease) return;

    // If product already exists in cart → increase in cart
    singleproduct
      ? dispatch(
          increaseQty({
            product: singleproduct,
            userId: userDetail.id,
          })
        )
      : // Otherwise update local quantity
        updateQty(1);
  };

  // Handle decrease button click
  const handleDecrease = () => {
    singleproduct
      ? dispatch(decreaseQty({ product: singleproduct, userId: userDetail.id }))
      : updateQty(-1);
  };

  // Handle AddToCart button
  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        product,
        userId: userDetail?.id,
        isAuthenticated,
      })
    );
  };

  // If product doesn't exist, render nothing
  if (!product || !id) return null;
  return (
    <>
      <div className="single-product">
        {/* Breadcrumb */}
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

          {/* Product section */}
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

                {/* Rating */}
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

              {/* Overview */}

              <div className="product-info">
                <p>
                  <strong>Product overview : </strong>
                  {product?.Overview}
                </p>
              </div>

              <hr />

              {/* Payment section */}
              <div className="payment">
                <h2>{`$${product?.Price} or ${(product?.Price / 12).toFixed(
                  2
                )}/month`}</h2>
                <p>Suggested payments with 12 months special financing</p>
              </div>

              <hr />

              {/* Quantity and stock */}
              <div className="quantity">
                <div className="product-qty">
                  {/* Decrement */}
                  <button
                    className="decrement"
                    onClick={() => handleDecrease()}
                  >
                    -
                  </button>

                  {/* Display quantity */}
                  <input
                    type="number"
                    className="value"
                    disabled
                    value={singleproduct ? singleproduct.Qty : productQty}
                    style={{
                      backgroundColor: soldout ? "#E0E0E0" : "",
                    }}
                  />

                  {/* Increment */}
                  <button
                    className="increment"
                    onClick={() => handleIncrease()}
                  >
                    +
                  </button>
                </div>

                {/* Stock message */}
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

              {/* Coupon section */}
              <div className="coupon">
                <p onClick={() => setCouponVisible((e) => !e)}>
                  Have a coupon code ?
                </p>

                {/* Coupon */}
                {couponInput && (
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

              {/* Buttons */}
              <div className="buttons">
                <button>Buy Now</button>
                <button onClick={() => handleAddToCart()}>
                  {product && productInCart ? "Already in cart" : "Add To Cart"}
                </button>
              </div>

              {/* Delivery banner */}
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

        {/* Accordions sections*/}
        <div className="accordion-container">
          <div className="accordion-item">
            <button className="accordion-header" onClick={() => toggle(1)}>
              Technical Specifications
              <span className="icon">{openIndex === 1 ? "−" : "+"}</span>
            </button>

            {openIndex === 1 && (
              <div className="accordion-content">
                {product?.Specifications?.map((spec) => {
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

        {/* Similar Products */}
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

export default SingleProductPage;
