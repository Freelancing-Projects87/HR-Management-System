import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AiFillEye} from "react-icons/ai";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axiosInstance";
function SignIn() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const [isFromPlansPage, setValue] = useState(
    localStorage.getItem("fromsubs")
  );
  const [isFromLogin, setValue2] = useState(localStorage.getItem("fromlogin"));
  const [show, setPasswordShow] = useState(false);
  const onSubmit = data => forgetPassword(data);
  let navigate = useNavigate();
      const forgetPassword = resetData => {
        // resetData._id = user._id;
        console.log(resetData, "for forget data");
        const token = localStorage.getItem("token");
        axiosInstance
          .post("api/users/forgotpassword", resetData, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            console.log(res, "user is updated", res);
            if (res.status === 200) {
              toast.success("Email sent successfully!", {
                position: "top-center",
              });
              console.log(res, "res");
              // setUser(res.data?.data);
              // getUser();
            }
          })
          .catch(err => {
            console.error(err);
          });
      };

  return (
    <>
      <div className="h-[90vh] flex items-center justify-center  bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . ">
        {/* <Header /> */}
        <div className="items-center justify-center bg-blue-50 rounded-2xl">
          <div className="flex  items-center justify-center overflow-x-hidden">
            <div className="flex-none w-96 m-16 mx-4 my-4  sm:m-12 sm:overflow-x-hidden bg-white rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" bg-white/40 sm:p-6 rounded-2xl border broder-gray-800  bg-gray-100 px-6    h-auto">
                  <div>
                    <p className="text-2xl text-gray-800 font-bold text-center mb-2">
                      Reset your Password
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-3 pt-4 ml-6 w-full">
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter your Email
                    </label>
                    <input
                      {...register("email", {required: true})}
                      aria-invalid={errors.email ? "true" : "false"}
                      className={` ${
                        errors.email ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.email?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        email is required
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col  items-center ml-4">
                    <button
                      type="submit"
                      class=" text-center content-center mt-8 border broder-gray-500 bg-blue-700 text-white hover:bg-blue-400 hover:text-black font-bold py-2 px-4 rounded-full w-11/12  justify-center"
                    >
                      Email me to Reset Password
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
export default SignIn;
