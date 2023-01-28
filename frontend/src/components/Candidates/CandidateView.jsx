import React, {useState,useRef} from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import Candidate from "./CanidateTable";
import {Document, Page} from "react-pdf";
import GradeIng from "./GradeIng";
import {AiFillCheckSquare} from "react-icons/ai";
import {MultiSelect} from "react-multi-select-component";
import {AiFillFilePdf} from "react-icons/ai";
import {toast, ToastContainer} from "react-toastify";

function CandidateView() {
  const [skills, setSkills] = useState([]);
  const [interviews, setInterviews] = useState([]);
  let [selectedInterview, setSelectedInterview] = useState([]);
  let [totalGrade, setGrade] = useState();
  const [averageGrade, setAverageGrade] = useState();

  let navigate = useNavigate();
  const location = useLocation();
  let [open, setOpen] = useState(false);
  const ref = useRef(null);

  // total grade function

  const getSkills = () => {
    axios
      .get("http://localhost:8000/api/admin/getskills")
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.data, "skills 2.0");
          setSkills(
            res.data?.data.map(skill => {
              return {label: skill?.skill, value: skill?.skill};
            })
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    getSkills();
    console.log(skills, "skills 3.0");
  }, []);

  console.log(location.state, "dfd");

  console.log(interviews, "interviews");
  //  scrool to interview
  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: "smooth"});
  };
  useEffect(() => {
    let {quizData, quizData2} = location.state;
    let interviews = [quizData, quizData2];
    setInterviews(interviews);
    let SumOfScore =
      Number(location.state.totalGrade) +
      Number(location.state.totalGrade2 ? location.state.totalGrade2 : 0);
    setAverageGrade(
      location.state.totalGrade2 ? SumOfScore / 2 : location.state.totalGrade
    );
  }, [location.state]);
  console.log(averageGrade, "averageGrade");
  ////////////////////////////////////////////////////// quiz function to save all data in db y.k
  const getInterviewsOfCandidates = id => {
    axios
      .get(`http://localhost:8000/api/admin/getInterviews/${id}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data, "two candidates should be there?,,,,,,,");
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    getInterviewsOfCandidates(location.state?._id);
  }, []);
  return (
    <>
      <ToastContainer />{" "}
      <div className="   w-[85%] ml-auto flex items-center justify-start h-[80vh]  bg-white  mt-6">
        <div className="w-11/12 mx-auto relative">
          <h1 className="absolute -top-24 w-full text-center text-2xl font-semibold text-gray-600">
            {" "}
            <span>Average Score: {averageGrade}</span>
          </h1>

          <div className="w- grid grid-cols-2  gap-3">
            {interviews[0]?.length > 0 ? (
              interviews?.map((interview, i) =>
                interview.length > 0 ? (
                  <div
                    onClick={() => {
                      setSelectedInterview(interview);
                      handleClick();
                      setGrade(
                        i == 0
                          ? location.state?.totalGrade
                          : location.state?.totalGrade2
                      );
                    }}
                    className=" bg-gray-200 text-start relative space-y-2 shadow-lg h-[40vh] flex flex-col items-center justify-center font-semibold text-gray-500 text-xl border-2 hover:border-blue-200   text-center rounded-md hover:bg-gray-50  cursor-pointer"
                  >
                    <div className="absolute top-0 w-full h-12 bg-purple-700 text-center text-white">
                      {i == 0 ? (
                        <span>First Interview</span>
                      ) : (
                        <span>Second Interview</span>
                      )}
                    </div>
                    <div className="text-start">
                      <span className="text-gray-600 font-bold">
                        Total Grade:{" "}
                      </span>

                      {i == 0
                        ? location.state.totalGrade
                        : location.state.totalGrade2}
                    </div>
                    <div>
                      <span className="text-gray-600 font-bold">
                        Total Percentage:{" "}
                      </span>
                      {i == 0
                        ? location.state.totalScore + "%"
                        : location.state.totalScore2 + "%"}
                    </div>
                    <div>
                      <span className="text-gray-600 font-bold">
                        Average grade:{" "}
                      </span>
                      {i == 0
                        ? location.state.averageGrade + "%"
                        : location.state.averageGrade2 + "%"}
                    </div>
                  </div>
                ) : (
                  ""
                )
              )
            ) : (
              <h1>This candidate have not Interviewed yet!</h1>
            )}
          </div>
        </div>
      </div>
      {/* bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . */}
      <div
        ref={ref}
        className={`${
          !selectedInterview.length ? "opacity-0" : ""
        }  w-[85%] ml-auto flex items-center justify-start  bg-white`}
      >
        {/* <Header /> */}
        <div className="   h-auto pt-1 w-[98%]  ml-auto rounded-2xl">
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
                  <div class="sm:grid sm:grid-cols-2  my-5 px-1">
                    <p class="text-gray-500 hover:text-gray-900 bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      Nationality
                    </p>

                    <p class="text-gray-500 hover:text-gray-900 bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">
                      Phone
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
                  <div className="w-11/12 m-auto p-4 flex items-center justify-between">
                    <div className="w-1/3 flex flex-col">
                      <span className="font-bold">Skills</span>
                      <div className="w-11/12 grid grid-cols-4 flex ">
                        {skills.map((skil, i) => (
                          <>
                            <label>{skil?.value}</label>
                          </>
                        ))}
                      </div>
                    </div>

                    <div className="w-1/3 flex flex-col">
                      <span className="font-bold">Recomendation</span>
                      {/* <select className="border broder-gray-2 py-3 px-2  ">
                        <option value="">choose Recomendation</option>
                        <option value="offer">Offer</option>
                        <option value="offer">Not offer</option>
                        <option value="offer">Second Interview</option>
                      </select> */}
                      <ul className="radios">
                        <li>
                          <label htmlFor="num1">
                            {location.state.recomendation}
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div>
                      {" "}
                      <span className="font-bold">Total Grade</span>
                      <h1 className="font-extrabold">{totalGrade}</h1>
                    </div>
                  </div>

                  {selectedInterview
                    ? selectedInterview.map(quiz => (
                        <div class=" w-full bg-gray-100  px-2 py-2">
                          <div className="flex w-full justify-between items-center">
                            <div className="question bg-blue-500 rounded-md text-white hover:bg-blue-700  p-2 w-full flex justify-between items-center">
                              <div>{quiz.question}</div>
                              <div className="flex">
                                <span className="lml-4">
                                  {quiz.finalPercentage
                                    ? quiz.finalPercentage + "%"
                                    : ""}
                                </span>{" "}
                                {quiz.finalPercentage ? (
                                  <AiFillCheckSquare className="w-8 h-8 text-blue-100" />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <button
                              //   onClick={() => {
                              //     navigate("/grading", {
                              //       state: {
                              //         quiz: quiz,
                              //         _id: location.state?._id,
                              //         stateData: location.state,
                              //       },
                              //     });
                              //   }}
                              className="bg-blue-500 text-white rounded-md hover:bg-blue-700 ml-4 w-[10%] p-2"
                            >
                              {quiz?.grade ? quiz.grade + "" : "Grade"}
                            </button>
                          </div>
                        </div>
                      ))
                    : "No"}
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
