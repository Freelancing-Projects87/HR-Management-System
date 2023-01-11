import Dashboard from "./LayoutAdmin/Dashboard";
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
import BusinessEdit from "./components/BusinessPipeline/BusinessEdit";
import BusinessView from "./components/BusinessPipeline/BusinessView";
import BusinessCaseTable from "./components/BusinessCase/BusinessCaseTable";
import BusinessCaseAdd from "./components/BusinessCase/BusinessCaseAdd";
import BusinesscaseEdit from "./components/BusinessCase/BusinessCaseEdit";
import GradeIng from "./components/Candidates/GradeIng";
import AddSkill from "./components/Skills/SkillAdd"
import EditSkill from "./components/Skills/SkillEdit";
import Skills from "./components/Skills/Skills";



import Interview from "./components/Interview/Interview";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const paths = [
    "/candidates",
    "/editcandidate",
    "/addcandidate",
    "/bussinessline",
  ];
  useEffect(() => {
    if (window.location.pathname === "/") {
      if (!isAuthenticUser()) {
        window.location.pathname = "/login";
      }
    }
  }, [isAuthenticUser()]);

  return (
    <div className="App">
      <ToastContainer />
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
            <Route path="/interview" element={<Interview />} />
            <Route path="/businesscase" element={<BusinessCaseTable />} />
            <Route path="/businesscaseAdd" element={<BusinessCaseAdd />} />
            <Route path="/businesscaseEdit" element={<BusinesscaseEdit />} />
            <Route path="/grading" element={<GradeIng />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/addskill" element={<AddSkill />} />
            <Route path="/editskill" element={<EditSkill />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
