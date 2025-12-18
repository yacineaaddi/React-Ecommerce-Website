import { login, setUserDetail } from "../features/auth/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { MdOutlineLogin } from "react-icons/md";
import { db, app } from "../services/firebase";
import { useDispatch } from "react-redux";
import useKey from "../hooks/useKeyHook";
import toast from "react-hot-toast";

import "./auth.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputEmail = useRef();
  const inputPass = useRef();
  /*
  useKey("Escape", () => {
    Promise.resolve().then(() => {
      const active = document.activeElement;
      // Ignore if focused in input
      if (
        active?.classList.contains("stop") ||
        active?.getAttribute("aria-autocomplete") !== null
      ) {
        console.log(1);
      } else {
        console.log(2);
      }
    });
  });*/ useEffect(function () {
    document.title = "Log In | Electro";
  }, []);
  const Authentication = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        app.auth(),
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = { id: userDoc.id, ...userDoc.data() };
          dispatch(setUserDetail(userData));
          console.log(userData);
          dispatch(login());

          toast.success("User Logged In Successfully");
          navigate("/");
        } else {
          toast.error("User data not found in Firestore!");
        }
      }
    } catch (err) {
      console.error("Login error:", err.message);
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="auth">
        <div className="container">
          <h2>Electro</h2>
          <div className="icon">
            <MdOutlineLogin />
          </div>
          <div className="form">
            <div className="box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                ref={inputEmail}
                className="stop"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>

            <div className="box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="stop"
                ref={inputPass}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button onClick={(e) => Authentication(e)}>Login</button>
            <p>
              Don't have an account ? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
