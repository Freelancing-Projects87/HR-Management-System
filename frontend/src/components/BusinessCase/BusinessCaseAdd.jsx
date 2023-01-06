import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BusinessCaseAdd() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const onSubmit = data => saveBusiness(data);

  const saveBusiness = data => {
    console.log(data, "data");

    axios
      .post("http://localhost:8000/api/admin/addBusinessCase", data)
      .then(res => {
        if (res.status == 200) {
          console.log(res, "hmm");
          navigate("/businesscase");
          toast.success("Business Case added successfully..!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

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
                      Business Case Title
                    </label>
                    <input
                      type={"text"}
                      {...register("bcTitle", {required: true})}
                      aria-invalid={errors.bcTitle ? "true" : "false"}
                      className={` ${
                        errors.bcTitle ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.bcTitle?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Bc Title is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      htmlFor="neededby"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expected Time to solve
                    </label>
                    <input
                      type={"text"}
                      {...register("expectedTime", {required: true})}
                      aria-invalid={errors.expectedTime ? "true" : "false"}
                      className={` ${
                        errors.expectedTime ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.expectedTime?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Expected Time is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      for="small"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Diffculty
                    </label>
                    <select
                      {...register("difficulty", {required: true})}
                      className={` ${
                        errors.difficulty ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    >
                      {/* <option selected>Slecect</option>   */}
                      <option value="low" selected>
                        Low
                      </option>
                      <option value="medium">medium</option>
                      <option value="high">High</option>
                    </select>
                    {errors.difficulty?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Difficulty is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      for="small"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Type
                    </label>
                    <select
                      {...register("type", {required: true})}
                      className={` ${
                        errors.type ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    >
                      {/* <option selected>Assigned </option>   */}
                      <option value="Marketing Size" selected>Marketing Size</option>
                      <option value="Teaser">Teaser</option>
                    </select>
                    {errors.type?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Type is required
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
export default BusinessCaseAdd;
