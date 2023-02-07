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
import DeleteModel from "../ModelDelete/UserDeleteModel";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AiFillFilePdf, AiFillInteraction} from "react-icons/ai";
import interview from "../../images/interview.png";
import axiosInstance from "../../utils/axiosInstance";

function Users() {
  const [usersData, setUsersData] = useState([]);
  const [popup, setPopup] = useState(true);
  let [open, setOpen] = useState(false);
  const [delId, setDelId] = useState(null);
  let [userData, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const getUsers = () => {
    axiosInstance
      .get("api/users/getusers")
      .then(res => {
        if (res.status === 200) {
          console.log(res, "y.k");
            console.log(userData , "userDataoooo");

          if (userData?.email == "ameersoftdev@gmail.com") {
            setUsersData(res.data?.data);
          } 
          if (userData.email !== "ameersoftdev@gmail.com") {
            setUsersData(
              res.data?.data.filter(
                user => user.email !== "ameersoftdev@gmail.com"
              )
            );
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  console.log(usersData && usersData, "usersData");
  function getUser() {
    axiosInstance
      .get(`api/users/loggedin`)
      .then(res => {
        if (res.status === 200) {
          // localStorage.setItem("user", JSON.stringify(res.data?.data));

          setUser(res.data);
          console.log(res.data, "res.data");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    getUsers();
    getUser();
  }, []);

  return (
    <>
      <div className="flex mb-4 ml-2 items-end justify-end w-full ">
        <ToastContainer />
        {/* <button
          onClick={() => {
            navigate("/adduser");
          }}
          type="button"
          className="inline-flex  relative right-12 top-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
      shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add User
          <AiOutlineUserAdd className="ml-2 text-xl" />
        </button> */}
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
                      Surname
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usersData &&
                    usersData?.map(user => (
                      <tr key={user._id} onClick={() => {}}>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {user.surname}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {user.role}
                              </div>
                            </div>
                          </div>
                        </td>
                      
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        {userData.role == user.role ? (
                          <td className="bg-green-200 rounded-md  text-center">
                            your detail
                          </td>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap  text-right text-sm font-medium">
                              <FaPencilAlt
                                onClick={() => {
                                  navigate("/edituser", {state: user});
                                }}
                                className=" cursor-pointer   h-6 w-6  p-1 rounded-sm bg-blue-700 hover:bg-blue-500 text-white text-xl"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <AiOutlineDelete
                                onClick={() => {
                                  setOpen(true);
                                  setDelId(user._id);
                                }}
                                className=" cursor-pointer  text-red-500 text-xl"
                              />
                            </td>
                          </>
                        )}
                        <DeleteModel
                          open={open}
                          setOpen={setOpen}
                          id={delId}
                          getData={getUsers}
                          to={"deleteuser"}
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

export default Users;
