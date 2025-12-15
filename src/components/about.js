import { useEffect } from "react";
import "./about.css";

const About = () => {
  useEffect(function () {
    document.title = "About Us | Electro";
  }, []);
  return <div className="about-section"></div>;
};

export default About;
