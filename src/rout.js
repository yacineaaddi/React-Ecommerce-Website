import React from "react";
import Register from "./components/register";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";

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
