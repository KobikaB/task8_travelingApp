// src/layout/RootLayout.tsx
import React from "react";
import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
