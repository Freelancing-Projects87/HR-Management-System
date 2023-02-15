import React, {useEffect, useState} from "react";
import {
  AiOutlineDelete,
  AiOutlinePlusSquare,
  AiOutlineUserAdd,
  AiOutlineEdit,
  AiOutlineInteraction,
  AiFillEye,
} from "react-icons/ai";
import {FaPencilAlt, FaMeetup} from "react-icons/fa";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import DeleteModel from "../ModelDelete";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AiFillFilePdf, AiFillInteraction} from "react-icons/ai";
import axiosInstance from "../../utils/axiosInstance";

function Skills() {
  const [skills, setSkills] = useState([]);
  let [open, setOpen] = useState(false);
  const [delId, setDelId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const getSkills = () => {
    axiosInstance
      .get("api/admin/getskills")
      .then(res => {
        if (res.status === 200) {
          console.log(res.data, "skills");
          setSkills(res.data?.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getSkills();
    console.log(skills && skills, "skills");
  }, []);

  return (
    <>
      <div className="flex mb-4 ml-2 items-end justify-end w-full ">
        <ToastContainer />
        <button
          onClick={() => {
            navigate("/addskill");
          }}
          type="button"
          className="inline-flex  relative right-12 top-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
      shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Skill
        </button>
      </div>
      <div className="flex flex-col w-[82.3%]  float-right fixed left-[17%]  ">
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
                      Skill
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 relative w-full">
                  {skills &&
                    skills.map(skill => (
                      <tr key={skill._id} onClick={() => {}}>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {skill.skill}
                              </div>
                            </div>
                          </div>
                        </td>
                        <div className="w-48 absolute right-0">
                          <td className="px-6 py-4 whitespace-nowrap  text-right text-sm font-medium">
                            <FaPencilAlt
                              onClick={() => {
                                navigate("/editskill", {state: skill});
                              }}
                              className=" cursor-pointer   h-6 w-6  p-1 rounded-sm bg-blue-700 hover:bg-blue-500 text-white text-xl"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <AiOutlineDelete
                              onClick={() => {
                                setOpen(true);
                                setDelId(skill._id);
                              }}
                              className=" cursor-pointer  text-red-500 text-xl"
                            />
                          </td>
                        </div>

                        <DeleteModel
                          open={open}
                          setOpen={setOpen}
                          id={delId}
                          getData={getSkills}
                          to={"deleteskill"}
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

export default Skills;
