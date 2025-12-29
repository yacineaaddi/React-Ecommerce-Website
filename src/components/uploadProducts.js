// Firestore functions to interact with collections and add documents
import { collection, addDoc } from "firebase/firestore";

// Local JSON file containing product data to be uploaded to Firestore
import products from "./productdata.json";

// React hook for running side effects (e.g., uploading data on mount)
import { useEffect } from "react";

// Firestore database instance configured in your Firebase service file
import { db } from "../services/firebase";

export default function UploadProductsOnce() {
  useEffect(() => {
    // Async function to upload products
    const upload = async () => {
      try {
        // Reference to the "products" collection in Firestore
        const productsRef = collection(db, "products");

        // Loop through all products in the JSON file and add them to Firestore
        for (const product of products) {
          await addDoc(productsRef, product);
        }

        // Notify that upload succeeded
        alert("Products uploaded successfully!");
      } catch (e) {
        // Log any errors that occur
        console.error(e);
      }
    };

    // Call the async upload function
    upload();
  }, []);

  return <></>;
}
