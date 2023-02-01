import Dashboard from "./LayoutAdmin/Dashboard";
import {useEffect, useState} from "react";
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
import CandidsteSecondQuestion from "./components/Candidates/CandidateSecondQuestion";
import PrivateRoute from "./components/PrivateRoute";
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
import Metrics from "./components/Metrics";
import Profile from "./components/Profile"
import axios from "axios";
import Interview from "./components/Interview/Interview";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMehRollingEyes } from "react-icons/fa";
import Questions from "./components/Questions/Questions";
import QuestionAdd from "./components/Questions/QuestionAdd";
import UpdateQuestion from "./components/Questions/UpdateQuestion";

const roles={admin:"admin",junior:"junior"}
function App() {
  const [role,setRole]=useState(null)
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
   function getUser() {
    let user=JSON.parse(localStorage.getItem('user'))
     axios
       .get(`http://localhost:8000/api/users/getuser/${user?._id}`)
       .then(res => {
         if (res.status === 200) {
           setRole(res.data.data?.role);
           console.log(res.data?.data.role, "res.data?.role");
         }
       })
       .catch(err => {
         console.error(err);
       });
   }
   useEffect(() => {
     getUser();
   }, []);
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        {isAuthenticUser() ? <Dashboard role={role} /> : ""}

        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/candidates" element={<CanidateTable />} exact />
            <Route path="/editcandidate" element={<CandidateEdit />} exact />
            <Route path="/addcandidate" element={<CandidateAdd />} exact />
            <Route
              path="/CandidsteSecondQuestion"
              element={<CandidsteSecondQuestion />}
            />
            <Route path="/candidateView" element={<CandidateView />} exact />
            {role == roles.admin ? (
              <>
                <Route path="/business" element={<Business />} exact />
                <Route path="/editBusiness" element={<BusinessEdit />} exact />
                <Route path="/addbusiness" element={<BusinessAdd />} exact />
                <Route path="/businessView" element={<BusinessView />} />
              </>
            ) : (
              ""
            )}
            <Route path="/interview" element={<Interview />} />
            <Route path="/businesscase" element={<BusinessCaseTable />} />
            <Route path="/businesscaseAdd" element={<BusinessCaseAdd />} />
            <Route path="/businesscaseEdit" element={<BusinesscaseEdit />} />
            <Route path="/grading" element={<GradeIng />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/addskill" element={<AddSkill />} />
            <Route path="/editskill" element={<EditSkill />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/addQuestion" element={<QuestionAdd />} />
            <Route path="/editQuestion" element={<UpdateQuestion />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
