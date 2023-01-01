import React from "react";
import {
  FaDownload,
  FaDailymotion,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import {AiFillFilePdf} from "react-icons/ai";
import {useState} from "react";
import {useEffect} from "react";
function QuestionsAnswers() {
  let [questions,setQuestions] =useState([
    {question: "why consulting?", answer: "",id:0},
    {question: "why Accenture?", answer: "",id:1},
    {question: "working under stress?", answer: "",id:2},
  ])
  const [currentQuestion, setCurrentQuestion] = useState(0);
  useEffect(() => {
    console.log(currentQuestion, "current Questions");
    console.log(
      questions,
      "questiosns[currentQuestion]?.question"
    );
  }, [questions]);
  return (
    <section className="w-[98%] h-[80vh] ml-auto flex">
      <div className="right-video w-[35%] bg-gray-100 h-full flex flex-col items-center justify-start">
        <div className="bg-gray-100 h-[80%] w-full"></div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md mt-8">
          Start Video
        </button>
      </div>
      <div className="left-quiz w-[65%] bg-blue-50 h-full flex items-center justify-start flex-col">
        <div className="question w-[80%] mt-12">
          <p className=" bg-blue-500 text-center py-2 rounded-md text-white ">
            {questions[currentQuestion]?.question}
          </p>
        </div>
        <div className="relative quiz w-[80%]  mt-4">
          <button className="absolute top-1/2 -left-12">
            <FaArrowAltCircleLeft
              className="text-3xl hover:bg-blue-700 rounded-full"
              onClick={() => {
                setCurrentQuestion(current =>
                  current == 0 ? (current = 2) : current - 1
                );
              }}
            />
          </button>
          {questions?.map((textarea, i) => (
            <div className="quiz w-[100%]  ">
              {currentQuestion == i ? (
                <textarea
                  className={`w-full text-center ${
                    currentQuestion %2===0? "bg-blue-500 text-white" : "bg-blue-50 text-black"
                  } py-24 rounded-lg border-2 border-gray-400 `}
                  name={i}
                  value={questions[i].answer}
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

          <button className="absolute top-1/2 -right-12">
            {" "}
            <FaArrowAltCircleRight
              className="text-3xl hover:bg-blue-700 rounded-full"
              onClick={() => {
                setCurrentQuestion(current =>
                  current == 2 ? (current = 0) : current + 1
                );
              }}
            />
          </button>
          <div className="pagination w-full h-24 bg-gray-200 flex items-center justify-evenly">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
              <button
                className={`w-12 h-12 ${
                  value == currentQuestion ? "bg-blue-600 text-white" : " bg-gray-400 text-black"
                }  rounded-full`}
                onClick={()=>{setCurrentQuestion(value)}}
              >
                {value + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionsAnswers;
