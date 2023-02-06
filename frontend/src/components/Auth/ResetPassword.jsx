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

  const onSubmit3 = data => forgetPassword(data);

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
    <div className="h-[90vh] w-[85%] ml-auto flex items-center justify-center  bg-white ">
      <ToastContainer />
      <div className="h-full w-11/12">
        <div className="border-b-2 block md:flex">
          <div className={`w-full  md:w-3/5 p-8 bg-white lg:ml-4 shadow-md`}>
            <form onSubmit={handleSubmit(onSubmit3)}>
              <div className="rounded  shadow p-6">
                <div className="pb-6">
                  <label
                    for="name"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Enter New Password
                  </label>
                  <div className="flex">
                    <input
                      id="password"
                      {...register("password", {required: true})}
                      className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
                      type="text"
                    />
                  </div>
                  {errors.password?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      Passworsd is required
                    </p>
                  )}
                </div>
                <button className="border-1 bg-blue-500 text-white hover:bg-blue-700  rounded-r px-4 py-2 w-full border border-gray-500">
                  Email me to Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
