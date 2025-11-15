import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { db, app } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRef } from "react";
import useKey from "./usekey";
import "./auth.css";
import toast from "react-hot-toast";

const Login = ({ setUserDetail, setAuth }) => {
  // Storing the input value using usestate hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  });*/
  const Authentication = async (e) => {
    e.preventDefault();

    // 1️⃣ Guard clause
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      // 2️⃣ Sign in the user with email/password
      const userCredential = await signInWithEmailAndPassword(
        app.auth(),
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // 3️⃣ Get the Firestore document for this user (by UID)
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = { id: userDoc.id, ...userDoc.data() };
          setUserDetail(userData);
          console.log(userData); // Update local state
          setAuth(true);

          toast.success("User Logged In Successfully");
          navigate("/"); // Redirect
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
