import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "contexts/Firebase";

export const PrivateRoute: React.FC<any> = (props): any => {
  const { path, orderComplete, history, ...rest } = props

  const { isAuthenticated, authResult } = useAuth();

  if (isAuthenticated()) {
    return <Route path={path} {...rest} />;
  }
  // @ts-ignore
  return <Navigate to="/login" />;
};

export const GuardRoute: React.FC<any> = (props): any => {
  const { path, orderComplete, history, ...rest } = props
  const { isAuthenticated, authResult } = useAuth();

  if (isAuthenticated()) {
    return  <Navigate to="/transfer" />;
  }
  // @ts-ignore
  return<Route path="login" {...rest} />;
}
export default GuardRoute
