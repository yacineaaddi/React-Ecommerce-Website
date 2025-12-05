import React from "react";
import "./about.css";
import { useEffect, useState } from "react";
import Newsletter from "./newsletter";
const About = () => {
  useEffect(function () {
    document.title = "About Us | Electro";
  }, []);
  return <div className="about-section"></div>;
};

export default About;
