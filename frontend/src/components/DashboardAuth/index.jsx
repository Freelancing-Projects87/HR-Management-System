import React from 'react'
import Dashboard from '../../pages/Dashboard';
import { isAuthenticUser } from '../../utils/isAuthenticated';

function DashboardAuth() {

  return <div>{isAuthenticUser() ? <Dashboard/> : ""}</div>;
}

export default DashboardAuth;