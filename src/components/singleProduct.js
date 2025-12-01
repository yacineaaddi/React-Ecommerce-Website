import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./singleproduct.css";
import { Product } from "./data";
import Newsletter from "./newsletter";
import StarRating from "./starRating";
import ProductSlider from "./productslider";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiRefund2Line } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";

const SingleProduct = ({
  setlightbox,
  ShopProduct,
  wishlist,
  updatewishlist,
  addtocart,
  isInCart,
}) => {
  const { id, title } = useParams();
  const [product, setProduct] = useState(null);
  const [preview, setPreview] = useState(0);
  const [similarproduct, setSimilarproduct] = useState("");
  const soldout = product?.Stock < 1;

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

            <div className="payment">
              <h2>{`$${product?.Price} or ${(product?.Price / 12).toFixed(
                2
              )}/month`}</h2>
              <p>Suggested payments with 12 months special financing</p>
            </div>
            <hr />
            <div className="quantity">
              <div className="product-qty">
                <button className="decrement">-</button>
                <input
                  type="number"
                  className="value"
                  disabled
                  value={soldout ? "" : product?.Qty}
                  style={{
                    backgroundColor: soldout ? "#E0E0E0" : "",
                  }}
                ></input>
                <button className="increment">+</button>
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
            <div className="buttons">
              <button>Buy Now</button>
              <button onClick={() => product && addtocart(product)}>
                {product && isInCart(product)
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
              <div className="box">
                <div className="icon">
                  <RiRefund2Line />
                </div>
                <div className="detail">
                  <h3>Return Delivery</h3>
                  <p>
                    Free 30 Days Delivery Returns. <Link></Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-description"></div>

        <div className="bestseller-product">
          <h2>Similar Products</h2>
          <div className="prod-container">
            {similarproduct &&
              similarproduct?.map((currEl) => (
                <ShopProduct currEl={currEl} key={currEl.id} />
              ))}
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default SingleProduct;
