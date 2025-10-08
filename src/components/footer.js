import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { ImAndroid } from "react-icons/im";
import { FaAppStoreIos } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="upper-part">
          <div className="detail-box">
            <div className="logo">
              <img src="./img/Logo-Electro.png"></img>
            </div>
            <div className="detail">
              <p>
                We provide a wide range of high-quality electronics, combining
                innovation, reliability, and competitive pricing to meet your
                needs
              </p>
            </div>
            <div className="social-links">
              <ul className="icons">
                <li>
                  <FaFacebookSquare />
                </li>
                <li>
                  <FaSquareInstagram />
                </li>
                <li>
                  <AiFillTikTok />
                </li>
                <li>
                  <FaSquareXTwitter />
                </li>
              </ul>
            </div>
          </div>
          <div className="box">
            <div className="header">
              <h2>Customer Support</h2>
            </div>
            <div className="bottom">
              <ul className="align">
                <li>Contact Us</li>
                <li>Help Centre</li>
                <li>Returns & Exchanges</li>
              </ul>
            </div>
          </div>
          <div className="box">
            <div className="header">
              <h2>About Us</h2>
            </div>
            <div className="bottom">
              <ul className="align">
                <li>Careers</li>
                <li>Newsroom</li>
                <li>Electro US</li>
              </ul>
            </div>
          </div>
          <div className="box">
            <div className="header">
              <h2>Mobile Apps</h2>
            </div>
            <div className="bottom">
              <div className="mobile-app">
                <div className="social-icon">
                  <FaAppStoreIos />
                </div>
                <p>IOS App</p>
              </div>
              <div className="mobile-app">
                <div className="social-icon">
                  <ImAndroid />
                </div>
                <p>Android App</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ligne"></div>
        <div className="down-part">
          <div className="additional-links">
            <ul className="links">
              <li>Terms & Conditions</li>
              <li>Conditions of Use</li>
              <li>Online Policies</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Credits</li>
            </ul>
          </div>
          <div className="addresse">
            <p>
              © Electro Canada Ltd. Suite #102, 425 West 6th Avenue, Vancouver,
              BC V5Y 1L3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
