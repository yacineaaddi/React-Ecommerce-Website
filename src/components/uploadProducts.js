import { useEffect } from "react";
import products from "./productdata.json";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function UploadProductsOnce() {
  useEffect(() => {
    const upload = async () => {
      try {
        const productsRef = collection(db, "products");

        for (const product of products) {
          await addDoc(productsRef, product);
        }

        alert("Products uploaded successfully!");
      } catch (e) {
        console.error(e);
      }
    };

    upload();
  }, []);

  return <></>;
}
