import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BusinessEdit() {
  let navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      requester: location.state?.requester,
      neededBy: location.state?.neededBy.substr(0, 10),
      internAssigned: location.state?.internAssigned,
      project:location.state?.project
    },
  });

  const onSubmit = data => saveBusiness(data);

  const saveBusiness = data => {
    console.log(data, "data");
 data.id=location.state?._id
    axios
      .post("http://localhost:8000/api/admin/update_Businessline", data)
      .then(res => {
        if (res.status == 200) {
          console.log(res, "hmm");
          navigate("/business");
              toast.success("Business pipeline edited successfully..!", {
                position: toast.POSITION.TOP_CENTER,
              });
        }
      })
      .catch(err => {
        console.error(err);
      })
  };
  useEffect(() => {
    console.log(location.state, "location state");
  }, []);
  return (
    <>
      {" "}
      {/* bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . */}
      <div className="h-[90vh] w-[85%] ml-auto flex items-center justify-center  bg-white ">
        {/* <Header /> */}
        <div className="  bg-blue-50 w-[70%] rounded-2xl">
          <div className=" overflow-hidden ">
            <div className=" m-8 mx-4 my-4 bg-white rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl text-gray-600 p-4 font-bold text-center mb-2">
                  Add Business Pipeline
                </p>
                <div className=" bg-white/40 sm:p-2 rounded-2xl grid grid-cols-2 gap-y-4 h-full   bg-gray-600 px-6 w-[87%]  mx-auto ">
                  <div className=" pt-4 ">
                    <label
                      htmlFor="requester"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Requester
                    </label>
                    <input
                      type={"text"}
                      {...register("requester", {required: true})}
                      aria-invalid={errors.requester ? "true" : "false"}
                      className={` ${
                        errors.requester ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.requester?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        requester is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      htmlFor="neededby"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Needed By
                    </label>
                    <input
                      type={"date"}
                      {...register("neededBy", {required: true})}
                      aria-invalid={errors.neededBy ? "true" : "false"}
                      className={` ${
                        errors.neededBy ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.neededBy?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        neededBy is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      htmlFor="project"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Project
                    </label>
                    <input
                      type="text"
                      {...register("project", {required: true})}
                      aria-invalid={errors.project ? "true" : "false"}
                      className={` ${
                        errors.project ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.project?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        project is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      for="small"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Intern Assigned
                    </label>
                    <select
                      {...register("internAssigned", {required: true})}
                      className={` ${
                        errors.internAssigned ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    >
                      {/* <option selected>Assigned </option>   */}
                      <option  value="yes">
                        Yes
                      </option>
                      <option value="No">No</option>
                    </select>
                    {errors.internAssigned?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        internAssigned is required
                      </p>
                    )}
                  </div>
                  <div></div>
                  <div className="flex flex-col  items-center mt-4">
                    <button
                      type="submit"
                      class=" text-center mb-4 content-center border broder-gray-500 bg-blue-700 text-white hover:bg-[] hover:text-black font-bold py-2 px-4 rounded-full w-40  justify-center"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BusinessEdit;
