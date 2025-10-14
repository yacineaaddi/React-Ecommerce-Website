import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { db, app } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import "./auth.css";

const Register = ({ setUserDetail, setAuth, Auth, OneProduct, Button }) => {
  // Storing the input value using usestate hooks

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dbref = collection(db, "User");

  // Creating New User Account On Firebase

  const Authentication = async (e) => {
    // Guard Clause to prevent empty values
    if (
      name.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      password.length === 0
    ) {
      alert("All field are required");
    } else {
      try {
        e.preventDefault();
        const creatAccount = await app
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (creatAccount) {
          // Storing The User Data
          const userInfo = await addDoc(dbref, {
            Name: name,
            Email: email,
            Phone: phone,
          });
          if (userInfo) {
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
            alert("User Registre Successfully");
            setAuth(true);
            navigate("/");
          }
        }
        /* } else {
          alert("Error While Registring User");
        }*/
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
            <FaRegUser />
          </div>
          <div className="form">
            <div className="box">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
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
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <button onClick={(e) => Authentication(e)}>Register</button>
            <p>
              Already have an account ? <Link to="/login">Click Here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
