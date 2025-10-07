import React from "react";

const Footer = () => {
  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <div className="logo">
            <img src="image/logo.png"></img>
          </div>
        </div>
        <div className="bottom">
          <div className="detail">
            <p></p>
          </div>
          <div className="social-links">{/*Social Links*/}</div>
        </div>
      </div>
      <div className="box">
        <div className="header">
          <h2>TEXTTEXT</h2>
        </div>
        <div className="bottom">
          <ul>
            <li>TEXTTEXT</li>
            <li>TEXTTEXT</li>
            <li>TEXTTEXT</li>
            <li>TEXTTEXT</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
