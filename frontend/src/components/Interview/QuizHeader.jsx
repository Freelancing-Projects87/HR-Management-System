import React from 'react'
import {
  FaDownload,
  FaDailymotion,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import {AiFillFilePdf} from "react-icons/ai";
function QuizHeader() {
  return (
    <header className="w-[98%] ml-auto h-16 bg-gray-200 flex items-center justify-center">
      <div className="w-11/12 flex items-center justify-between ">
        <div className="w-38 flex items-center justify-between">
          <FaDailymotion className="text-blue-600 p-1  text-xl h-10 w-8 rounded-full" />
          Workday Porfile
        </div>
        <div className="w-38 flex items-center justify-between">
          <AiFillFilePdf className="h-8 w-8" />
          Download Cv
        </div>
      </div>
    </header>
  );
}

export default QuizHeader