import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./singleproduct.css";
import { Product } from "./data";
import Newsletter from "./newsletter";
import StarRating from "./starRating";
import ProductSlider from "./productslider";

const SingleProduct = ({ setlightbox, ShopProduct }) => {
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
          {product && <ProductSlider product={product} />}
          <div className="singleproduct-details"></div>
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
