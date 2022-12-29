import React, { useEffect, useState } from 'react';
import { AiOutlineDelete,AiOutlinePlusSquare,AiOutlineUserAdd,AiOutlineEdit } from "react-icons/ai";
import {FaPencilAlt} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../ModelDelete';


function Candidate() {
 const [candidateData,setCandidateData]=useState([])
 let [open,setOpen]=useState(false)
 const navigate = useNavigate()
const getCandidates = () => {
  axios
    .get("http://localhost:8000/api/admin/getCandidates")
    .then(res => {
      if (res.status === 200) {
        setCandidateData(res.data?.data)
      }
    })
    .catch(err => {
      console.error(err);
    });
};
useEffect(()=>{
getCandidates()
        console.log(candidateData, "candidateData");
},[])
return (
  <>
    <div className="flex mb-4 ml-2 items-end justify-end w-full ">
      <button
        onClick={() => {
          navigate("/addcandidate");
        }}
        type="button"
        className="inline-flex  relative right-12 top-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
      shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add <AiOutlineUserAdd className="ml-2 text-xl" />
      </button>
    </div>
    <div className="flex flex-col w-[82.3%]  float-right ">
      <div className="-my-2 overflow-hidden sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden  border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y  overflow-hidden divide-gray-200 bg-gray-50">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Recomendation
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Starting Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Grade
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidateData &&
                  candidateData.map(candidate => (
                    <tr key={"fdfd"} onClick={() => {}}>
                      <td className="px-6  py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {candidate.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {candidate.recomendation}
                        </div>
                      </td>

                      <td
                        onClick={e => {}}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {candidate.startingDate.substr(0, 10)}
                      </td>
                      <td
                        onClick={e => {}}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {candidate.grade}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap  text-right text-sm font-medium">
                        <FaPencilAlt
                          onClick={() => {
                            navigate("/editcandidate", {state: candidate});
                          }}
                          className=" cursor-pointer   h-6 w-6  p-1 rounded-sm bg-blue-700 text-white text-xl"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <AiOutlineDelete
                          onClick={() => {
                            setOpen(true);
                          }}
                          className=" cursor-pointer  text-red-500 text-xl"
                        />
                      </td>
                      <DeleteModel
                        open={open}
                        setOpen={setOpen}
                        candidate={candidate}
                        getCandidates={getCandidates}
                      />
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default Candidate;