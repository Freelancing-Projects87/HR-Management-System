import React, {useEffect, useState} from "react";
import {
  AiOutlineDelete,
  AiOutlinePlusSquare,
  AiOutlineBank,
  AiOutlineEdit,
  AiFillEye,
} from "react-icons/ai";
import {FaPencilAlt} from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DeleteModel from "../ModelDelete";

function Business() {
  const [businessData, setBusiness] = useState([]);
  const [popup, setPopup] = useState(true);
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const getBusinessline = () => {
    axios
      .get("http://localhost:8000/api/admin/getBusinessline")
      .then(res => {
        if (res.status === 200) {
          setBusiness(res.data?.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    getBusinessline();
  }, []);
  return (
    <>
      <div className="flex mb-4 ml-2 items-end justify-end w-full ">
        <button
          onClick={() => {
            navigate("/addbusiness");
          }}
          type="button"
          className="inline-flex  relative right-12 top-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
      shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add <AiOutlineBank className="ml-2 text-xl" />
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
                      Requester
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Needed By
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Project
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Intern Assigned
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {businessData &&
                    businessData.map(business => (
                      <tr key={"fdfd"} onClick={() => {}}>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {business.requester}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {business.neededBy}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {business.project}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {business.internAssigned}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap  text-right text-sm font-medium">
                          <FaPencilAlt
                            onClick={() => {
                              navigate("/editBusiness", {state: business});
                            }}
                            className=" cursor-pointer   h-6 w-6  p-1 rounded-sm bg-blue-700 hover:bg-blue-500 text-white text-xl"
                          />
                        </td>
                        <td>
                          <AiFillEye
                            onClick={() => {
                              navigate("/businessView", {state: business});
                            }}
                            className=" cursor-pointer   h-6 w-6  p-1 rounded-sm bg-gray-300 text-blue text-xl hover:bg-gray-500"
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
                          data={business}
                          getData={getBusinessline}
                          to={"delete_Businessline"}
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

export default Business;
