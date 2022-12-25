import Dashboard from "./pages/Dashboard";
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import { isAuthenticUser } from "./utils/isAuthenticated";
import Login from "./components/Auth/SignIn";
import Signup from "./components/Auth/Signup";
import CanidateTable from "./components/Candidates/CanidateTable";
import PrivateRoute from "./components/PrivateRoute";



function App() {
    // if (window.location.pathname === "/"){
      // if(!isAuthenticUser()){
      //  window.location.pathname = "/login";
      // }      
    // }
  return (
    <div className="App">
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/candidates" element={<CanidateTable />} exact />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
