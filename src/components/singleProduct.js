import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./singleproduct.css";
import { Product } from "./data";
import Newsletter from "./newsletter";
import StarRating from "./starRating";
import ProductSlider from "./productslider";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiRefund2Line } from "react-icons/ri";

const SingleProduct = ({
  setlightbox,
  ShopProduct,
  wishlist,
  updatewishlist,
}) => {
  const { id, title } = useParams();
  const [product, setProduct] = useState(null);
  const [preview, setPreview] = useState(0);
  const [similarproduct, setSimilarproduct] = useState("");

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
              <p>{product?.Overview}</p>
              <div className="rating">
                <StarRating defaultRating={product?.Rating} />
                <p>{product?.Rating}</p>
                <p>({product?.NumRev} reviews)</p>
              </div>
            </div>
            <div className="payment">
              <h2>{`$${product?.Price} or ${(product?.Price / 12).toFixed(
                2
              )}/month`}</h2>
              <p>Suggested payments with 12 months special financing</p>
            </div>
            <div className="quantity">
              <p>
                Only<span>{product?.quantity}</span>Left!
              </p>
            </div>
            <div className="buttons">
              <button>Buy Now</button>
              <button>Add to Cart</button>
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
