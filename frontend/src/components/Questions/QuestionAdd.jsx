import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axiosInstance";

function QuestionAdd() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const onSubmit = data => saveQuestion(data);

  const saveQuestion = data => {
    console.log(data, "data skills");
   data.percentage= Number(data.percentage)
    console.log(data,"percentage in number");

    axiosInstance
      .post("api/admin/addQuestion", data)
      .then(res => {
        console.log(res, "your skill");
        if (res.status === 201) {
          console.log(res, "hmm");
          navigate("/questions", {state: {sucess: true}});
          toast.success("Skill added successfully...!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {}, [

  ]);

  return (
    <>
      {" "}
      {/* bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . */}
      <div className="h-[90vh] w-[85%] ml-auto flex items-center justify-center  bg-white ">
        <ToastContainer />
        {/* <Header /> */}
        <div className="  bg-blue-50 w-[70%] rounded-2xl">
          <div className=" overflow-hidden ">
            <div className=" m-8 mx-4 my-4 bg-white rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl text-gray-600 p-4 font-bold text-center mb-2">
                  Add Question
                </p>
                <div className=" bg-white/40 sm:p-2 rounded-2xl grid grid-cols-2 gap-y-4 h-full   bg-gray-600 px-6 w-[87%]  mx-auto ">
                  <div className="pt-4 w-full ">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Question
                    </label>
                    <textarea
                      {...register("question", {required: true})}
                      aria-invalid={errors.question ? "true" : "false"}
                      className={` ${
                        errors.question ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full h-32   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    ></textarea>
                    {errors.question?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Question is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Percentage
                    </label>
                    <select
                      {...register("percentage", {required: true})}
                      className={` ${
                        errors.percentage ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    >
                      <option selected value="">Select percentage</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    {errors.percentage?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Percentage is required
                      </p>
                    )}
                  </div>
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

export default QuestionAdd;
