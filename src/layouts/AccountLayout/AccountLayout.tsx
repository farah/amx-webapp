import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "layouts/components/Footer";

const AccountLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
export default AccountLayout;
