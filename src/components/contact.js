import React from "react";
import "./contact.css";
import { useEffect, useState } from "react";
import Newsletter from "./newsletter";

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
