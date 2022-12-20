import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./account/LoginPage";
import SignupPage from "./account/SignupPage";
import HomePage from "./HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AllRoutes;
