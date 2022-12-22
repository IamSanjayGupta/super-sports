import React from "react";
import { Route, Routes } from "react-router-dom";
import NewEvent from "../components/event/NewEvent";
import LoginPage from "./account/LoginPage";
import SignupPage from "./account/SignupPage";
import EventDetailsPage from "./event/EventDetailsPage";
import RequestsPage from "./Booking/RequestsPage";
import HomePage from "./HomePage";
import PendingForMyApprovalPage from "./Booking/PendingForMyApprovalPage";
import PrivateRoute from "../components/PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/newEvent"
        element={
          <PrivateRoute>
            <NewEvent />
          </PrivateRoute>
        }
      />
      <Route
        path="/eventDetails/:id"
        element={
          <PrivateRoute>
            <EventDetailsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/requests"
        element={
          <PrivateRoute>
            <RequestsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/pendingApproval"
        element={
          <PrivateRoute>
            <PendingForMyApprovalPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
