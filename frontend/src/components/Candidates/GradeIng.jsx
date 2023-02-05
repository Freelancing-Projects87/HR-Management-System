import React from "react";
import {Fragment, useRef, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/outline";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Candidate from "./CanidateTable";
import axiosInstance from "../../utils/axiosInstance";

function GradeIng() {
  const [grade, setGrade] = useState(null);
  const [reverseCandidate, setCandidate] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const saveGrade = () => {
    console.log(grade);
    const FGrade = (grade / 10) * location.state?.quiz?.percent;
    //  alert(perGrade)
    axiosInstance
      .post("api/admin/addGrades", {
        grading: {grade: grade, score: "8%"},
        candidateId: location.state?._id,
        id: location.state?.quiz?.id,
        finalPercentage: FGrade,
      })
      .then(res => {
        if (res.status == 200) {
          console.log(res, "quiz result");
                    getCandidates();
                    console.log(reverseCandidate, "reverseCandidate");
                                     

          toast.success(res.data?.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  const getCandidates = () => {
    axios
      .get("http://localhost:8000/api/admin/getCandidates")
      .then(res => {
        if (res.status === 200) {
          // setCandidateData(res.data?.data);
          // console.log(
          //   res.data?.data?.filter(
          //     candidate => candidate._id == location.state._id
          //   )[0],
          //   "wju"
         
          // );
             navigate("/candidateView", {
               state: res.data?.data?.filter(
                 candidate => candidate._id == location.state._id
               )[0],
             });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    console.log(location.state?.stateData, "you know");
  }, []);
  return (
    <>
      <div className="  w-[85%] ml-auto flex items-center justify-start  bg-white ">
        {/* <Header /> */}
        <div className="   h-auto py-12 w-[98%]  ml-auto rounded-2xl">
          <div class="container mx-auto  ">
            <div class="bg-white  relative shadow rounded-md py-18 w-5/6 md:w-5/6  lg:w-11/12 xl:w-full mx-auto">
              <div class="">
                <h1 className="text-center text-blue-500 border-b border-blue-500 p-3 text-3xl">
                  Give Grade to Interview
                </h1>

                <div class=" w-full bg-gray-100  px-2 py-2">
                  <div className="flex w-full  justify-between items-center">
                    <div className="w-full flex flex-col">
                      <div className="question bg-blue-500  text-white hover:bg-blue-700  p-2 w-full ">
                        <span className="text-gray-300 font-extrabold">
                          Question:
                        </span>{" "}
                        {location.state?.quiz.question}
                      </div>
                      <div className="question bg-gray-300  text-black hover:bg-gray-200 h-24 p-2 overflow-y-scroll w-full ">
                        <span className=" font-extrabold">Answer:</span>{" "}
                        {/* <br /> */}
                        {location.state?.quiz.answer}
                      </div>
                    </div>
                    <div className="w-[15%] flex justify-between flex-col bg-gray-300 space-y-6 h-[19.1vh] p-2">
                      <select
                        className={`w-full ${
                          !grade ? "broder border-red-500" : ""
                        } p-2`}
                        onChange={e => {
                          setGrade(e.target.value);
                        }}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <button
                        onClick={() => {
                          saveGrade();
                        }}
                        className="bg-blue-500 text-white rounded-md hover:bg-blue-700  w-full p-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                {/* <GradeIng candidate={location.state} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GradeIng;
