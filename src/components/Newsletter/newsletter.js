// Import right-arrow icon from react-icons
import { FaArrowRightLong } from "react-icons/fa6";

// Import Firestore functions
import { doc, setDoc } from "firebase/firestore";

// Import Firebase database instance
import { db } from "../../services/firebase";

// Import toast notifications
import { toast } from "react-hot-toast";

// Import React hook
import { useState } from "react";

// CSS Import
import "./newsletter.css";

// Newsletter component
const Newsletter = () => {
  // State to store the email input value
  const [email, setEmail] = useState("");

  // Function to subscribe a user to the newsletter
  const subscribeToNewsletter = async (email) => {
    try {
      // Convert email to lowercase to use as Firestore document ID
      const emailId = email.toLowerCase();

      // Add or update a document in the "newsletter" collection
      await setDoc(doc(db, "newsletter", emailId), {
        email,
        createdAt: new Date(),
      });

      // Show success notification
      toast.success("Subscribed Successfully !");
    } catch (error) {
      // Log any error that occurs during subscription
      console.error("Newsletter error:", error);
    }
  };

  return (
    <>
      <div className="newsletter">
        <div className="newsletter-container">
          {/* Main newsletter message */}
          <div className="main">
            <h3>Newsletter Sign Up</h3>
            <p>
              Get <span>30 % OFF</span> coupon today subscribers
            </p>
          </div>

          {/* Input and submit button */}
          <div className="box">
            {/* Email input field */}
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>

            {/* Submit button */}
            <div
              className="submit"
              onClick={() => {
                subscribeToNewsletter(email);
              }}
            >
              <FaArrowRightLong /> {/* Arrow icon */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export component
export default Newsletter;
