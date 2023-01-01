import React from "react";
import {
  FaDownload,
  FaDailymotion,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import {AiFillFilePdf} from "react-icons/ai";
import QuestionsAnswers from "./Q&A";
import QuizHeader from "./QuizHeader";

function Interview() {
  return (
    <div className="h-[90vh] w-[85%] ml-auto   bg-white ">
      <div className="main-body">
     <QuizHeader/>
      <QuestionsAnswers/>
      </div>
    </div>
  );
}

export default Interview;
