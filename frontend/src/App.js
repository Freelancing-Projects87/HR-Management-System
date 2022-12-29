import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  useNavigate,
} from "react-router-dom";
import {isAuthenticUser} from "./utils/isAuthenticated";
import Login from "./components/Auth/SignIn";
import Signup from "./components/Auth/Signup";
import CanidateTable from "./components/Candidates/CanidateTable";
import CandidateEdit from "./components/Candidates/CandidateEdit";
import CandidateAdd from "./components/Candidates/CandidateAdd";
import PrivateRoute from "./components/PrivateRoute";
import BussinessPipeline from "./components/BusinessPipeline/BussinessTable";
import {useEffect, useState} from "react";

function App() {
  const paths = ["/candidates", "/editcandidate", "/addcandidate","/bussinessline"];
  useEffect(() => {
    if (window.location.pathname === "/") {
      if (!isAuthenticUser()) {
        window.location.pathname = "/login";
      }
    }
  }, [isAuthenticUser()]);
 

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticUser() ? <Dashboard /> :''}

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/candidates" element={<CanidateTable />} exact />
            <Route path="/editcandidate" element={<CandidateEdit />} exact />
            <Route path="/addcandidate" element={<CandidateAdd />} exact />
            <Route
              path="/bussinessline"
              element={<BussinessPipeline />}
              exact
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
