// Import Instagram icon
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";

// Import Facebook icon and iOS App Store icon
import { FaFacebookSquare, FaAppStoreIos } from "react-icons/fa";

// Import TikTok icon
import { AiFillTikTok } from "react-icons/ai";

// Import Android icon
import { ImAndroid } from "react-icons/im";

// Import Footer-specific CSS styles
import "./footer.css";

// Footer component
const Footer = () => {
  return (
    <div className="footer">
      {/* Container for all footer content */}
      <div className="footer-container">
        {/* Upper section of the footer */}
        <div className="upper-part">
          {/* Company info box */}
          <div className="detail-box">
            {/* Company logo */}
            <div className="logo">
              <img src="./img/Logo-Electro.png" alt="Electro Logo"></img>
            </div>

            {/* Short company description */}
            <div className="detail">
              <p>
                We provide a wide range of high-quality electronics, combining
                innovation, reliability, and competitive pricing to meet your
                needs
              </p>
            </div>

            {/* Social media icons */}
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

          {/* Customer Support links */}
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

          {/* About Us links */}
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

          {/* Mobile App download links */}
          <div className="box">
            <div className="header">
              <h2>Mobile Apps</h2>
            </div>
            <div className="bottom">
              {/* iOS App */}
              <div className="mobile-app">
                <div className="social-icon">
                  <FaAppStoreIos />
                </div>
                <p>IOS App</p>
              </div>

              {/* Android App */}
              <div className="mobile-app">
                <div className="social-icon">
                  <ImAndroid />
                </div>
                <p>Android App</p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal line separator */}
        <div className="ligne"></div>

        {/* Bottom section of the footer */}
        <div className="bottom-section">
          {/* Additional policy links */}
          <div className="additional-links">
            <ul className="links">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Credits</li>
            </ul>
          </div>

          {/* Company copyright */}
          <div className="addresse">
            <p>© 2025 Electro US. All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component
export default Footer;
