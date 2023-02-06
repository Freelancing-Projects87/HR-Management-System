import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {useNavigate, useLocation, json,useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axiosInstance";
import {AiOutlineUser} from "react-icons/ai";

function Profile() {
  const [showForm, setShowForm] = useState(false);
  const [token, setToken] = useState(null);
  const location = useLocation();
  const params = useParams()

  const [photo, setPhoto] = useState(null);
  const fileref = useRef();

  let [user, setUser] = useState({});
  const navigate = useNavigate();

  const onSubmit = data => forgetPassword(data);

  console.log(user, "user");
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    // defaultValues: {name: user?.name, phone: user?.phone, email: user?.email},
  });
  const forgetPassword = resetData => {
    // resetData._id = user._id;
    console.log(resetData, "for forget data");
    const token = localStorage.getItem("token");
    axiosInstance
      .put(`api/users/resetPassword/${params?.resetToken}`, resetData, {
        // headers: {
        //   accept: "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(res => {
        console.log(res, "user is updated", res);
        if (res.status === 200) {
          toast.success("Password updated successfully!", {
            position: "top-center",
          });
          navigate('/login')
          console.log(res, "res");
          // setUser(res.data?.data);
          // getUser();
        }
      })
      .catch(err => {
        console.error(err);
      })
  }
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
    getUser();
  }, []);
  useEffect(() => {}, [location.state, reset]);
  return (
    <div className="h-[90vh] flex items-center justify-center  bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . ">
        <ToastContainer/>
      {/* <Header /> */}
      <div className="items-center justify-center bg-blue-50 rounded-2xl">
        <div className="flex  items-center justify-center overflow-x-hidden">
          <div className="flex-none w-96 m-16 mx-4 my-4  sm:m-12 sm:overflow-x-hidden bg-white rounded-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" bg-white/40 sm:p-6 rounded-2xl border broder-gray-800  bg-white px-6    h-72">
                <div>
                  <p className="text-2xl text-gray-800 font-bold text-center mb-2">
                    Reset Password
                  </p>
                </div>

                <div className="col-span-6 sm:col-span-3 pt-4 ml-6 w-full">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                   Enter New Password
                  </label>
                  <input
                    {...register("password", {required: true})}
                    aria-invalid={errors.password ? "true" : "false"}
                    className={` ${
                      errors.password ? " border border-red-500" : ""
                    } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                  />
                  {errors.password?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      password is required
                    </p>
                  )}
                </div>

                <div className="flex flex-col  items-center ml-4">
                  <button
                    type="submit"
                    class=" text-center content-center mt-8 border broder-gray-500 bg-blue-700 text-white hover:bg-blue-400 hover:text-black font-bold py-2 px-4 rounded-full w-11/12  justify-center"
                  >
                     Reset your Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
