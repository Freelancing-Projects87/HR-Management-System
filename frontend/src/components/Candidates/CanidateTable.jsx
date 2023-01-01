import React, { useEffect, useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlinePlusSquare,
  AiOutlineUserAdd,
  AiOutlineEdit,
  AiFillEye,
} from "react-icons/ai";
import {FaPencilAlt} from "react-icons/fa";
import axios from "axios";
import { useNavigate ,useLocation} from 'react-router-dom';
import DeleteModel from '../ModelDelete';
  import {toast, ToastContainer} from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";


function Candidate() {
 const [candidateData,setCandidateData]=useState([])
 const [popup,setPopup]=useState(true)
 let [open,setOpen]=useState(false)
   const [delId, setDelId] = useState(null);

 const navigate = useNavigate()
 const location=useLocation()
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
useEffect(() => {
  getCandidates();
  console.log(candidateData && candidateData, "candidateData");
}, []);

return (
  <>
    <div className="flex mb-4 ml-2 items-end justify-end w-full ">
      <ToastContainer/>
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
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nationality
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cv
                  </th>

                  {/* <th
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Skills
                  </th> */}
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
                              {candidate.firstname}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6  py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {candidate.lastname}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6  py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {candidate.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6  py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {candidate.nationality}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6  py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {candidate.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <div className="">
                            <div
                              className={`${
                                popup
                                  ? "text-sm h-12 w-12 cursor-pointer font-medium text-gray-900"
                                  : "text-sm h-20vh w-[30%] cursor-pointer absolute top-[20%] left-[40%] font-medium text-gray-900"
                              }`}
                            >
                              <img
                                onClick={() => setPopup(!popup)}
                                src={candidate.cv}
                                alt={candidate.cv}
                                className="w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {candidate.recomendation}
                        </div>
                      </td>

                      <td
                        onClick={e => {}}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {candidate.startingDate?.substr(0, 10)}
                      </td>
                      <td
                        onClick={e => {}}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {candidate.grade}
                      </td> */}

                      <td className="px-6 py-4 whitespace-nowrap  text-right text-sm font-medium">
                        <FaPencilAlt
                          onClick={() => {
                            navigate("/editcandidate", {state: candidate});
                          }}
                          className=" cursor-pointer   h-6 w-6  p-1 rounded-sm bg-blue-700 hover:bg-blue-500 text-white text-xl"
                        />
                      </td>
                      <td>
                        <AiFillEye
                          onClick={() => {
                            navigate("/candidateView", {state: candidate});
                          }}
                          className=" cursor-pointer   h-6 w-6  p-1 rounded-sm bg-gray-300 text-blue text-xl hover:bg-gray-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <AiOutlineDelete
                          onClick={() => {
                            setOpen(true);
                               setDelId(candidate._id)

                          }}
                          className=" cursor-pointer  text-red-500 text-xl"
                        />
                      </td>
                      <DeleteModel
                        open={open}
                        setOpen={setOpen}
                        id={delId}
                        getData={getCandidates}
                        to={"delete_candidate"}
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