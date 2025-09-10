import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Register = () => {
  return (
    <>
      <div className="auth">
        <div className="container">
          <h2>Electro</h2>
          <div className="icon">
            <FaShoppingCart />
          </div>
          <div className="form">
            <div className="box">
              <input type="text" placeholder="Full Name"></input>
            </div>
            <div className="box">
              <input type="email" placeholder="Email"></input>
            </div>
            <div className="box">
              <input type="text" placeholder="Phone Number"></input>
            </div>
            <div className="box">
              <input type="password" placeholder="Password *"></input>
            </div>
            <button>Register</button>
            <p>
              Already have an account ? <Link>Click Here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
