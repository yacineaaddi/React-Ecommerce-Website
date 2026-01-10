// Import the Newsletter component to display subscription form
import Newsletter from "../Newsletter/newsletter";

// Import useEffect hook for lifecycle management
import { useEffect } from "react";

// Import Contact page specific styles
import "../Contact/contact.css";

// Contact page component
const Contact = () => {
  // Set the page title when the component mounts
  useEffect(function () {
    document.title = "Contact Us | Electro";
  }, []);

  return (
    <div className="contact-section">
      {/* Render the newsletter signup section */}
      <Newsletter />
    </div>
  );
};

// Export component
export default Contact;
