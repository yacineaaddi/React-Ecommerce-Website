import { FaArrowRightLong } from "react-icons/fa6";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { toast } from "react-hot-toast";
import { useState } from "react";
import "./newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const subscribeToNewsletter = async (email) => {
    try {
      const emailId = email.toLowerCase();

      await setDoc(doc(db, "newsletter", emailId), {
        email,
        createdAt: new Date(),
      });

      toast.success("Subscribed Successfully !");
    } catch (error) {
      console.error("Newsletter error:", error);
    }
  };

  return (
    <>
      <div className="newsletter">
        <div className="newsletter-container">
          <div className="main">
            <h3>Newsletter Sign Up</h3>
            <p>
              Get <span>30 % OFF</span> coupon today subscribers
            </p>
          </div>

          <div className="box">
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <div
              className="submit"
              onClick={() => {
                subscribeToNewsletter(email);
              }}
            >
              <FaArrowRightLong />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
