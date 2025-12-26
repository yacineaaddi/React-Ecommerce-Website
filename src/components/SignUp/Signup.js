import { login, setUserDetail } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { db, app } from "../../services/firebase";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import "../Auth/auth.css";

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(function () {
    document.title = "Sign Up | Electro";
  }, []);
  // Creating New User Account On Firebase
  const Authentication = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      //  Create user account (Firebase Auth) Firebase which returns a UserCredential object
      // That contains information about the newly created user, credentials, and metadata

      const createAccount = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);

      //Pulls the actual User object from the UserCredential
      // user contains the authenticated user info such as uid, email, emailVerified, etc.

      const user = createAccount.user;
      // Write user data to Firestore using UID as document ID
      const userRef = db.collection("users").doc(user.uid);
      // Prepares the object i want to save in Firestore
      const newUserData = {
        Name: name,
        Email: email,
        Phone: phone,
      };
      //Writes the newUserData object to the document referenced by userRef.
      await userRef.set(newUserData);

      // Update local state
      dispatch(setUserDetail({ id: user.uid, ...newUserData }));

      toast.success("User Registered Successfully");
      dispatch(login());
      navigate("/");
    } catch (err) {
      console.error("Error creating user:", err.message);
      toast.error(err.message);
    }
  };

  /*useKey("Enter", (e) => {
    Authentication(e);
  });*/

  return (
    <>
      <div className="auth">
        <div className="container">
          <h2>Electro</h2>
          <div className="icon">
            <FaUser />
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
                required
              ></input>
            </div>
            <div className="box">
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
            <div className="box">
              <input
                type="password"
                placeholder="Password"
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

export default Signup;
