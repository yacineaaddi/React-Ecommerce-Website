// Link + navigation helpers from React Router
import { Link, useNavigate } from "react-router-dom";

// React hooks for local component state + lifecycle
import { useState, useEffect } from "react";

// Redux hook for dispatching actions
import { useDispatch } from "react-redux";

// User icon used in the signup form header
import { FaUser } from "react-icons/fa6";

// Auth page styles
import "../Auth/auth.css";

// Thunk function responsible for handling signup logic
import { HandleSignup } from "../../features/auth/AuthThunk";

// Signup component (registration form)
const Signup = () => {
  const dispatch = useDispatch();

  // Local form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Set page title once when component mounts
  useEffect(function () {
    document.title = "Sign Up | Electro";
  }, []);

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

          {/* Signup form */}
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

            {/* Dispatch signup thunk on click */}
            <button
              onClick={(e) =>
                dispatch(HandleSignup(name, email, phone, password, navigate))
              }
            >
              Register
            </button>

            {/* Link to login page */}
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
