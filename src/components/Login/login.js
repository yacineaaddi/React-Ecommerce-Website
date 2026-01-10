// React / Router imports
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// Redux imports
import { useDispatch } from "react-redux";
import { HandleLogin } from "../../features/auth/authThunk";

// Icons imports
import { MdOutlineLogin } from "react-icons/md";

// Styles imports
import "../Auth/auth.css";

/*import useKey from "../../hooks/useKeyHook";*/

const Login = () => {
  // State to store the password input value
  const [password, setPassword] = useState("");

  // State to store the email input value
  const [email, setEmail] = useState("");

  // Redux dispatch function to send actions to the store
  const dispatch = useDispatch();

  // React Router navigate function to programmatically navigate
  const navigate = useNavigate();

  // Ref for the email input element (can be used to focus or read value directly)
  const inputEmail = useRef();

  // Ref for the password input element (can be used to focus or read value directly)
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
  // Set page title once when component mounts
  useEffect(function () {
    document.title = "Log In | Electro";
  }, []);
  return (
    <>
      {/* Wrapper fragment */}
      <div className="auth">
        {/* Main auth container */}
        <div className="container">
          {/* Website / app title */}
          <h2>Electro</h2>

          {/* Icon above the form */}
          <div className="icon">
            <MdOutlineLogin />
          </div>

          {/* Form container */}
          <div className="form">
            {/* Email input box */}
            <div className="box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                ref={inputEmail}
                className="stop"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input box */}
            <div className="box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="stop"
                ref={inputPass}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login button */}
            <button
              onClick={() =>
                // Dispatch the login thunk with email, password, and navigate function
                dispatch(HandleLogin({ email, password, navigate }))
              }
            >
              Login
            </button>

            {/* Link to signup page */}
            <p>
              Don't have an account ? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// Export component
export default Login;
