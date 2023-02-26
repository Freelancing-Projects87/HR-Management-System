import React from 'react'
import {
  FaDownload,
  FaDailymotion,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import {AiFillFilePdf} from "react-icons/ai";
import {useLocation} from "react-router-dom"
import axiosInstance from '../../utils/axiosInstance';

function QuizHeader() {
  const location=useLocation()
    function downloadResume(id) {
      console.log(id, "look file ray");
      axiosInstance
        .get(`api/admin/getcandidatecv/${id}`, {responseType: "blob"})
        .then(res => {
          console.log(res, "ssssss");
          const blob = new Blob([res.data], {type: res.data.type});
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${location.state.user}resume`;
          // link.download = res.headers["content-disposition"].split("filename=")[1];
          link.click();
        })
        .catch(err => {
          console.log(err);
        });
      // const url =window.URL.createObjectURL(new Blob(file));
      // const link =document.createElement('a')
      // link.href=url;
      // link.setAttribute('download','resume.pdf')
      // document.body.appendChild(link);
      // link.click();
    }
  return (
    <header className="w-[98%] ml-auto h-16 bg-gray-200 flex items-center justify-center">
      <div className="w-11/12 flex items-center justify-between ">
        <div className="w-38 flex items-center justify-between">
          <FaDailymotion className="text-blue-600 p-1  text-xl h-10 w-8 rounded-full" />
          Workday Porfile
        </div>
        <div onClick={downloadResume(location?.state.id)} className="w-38 flex items-center justify-between cursor-pointer rounded-md">
          <AiFillFilePdf className="h-8 w-8 text-red-500" />
          <span className='text-black'>Download Cv</span>
        </div>
      </div>
    </header>
  );
}

export default QuizHeader