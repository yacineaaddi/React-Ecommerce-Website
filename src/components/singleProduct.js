import { useParams } from "react-router-dom";
import { useEffect, React, useState } from "react";
import "./singleproduct.css";
import { Product } from "./data";

const SingleProduct = ({ setlightbox }) => {
  const { id, title } = useParams();
  const [product, setProduct] = useState(null);
  const [preview, setPreview] = useState(0);
  useEffect(() => {
    function getproduct() {
      const currEl = Product.find((x) => Number(id) === x.id);
      setProduct(currEl);
      console.log(currEl);
    }
    getproduct();
  }, [id]);

  return (
    <div className="single-product">
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
      </div>
      <div className="product-details"></div>
      <div className="product-description"></div>
    </div>
  );
};

export default SingleProduct;
