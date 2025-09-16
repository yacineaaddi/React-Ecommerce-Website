import React from "react";
import Register from "./register";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Home from "./home";

const Rout = ({ setUserDetail, setAuth, Auth }) => {
  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={
            <Register
              setUserDetail={setUserDetail}
              setAuth={setAuth}
              Auth={Auth}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setUserDetail={setUserDetail}
              setAuth={setAuth}
              Auth={Auth}
            />
          }
        />
        <Route path="/" element={<Home setUserDetail={setUserDetail} />} />
      </Routes>
    </>
  );
};

export default Rout;
