// Import useEffect hook for lifecycle management
import { useEffect } from "react";

// Import About page specific styles
import "./about.css";

// About page component
const About = () => {
  // Set the page title when the component mounts
  useEffect(function () {
    document.title = "About Us | Electro";
  }, []);

  return (
    // Container for the About page content
    <div className="about-section"></div>
  );
};

// Export component
export default About;
