import React, {useState, useEffect} from "react";
import {
  FaDownload,
  FaDailymotion,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import {AiFillFilePdf} from "react-icons/ai";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {quizMetadata} from "../../utils/questions";
import * as XLSX from "xlsx";
import readXlsxFile from "read-excel-file";
import {MultiSelect} from "react-multi-select-component";
import axiosInstance from "../../utils/axiosInstance";

function QuestionsAnswers() {
  const location = useLocation();
    const [questions, setQuestionsData] = useState([]);
  let [quizData, setQuestions] = useState([]);
console.log(quizData, "quizMetadata");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let [indexOfQuestion, setIndexes] = useState({
    firstIndex: 0,
    lastIndex: quizData?.length-1,
  });
  const [businessCases, setBusinessCases] = useState([]);
  const [selected, setSelected] = useState([]);
  const [exceldata, setExcelData] = useState({
    expectedResult: "",
    approach: "",
    context: "",
  });
  const [gradeArray, setGradeArray] = useState([
    {value: 1, id: 1, isGradeActive: false},
    {value: 2, id: 2, isGradeActive: false},
    {value: 3, id: 3, isGradeActive: false},
    {value: 4, id: 4, isGradeActive: false},
    {value: 5, id: 5, isGradeActive: false},
    {value: 6, id: 6, isGradeActive: false},
    {value: 7, id: 7, isGradeActive: false},
    {value: 8, id: 8, isGradeActive: false},
    {value: 9, id: 9, isGradeActive: false},
    {value: 10, id: 10, isGradeActive: false},
  ]);
  const [isGradeActive, setGradeActive] = useState(false);
  const navigate = useNavigate();
  // console.log(
  //   location.state,
  //   "you know",
  //   selected[0]?.value,
  //   "selected",
  //   selected[0]?.excelData
  // );

  const saveQuiz = data => {
    console.log(data, location.state,exceldata, "quiz data for db");
    if (data[0].percent && data[quizData.length - 1].percent) {
      navigate("/CandidsteSecondQuestion", {
        state: {
          quizData: data,
          id: location.state,
          businessCase: selected[0]?.value,
          exceldata: exceldata,
          isSecondTime: location.state.isSecondTime,
        },
      });
      // axios
      //   .post("http://localhost:8000/api/admin/quizadd", {
      //     QA: data,
      //     candidateId: location?.state,
      //     isInterviewed: true,
      //   })
      //   .then(res => {
      //     if (res.status == 200) {
      //       console.log(res, "quiz result");
      //       navigate("/candidates");
      //       toast.success("quiz added successfully..!", {
      //         position: toast.POSITION.TOP_CENTER,
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    }
  };
  const getBusinessCase = () => {
    axiosInstance
      .get("api/admin/getBusinessCase")
      .then(res => {
        if (res.status === 200) {
          console.log(res.data?.data, "business");
          setBusinessCases(
            res.data?.data.map(d => {
              return {value: d._id, label: d.bcTitle,excelData:d.excelData};
            })
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  const handleFileUpload = e => {
    e.preventDefault();

    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, {type: "binary"});
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, {header: 1, defval: ""});
      // dataParse && setData(dataParse[1]);
      let er = document.getElementById("er");
      let approach = document.getElementById("approach");
      let context = document.getElementById("context");
      console.log(dataParse[1]);
      dataParse && setExcelData(dataParse[1]);
      if (dataParse.length > 1) {
        // context.value = dataParse && dataParse[1][0];
        // approach.value = dataParse[1][1] && dataParse[1][0];
        // er.value = dataParse && dataParse[1][2];
      }

      console.log("dataParse", exceldata && exceldata, dataParse[1][1]);
    };
    reader.readAsBinaryString(f);
  }
  useEffect(() => {
    console.log(quizData, "location state");
    console.log(gradeArray, "gradeArray");
    console.log();
  }, [quizData]);
  useEffect(()=>{
  selected[0] && setExcelData(selected[0]?.excelData);

  },[selected])
  useEffect(() => {
    getBusinessCase();
  }, []);
   const getQuestions = () => {
     axiosInstance
       .get("api/admin/getQuestions")
       .then(res => {
         if (res.status === 200) {
           console.log(res.data, "question");
           
           setQuestions(res.data?.data?.map((data,i)=>{
               return {
                 question: data?.question,
                 answer: "",
                 id: i,
                 percent: data?.percentage.toString(),
                 grade: 0,
               };
           }))
           
          
           setQuestions(data => [
   ...data,
   {
     question: "Business Case",
     answer: "",
     id: data?.length,
     percent: "50%",
     grade: 0,
   },
 ])
         }

       })
       .catch(err => {
         console.error(err);
       });
   }
   console.log(questions,"from backend");

   useEffect(() => {
     getQuestions();
     
     console.log(questions && questions, "question you know");
   }, []);
   useEffect(()=>{
//  setQuestions(data => [
//    ...data,
//    {
//      question: "Business Case",
//      answer: "",
//      id: quizData?.length,
//      percent: "50%",
//      grade: 0,
//    },
//  ])
   },[])
  return (
    <section className="w-[98%] h-[90vh] ml-auto flex">
      <div className="right-video w-[35%] bg-gray-200 h-[90%] flex flex-col items-center justify-start">
        <div className="bg-gray-100 h-[80%] w-full"></div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md mt-8">
          Start Video
        </button>
      </div>
      <div className="left-quiz w-[65%] bg-blue-50 h-full flex items-center justify-start flex-col">
        <div className="question w-[80%] mt-12 flex items-center justify-between">
          <p className=" bg-blue-500 text-center py-2 rounded-md text-white w-[97%]">
            {quizData[currentQuestion]?.question}
          </p>
          <button className="font-2xl bg-gray-300 h-full text-gray-700 font-bold w-[7%] ml-2 h-8 rounded-full">
            {currentQuestion + 1}
          </button>
        </div>

        <div className="relative quiz w-[80%]  mt-4">
          <button className="absolute top-1/3 -left-12">
            <FaArrowAltCircleLeft
              className="text-3xl h-10 w-10  text-blue-500 hover:bg-blue-700 rounded-full"
              onClick={() => {
                setCurrentQuestion(current =>
                  current == 0 ? (current = quizData?.length - 1) : current - 1
                );
              }}
            />
          </button>
          {quizData?.map((quizd, i) => (
            <div className="quiz w-[100%]  ">
              {currentQuestion == i ? (
                <>
                  {console.log(i, "inside map")}
                  {quizData?.length-1 == i ? (
                    <>
                      <div className="flex w-full items-center mb-1">
                        {/* <input
                          type="file"
                          onChange={handleFileUpload}
                          className="w-1/2"
                        /> */}
                        <MultiSelect
                          options={businessCases}
                          value={selected}
                          onChange={setSelected}
                          labelledBy="Select"
                          className="w-[100%]"
                        />
                      </div>

                      <div
                        className={`w-full text-center py-1 flex  h-72 border-2  border-gray-400 `}
                      >
                        <div className="w-1/2  flex items-start  flex-col p-1  space-y-2">
                          <textarea
                            name="context"
                            id="context"
                            value={exceldata?.context}
                            onChange={e => {
                              setExcelData({
                                ...exceldata,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            placeholder="Context"
                            className="bg-white shadow-md w-full h-20 px-3 rounded-xl"
                          ></textarea>
                          <textarea
                            name="approach"
                            value={exceldata?.approach}
                            onChange={e => {
                              setExcelData({
                                ...exceldata,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            placeholder="Approach"
                            id="approach"
                            className="bg-white shadow-md w-full h-20 px-3 rounded-xl"
                          ></textarea>
                          <textarea
                            name="expectedResult"
                            value={exceldata?.expectedResult}
                            onChange={e => {
                              setExcelData({
                                ...exceldata,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            placeholder="Expected Results"
                            className="bg-white shadow-md w-full h-20 px-3 rounded-xl"
                            id="er"
                          ></textarea>
                        </div>
                        <div className="w-1/2 p-1">
                          <textarea
                            name={i}
                            value={quizData[i].answer}
                            onChange={e => {
                              setQuestions(prevItems =>
                                prevItems.map(ques =>
                                  ques.id == e.target.name
                                    ? {
                                        answer: e.target.value,
                                        question: ques.question,
                                        id: ques.id,
                                        percent: ques.percent,
                                      }
                                    : ques
                                )
                              );
                            }}
                            className="bg-white shadow-md w-full py-3  rounded-xl h-full  text-center py-24"
                          ></textarea>
                        </div>
                      </div>
                    </>
                  ) : (
                    <textarea
                      className={`w-full text-center ${
                        currentQuestion % 2 === 0
                          ? "bg-blue-100 text-black"
                          : "bg-blue-50 text-black"
                      } py-24 rounded-lg border-2 border-gray-400 `}
                      name={i}
                      value={quizData[i].answer}
                      id=""
                      onChange={e => {
                        setQuestions(prevItems =>
                          prevItems.map(ques =>
                            ques.id == e.target.name
                              ? {
                                  answer: e.target.value,
                                  question: ques.question,
                                  id: ques.id,
                                  percent: ques.percent,
                                }
                              : ques
                          )
                        );
                      }}
                      placeholder="write about interviewee"
                    ></textarea>
                  )}
                  {/* grading  point */}
                  <div className="pagination w-full h-24 bg-gray-200 flex items-center justify-evenly">
                    {gradeArray?.map((data, index) => (
                      <>
                        <button
                          className={`w-10 h-10 
                       ${
                         quizd.grade > 0 && quizd.grade == data.id
                           ? " bg-blue-400"
                           : "bg-gray-400"
                       } text-black
                    rounded-full`}
                          onClick={e => {
                            setQuestions(prevItems =>
                              prevItems.map(ques =>
                                ques.id == i
                                  ? {
                                      ...ques,
                                      grade: data.value,
                                    }
                                  : ques
                              )
                            );
                          }}
                        >
                          <span id="grade-btn">{data.value}</span>
                        </button>
                      </>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ))}

          <button className="absolute top-1/3 -right-12">
            {" "}
            <FaArrowAltCircleRight
              className="text-3xl h-10 w-10 text-blue-500 hover:bg-blue-700 rounded-full"
              onClick={() => {
                setCurrentQuestion(current =>
                  current == quizData?.length - 1 ? (current = 0) : current + 1
                );
              }}
            />
          </button>
        </div>
        <div className="w-11/12 mt-4 flex items-center justify-between">
          <div className="prev_ques flex w-1/3 text-center justify-between flex-col">
            <h2>Previous Question</h2>
            {quizData[currentQuestion - 1] ? (
              <div className="bg-blue-500 text-sm text-white px-4 rounded-lg py-2">
                {
                  quizData[currentQuestion - 1]?.question
                  // ? quizData[currentQuestion - 1]?.question
                  // : quizData[currentQuestion]?.question
                }
              </div>
            ) : (
              ""
            )}
          </div>
          {currentQuestion == quizData?.length-1 ? (
            <button
              onClick={() => {
                saveQuiz(quizData);
              }}
              className="w-28  shadow-lg relative top-4 px-6 rounded-md px-3 py-2 bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
            >
              Save
            </button>
          ) : (
            ""
          )}
          <div className="prev_ques flex flex-col text-center w-1/3 justify-between">
            <h2>Next Question</h2>
            {quizData[currentQuestion + 1] ? (
              <div className="bg-blue-500 text-white px-4 rounded-lg py-2">
                {
                  quizData[currentQuestion + 1]?.question
                  // ? quizData[currentQuestion + 1]?.question
                  // : quizData[currentQuestion]?.question
                }
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionsAnswers;
