import Newsletter from "../Newsletter/newsletter";
import { useEffect } from "react";
import "../Contact/contact.css";

const Contact = () => {
  useEffect(function () {
    document.title = "Contact Us | Electro";
  }, []);

  return (
    <div className="contact-section">
      <Newsletter />
    </div>
  );
};

export default Contact;
