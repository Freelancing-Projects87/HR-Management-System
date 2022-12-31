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
import CandidateView from "./components/Candidates/CandidateView";
import PrivateRoute from "./components/PrivateRoute";
import {useEffect, useState} from "react";
import Business from "./components/BusinessPipeline/BussinessTable";
import BusinessAdd from "./components/BusinessPipeline/BusinessAdd";
import BusinessEdit from "./components/BusinessPipeline/BusinessEdit"
import BusinessView from "./components/BusinessPipeline/BusinessView";

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
        {isAuthenticUser() ? <Dashboard /> : ""}

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/candidates" element={<CanidateTable />} exact />
            <Route path="/editcandidate" element={<CandidateEdit />} exact />
            <Route path="/addcandidate" element={<CandidateAdd />} exact />
            <Route path="/candidateView" element={<CandidateView />} />
            <Route path="/business" element={<Business />} exact />
            <Route path="/editBusiness" element={<BusinessEdit />} exact />
            <Route path="/addbusiness" element={<BusinessAdd />} exact />
            <Route path="/businessView" element={<BusinessView />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
