import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { RootState } from "app/rootReducer";
import { useSelector} from "react-redux";
import LandingPage from "pages/landing";
import { PrivateRoute, GuardRoute } from "utils/routes";

const TransferFlow = lazy(() => import("pages/transferFlow"));
const SuccessPage = lazy(() => import("pages/success"));
const LocationsPage = lazy(() => import("pages/locations"));
const LoginPage = lazy(() => import("pages/login"));
const ContactPage = lazy(() => import("pages/contact"));
const PublicLayout = lazy(() => import("layouts/PublicLayout"));
const Account = lazy(() => import("pages/account"));


type Props = {
  history: any;
};

function AppShell({ history }: Props) {
  const { orderComplete } = useSelector((state: RootState) => state.transferFlow);
 
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="locations" element={<LocationsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      <PrivateRoute path="/account/*" element={<Account  />} />
      <PrivateRoute orderComplete={orderComplete} path="/transfer/*" element={<TransferFlow history={history}/>} />

      <GuardRoute path="login" element={<LoginPage />} />
      <PrivateRoute path="/transfer/success/:orderId" element={<SuccessPage />} />
    </Routes>
  );
}

export default AppShell;
