import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { db, app } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

import "./auth.css";
const Login = ({ setUserDetail }) => {
  // Storing the input value using usestate hooks

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dbref = collection(db, "User");

  // Creating New User Account On Firebase

  const Authentication = async (e) => {
    // Guard Clause to prevent empty values
    if (email.length === 0 || password.length === 0) {
      alert("All field are required");
    } else {
      try {
        e.preventDefault();
        const creatAccount = await app
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (creatAccount) {
          const getData = await getDocs(dbref);
          const data = getData.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(data);
          const userdata = data.findLast((info) => {
            return info.Email === email;
          });
          setUserDetail(userdata);
          alert("User Login Successfully");
        } else {
          alert("Error While Login User");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
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
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className="box">
              <input
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button onClick={(e) => Authentication(e)}>Login</button>
            <p>
              Don't have an account ? <Link to="/">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
