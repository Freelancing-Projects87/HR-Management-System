import React, {useEffect} from "react";
import {isAuthenticUser} from "../../utils/isAuthenticated";
import {Outlet, Navigate} from "react-router-dom";

export default function PrivateRoute({children}) {
  const isLoggedIn = isAuthenticUser(); // check cookie or local storage etc.
  return <>{!isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
}
