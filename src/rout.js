import React from "react";
import Register from "./register";
import { Route, Routes } from "react-router-dom";

const Rout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </>
  );
};

export default Rout;
