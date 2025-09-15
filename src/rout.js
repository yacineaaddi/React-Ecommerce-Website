import React from "react";
import Register from "./register";
import { Route, Routes } from "react-router-dom";

const Rout = ({ setUserDetail }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register setUserDetail={setUserDetail} />} />
      </Routes>
    </>
  );
};

export default Rout;
