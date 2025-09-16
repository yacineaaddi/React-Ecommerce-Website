import React from "react";
import Register from "./register";
import { Route, Routes } from "react-router-dom";
import Login from "./login";

const Rout = ({ setUserDetail }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register setUserDetail={setUserDetail} />} />
        <Route
          path="/login"
          element={<Login setUserDetail={setUserDetail} />}
        />
      </Routes>
    </>
  );
};

export default Rout;
