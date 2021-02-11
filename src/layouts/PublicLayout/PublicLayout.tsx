import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "layouts/components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
export default PublicLayout;
