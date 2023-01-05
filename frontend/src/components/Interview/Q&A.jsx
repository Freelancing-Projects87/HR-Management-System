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

function QuestionsAnswers() {
  const location = useLocation();
  let [quizData, setQuestions] = useState([
    {question: "Elevator pitch interviewee", answer: "", id: 0},
    {question: "What did you achieve in this experience?", answer: "", id: 1},
    {
      question: "What have you precisely done in this experience?",
      answer: "",
      id: 2,
    },
    {question: "What is your favorite experience?", answer: "", id: 3},
    {question: "Why consulting?", answer: "", id: 4},
    {question: "Why Accenture?", answer: "", id: 5},
    {question: "Working under stress?", answer: "", id: 6},
    {
      question: "Experience failures? How did you handle it?",
      answer: "",
      id: 7,
    },
    {question: "What motivates you / what demotivates you?", answer: "", id: 8},
    {
      question: "3 most important skills of consultant and why?",
      answer: "",
      id: 9,
    },
    {
      question:
        "Tell me about a time where you had a leading role / managed people",
      answer: "",
      id: 10,
    },
    {
      question:
        "What are the current trends and dynamics in the financial services industry?",
      answer: "",
      id: 11,
    },
    {
      question:
        "Tell me about your understanding of a current new technology and the impact / role in the FS industry? ",
      answer: "",
      id: 12,
    },
    {
      question: "What is the future of banks in your perspective?",
      answer: "",
      id: 13,
    },
    {question: "Business case", answer: "", id: 14},
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let [index, setIndexes] = useState({firstIndex: 0, lastIndex: 14});
  const navigate = useNavigate();

  const saveQuiz = data => {
    axios
      .post("http://localhost:8000/api/admin/quizadd", {
        QA: data,
        candidateId: location?.state,
      })
      .then(res => {
        if (res.status == 200) {
          console.log(res, "quiz result");
          navigate("/candidates");
          toast.success("quiz added successfully..!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    console.log(location.state, "location state");
  }, []);
  return (
    <section className="w-[98%] h-[90vh] ml-auto flex">
      <div className="right-video w-[35%] bg-gray-200 h-[90%] flex flex-col items-center justify-start">
        <div className="bg-gray-100 h-[80%] w-full"></div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md mt-8">
          Start Video
        </button>
      </div>
      <div className="left-quiz w-[65%] bg-blue-50 h-full flex items-center justify-start flex-col">
        <div className="question w-[80%] mt-12">
          <p className=" bg-blue-500 text-center py-2 rounded-md text-white ">
            {quizData[currentQuestion]?.question}
          </p>
        </div>
        <div className="relative quiz w-[80%]  mt-4">
          <button className="absolute top-1/3 -left-12">
            <FaArrowAltCircleLeft
              className="text-3xl text-blue-500 hover:bg-blue-700 rounded-full"
              onClick={() => {
                setCurrentQuestion(current =>
                  current == 0 ? (current = 14) : current - 1
                );
              }}
            />
          </button>
          {quizData?.map((textarea, i) => (
            <div className="quiz w-[100%]  ">
              {currentQuestion == i ? (
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
                            }
                          : ques
                      )
                    );
                  }}
                  placeholder="write about interviewee"
                ></textarea>
              ) : (
                ""
              )}
            </div>
          ))}

          <button className="absolute top-1/3 -right-12">
            {" "}
            <FaArrowAltCircleRight
              className="text-3xl text-blue-500 hover:bg-blue-700 rounded-full"
              onClick={() => {
                setCurrentQuestion(current =>
                  current == 14 ? (current = 0) : current + 1
                );
              }}
            />
          </button>
          <div className="pagination w-full h-24 bg-gray-200 flex items-center justify-evenly">
            {quizData.map((data, value) => (
              <>
                <button
                  className={`w-10 h-10 ${
                    value == currentQuestion
                      ? "bg-blue-600 text-white"
                      : " bg-gray-400 text-black"
                  }  rounded-full`}
                  onClick={() => {
                    setCurrentQuestion(value);
                  }}
                >
                  {value + 1}
                </button>
              </>
            ))}
          </div>
        </div>
        <div className="w-11/12 mt-4 flex items-center justify-between">
          <div className="prev_ques flex w-1/3 text-center justify-between flex-col">
            <h2>Previous Question</h2>
            <div className="bg-blue-500 text-sm text-white px-4 rounded-lg py-2">
              {quizData[currentQuestion - 1]?.question
                ? quizData[currentQuestion - 1]?.question
                : quizData[currentQuestion]?.question}
            </div>
          </div>
          {currentQuestion == index.lastIndex ? (
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
            <div className="bg-blue-500 text-white px-4 rounded-lg py-2">
              {quizData[currentQuestion + 1]?.question
                ? quizData[currentQuestion + 1]?.question
                : quizData[currentQuestion]?.question}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionsAnswers;
