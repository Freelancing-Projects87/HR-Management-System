import React, {useState} from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import Candidate from "./CanidateTable";
import {Document, Page} from "react-pdf";
import GradeIng from "./GradeIng";
import {AiFillCheckSquare} from "react-icons/ai"

function CandidateView() {
  let navigate = useNavigate();
  const location = useLocation();
    let [open, setOpen] = useState(false);

 console.log(location.state,"candidate data");
//   const getCandidates = () => {
//     axios
//       .get("http://localhost:8000/api/admin/getCandidates")
//       .then(res => {
//         if (res.status === 200) {
//           setCandidateData(res.data?.data);
//         }
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   };
//  useEffect(()=>{

//  },[location.state])
  return (
    <>
      {" "}
      {/* bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . */}
      <div className="  w-[85%] ml-auto flex items-center justify-start  bg-white ">
        {/* <Header /> */}
        <div className="   h-auto py-12 w-[98%]  ml-auto rounded-2xl">
          <div class="container mx-auto  ">
            <div>
              <div class="bg-white  relative shadow rounded-md py-18 w-5/6 md:w-5/6  lg:w-11/12 xl:w-full mx-auto">
                <div class="">
                  <h1 class="font-bold text-center capitalize text-3xl text-gray-900">
                    {location.state.firstname} {location.state.lastname}
                  </h1>
                  <div class="my-5 px-6">
                    <p class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                      Email of Candidate is :{" "}
                      <span class="font-bold text-blue-500">
                        {location.state.email}
                      </span>
                    </p>
                  </div>
                  <div class="sm:grid sm:grid-cols-4  my-5 px-1">
                    <p class="text-gray-500 hover:text-gray-900 bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      First Name
                    </p>
                    <p class="text-gray-500 hover:text-gray-900 bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      Last Name
                    </p>
                    <p class="text-gray-500 hover:text-gray-900 bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      Nationality
                    </p>

                    <p class="text-gray-500 hover:text-gray-900 bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      Phone
                    </p>
                    <p class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      {location.state.firstname}
                    </p>
                    <p class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      {location.state.lastname}
                    </p>
                    <p class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      {location.state.nationality}
                    </p>

                    <p class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      {location.state.phone}
                    </p>
                  </div>

                  <h1 className="text-center text-blue-500 border-b border-blue-500 p-3 text-3xl">
                    Candidate Interview Questions
                  </h1>
                  {location.state?.quizData
                    ? location.state?.quizData.map(quiz => (
                        <div class=" w-full bg-gray-100  px-2 py-2">
                          <div className="flex w-full justify-between items-center">
                            <div className="question bg-blue-500 rounded-md text-white hover:bg-blue-700  p-2 w-full flex justify-between items-center">
                              <div>{quiz.question}</div>
                              <div>{quiz.finalPercentage ? <AiFillCheckSquare className="w-8 h-8 text-blue-100"/> : "no"}</div>
                            </div>
                            <button
                              onClick={() => {
                                navigate("/grading", {
                                  state: {
                                    quiz: quiz,
                                    _id: location.state?._id,
                                    stateData: location.state,
                                  },
                                });
                              }}
                              className="bg-blue-500 text-white rounded-md hover:bg-blue-700 ml-4 w-[10%] p-2"
                            >
                              Grade
                            </button>
                          </div>
                        </div>
                      ))
                    : "No"}
                  {/* <GradeIng candidate={location.state} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CandidateView;
