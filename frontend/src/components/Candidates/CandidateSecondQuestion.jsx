import React, {useState} from "react";
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
import axiosInstance from "../../utils/axiosInstance";

function CandidateView() {
  const [selected, setSelected] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [recomendation, setIsRadio] = useState();

  let navigate = useNavigate();
  const location = useLocation();
  let [open, setOpen] = useState(false);

  //function to find total percentage based on added on each question
  function CalculateGrandTotal() {
    const findingPercentages = location.state?.quizData.map(data => ({
      ...data,
      totalGrade: (data.grade / 10) * Number(data.percent),
    }));
    let percentages = findingPercentages.map(data => data.totalGrade);
    console.log(findingPercentages, "df", percentages);
    const grandTotal = percentages.reduce((acc, curr) => acc + (curr || 0), 0);
    return Math.floor(grandTotal);
  }

  // function to select skills for candidate
  const handleCheckboxChange = event => {
    setSelectedSkills({
      ...selectedSkills,
      [event.target.name]: event.target.checked,
    });
  };
  // function to get skills
  const getSkills = () => {
    axiosInstance
      .get("api/admin/getskills")
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
  // effect for checking selected skills
  useEffect(() => {
    getSkills();
  }, [selectedSkills]);

  // HANDLE THE ONCHANGE HERE for radio button to /hire/reject/second Interview
  const handleChange = e => {
    // string passed in
    // a string returned by default
    console.log(e.currentTarget.value);
    // add + to the event to make the value a number
    setIsRadio(e.currentTarget.value);
  };

  // final quiz add function on candidate profile y.k////////////////////////////////////////////////////////////////
  const saveInterview = data => {
    // to find total grade of all question
    let totalgrade = location.state?.quizData.reduce(
      (acc, curr) => acc + (curr.grade || 0),
      0
    );
    //  add totalScore in percent with grade of each question for db
    let meanScore = totalgrade / location.state?.quizData.length;
    console.log(meanScore, "meanScore");
    const quizData = location.state?.quizData.map(data => ({
      ...data,
      grade: data.grade,
      totalScore: (data.grade / 10) * Number(data.percent),
    }));
    const gradeGrand = CalculateGrandTotal();
    console.log(gradeGrand, "see its there or not");
    if (recomendation || selectedSkills.length > 0) {

      axiosInstance
        .post("api/admin/addInterview", {
          QA: quizData,
          businessCase: data?.businessCase,
          id: location.state.id,
          isInterviewed: true,
          // skills: Object.keys(selectedSkills).map(v => ({skill: v})),
          // recomendation: recomendation,
          totalScore: gradeGrand,
          totalGrade: totalgrade,
          averageGrade: meanScore,
          // exceldata: location.state?.exceldata,
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res, "quiz result");
            navigate("/");
            toast.success("Interview added successfully..!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      toast.error("please fill Skills and Recomendation", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
 
  const secondInterviewUpdateFields = data => {
    // to find total grade of all question
    let totalgrade = location.state?.quizData.reduce(
      (acc, curr) => acc + (curr.grade || 0),
      0
    );
    //  add totalScore in percent with grade of each question for db
    let meanScore = totalgrade / location.state?.quizData.length;
    console.log(meanScore, "meanScore");
    const gradeGrand = CalculateGrandTotal();
    console.log(gradeGrand, "see its there or not");
    if (recomendation || selectedSkills.length > 0) {
      axiosInstance
        .post("api/admin/adddFieldToCandidate", {
          businessCase: data?.businessCase,
          id: location.state.id,
          isInterviewed: true,
          skills: Object.keys(selectedSkills).map(v => ({skill: v})),
          recomendation: recomendation,
          exceldata: location.state?.exceldata,
          averageGrade: meanScore,
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res, "quiz result");
            navigate("/candidates");
            toast.success("Interview added successfully..!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      toast.error("please fill Skills and Recomendation", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  console.log(location.state, "dfd");
  return (
    <>
      <ToastContainer />{" "}
      {/* bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . */}
      <div className="  w-[85%] ml-auto flex items-center justify-start  bg-white ">
        {/* <Header /> */}
        <div className="   h-auto py-12 w-[98%]  ml-auto rounded-2xl">
          <div class="container mx-auto  ">
            <div>
              <div class="bg-white  relative shadow rounded-md py-18 w-5/6 md:w-5/6  lg:w-11/12 xl:w-full mx-auto">
                <div class="">
                  {/* <h1 class="font-bold text-center capitalize text-3xl text-gray-900">
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
                  </div> */}

                  <h1 className="text-center text-blue-500 border-b border-blue-500 p-3 text-3xl">
                    Candidate Interview Questions
                  </h1>
                  <div className="w-11/12 m-auto p-4 flex items-center justify-between">
                    <div className="w-1/3 flex flex-col">
                      <span className="font-bold">Skills</span>
                      <div className="w-11/12 grid grid-cols-4 flex ">
                        {skills.map((skil, i) => (
                          <>
                            <label>
                              <input
                                type="checkbox"
                                name={skil?.label}
                                onChange={handleCheckboxChange}
                              />
                              {skil?.value}
                            </label>
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
                          <input
                            type="radio"
                            id="radio1"
                            value="offer"
                            onChange={handleChange}
                            checked={recomendation === "offer"}
                          />
                          <label htmlFor="num1">offer</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="radio2"
                            value="Notoffer"
                            onChange={handleChange}
                            checked={recomendation === "Notoffer"}
                          />
                          <label htmlFor="num2">Not offer</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                        
                            id="radio3"
                            value="SecondInterview"
                            onChange={handleChange}
                            checked={recomendation === "SecondInterview"}
                          />
                          <label htmlFor="num3">Second Interview</label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {location.state?.quizData
                    ? location.state?.quizData.map(quiz => (
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
                              // onClick={() => {
                              //   navigate("/grading", {
                              //     state: {
                              //       quiz: quiz,
                              //       _id: location.state?._id,
                              //       stateData: location.state,
                              //     },
                              //   });
                              // }}
                              className="bg-blue-500 text-white rounded-md hover:bg-blue-700 ml-4 w-[10%] p-2"
                            >
                              {quiz?.grade ? quiz.grade : "Grade"}
                            </button>
                          </div>
                        </div>
                      ))
                    : "No"}
                  {/* {location.state?.quizData.length > 0 ? (
                    <div className="flex w-full items-center justify-center p-4">
                      <button
                        onClick={() => {
                          CalculateGrandTotal();
                        }}
                        className="bg-blue-500 p-4 text-white rounded-md hover:bg-blue-400 hover:font-semibold"
                      >
                        Calculate Total
                      </button>
                    </div>
                  ) : (
                    ""
                  )} */}
                  {/* <GradeIng candidate={location.state} /> */}
                  <div className="w-full py-4 flex items-center justify-center">
                    {location.state?.quizData ? (
                      <button
                        onClick={() => {
                          // if (
                          //   location?.state?.isSecondTime == "SecondInterview"
                          // ) {
                          saveInterview(location.state);
                          secondInterviewUpdateFields(location.state);
                          // }
                        }}
                        className="bg-blue-500 text-white rounded-md py-4  px-4"
                      >
                        Save Interview
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
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
