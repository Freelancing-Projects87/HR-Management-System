import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {useNavigate, useLocation, json} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axiosInstance";
import {AiOutlineUser} from "react-icons/ai";
import {AiFillEye} from "react-icons/ai";

function Profile() {
  const [showForm, setShowForm] = useState(false);
  const [token, setToken] = useState(null);
  const [show, setPasswordShow] = useState(false);
  const [show2, setPasswordShow2] = useState(false);
    const [show3, setPasswordShow3] = useState(false);

  const location = useLocation();
  const [photo, setPhoto] = useState(null);
  const fileref = useRef();

  let [user, setUser] = useState({});
  const navigate = useNavigate();
  const onSubmit = data => UpdateProfile(data);
  const onSubmit2 = data => UpdatePassword(data);
  const onSubmit3 = data => forgetPassword(data);

  console.log(user, "user");
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {name: user?.name, phone: user?.phone, email: user?.email},
  });
  console.log(errors, "orro");
  const UpdateProfile = data => {
    console.log(data, "updated paswword you know");
    // const {_id} = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    console.log(data, "profile");
    let formData = new FormData();
    formData.append("photo", photo);
    formData.append("_id", user?._id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    // formData.append("bio", data.bio);
    formData.append("phone", data.phone);
    console.log(formData, "formdata");
    axiosInstance
      .patch("api/users/updateuser", formData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res, "user is updated", res);
        if (res.status === 200) {
          toast.success("profile updated successfully!", {
            position: "top-center",
          });
          console.log(res, "res");
          setUser(res.data?.data);
          getUser();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  const UpdatePassword = resetData => {
    resetData._id = user._id;
    console.log(resetData, "UpdatePassword");
    const token = localStorage.getItem("token");
    if (resetData?.confirm_password !== resetData?.password) {
     return toast.error('password not matched',{position:"top-center"})
    }
    axiosInstance
      .patch("api/users/changepassword", resetData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res, "user is updated", res);

        if (res.status === 200) {
          toast.success("password updated successfully!", {
            position: "top-center",
          });
          localStorage.removeItem("token");
          navigate("/login");
          window.location.reload();
          console.log(res, "res");
          // setUser(res.data?.data);
          // getUser();
        }
      })
      .catch(err => {
        toast.error("Old Password doesn't match", {position: "top-center"});
        console.error(err);
      });
  };
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
    <div className={`w-full  md:w-3/5 p-8 bg-white lg:ml-4 shadow-md`}>
      <form onSubmit={handleSubmit(onSubmit2)}>
        <div className="rounded  shadow p-6">
          <div className="pb-6 relative">
            <label
              for="name"
              className="font-semibold text-gray-700 block pb-1"
            >
              Old Password
            </label>
            <div className="flex">
              <input
                id="name"
                {...register("oldPassword", {required: true})}
                className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
                type={show3?"text":"password"}
              />
            </div>
            <span
              onClick={() => {
                setPasswordShow3(!show3);
              }}
              className={` ${
                show3 ? "border border-gray-400 rounded-xl" : ""
              } absolute  right-[1%] bottom-[30%] cursor-pointer text-xl`}
            >
              <AiFillEye />
            </span>
            {errors.oldPassword?.type === "required" && (
              <p role="alert" className="text-red-500">
                oldPassword is required
              </p>
            )}
          </div>
          <div className="pb-6 relative">
            <label
              for="about"
              className="font-semibold text-gray-700 py-2 block  "
            >
              New Password
            </label>
            <input
              {...register("password", {required: true})}
              className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
              type={`${show ? "text" : "password"}`}
            />
            <span
              onClick={() => {
                setPasswordShow(!show);
              }}
              className={` ${
                show ? "border border-gray-400 rounded-xl" : ""
              } absolute  right-[1%] bottom-[30%] cursor-pointer text-xl`}
            >
              <AiFillEye />
            </span>
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-500">
                New paswword is required
              </p>
            )}
          </div>
          <div className="pb-6 relative">
            <label
              for="about"
              className="font-semibold text-gray-700 py-2 block  "
            >
              Confirm Password
            </label>
            <input
              {...register("confirm_password", {required: true})}
              type={`${show2 ? "text" : "password"}`}
              className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
            />
            <span
              onClick={() => {
                setPasswordShow2(!show2);
              }}
              className={` ${
                show2 ? "border border-gray-400 rounded-xl" : ""
              } absolute  right-[1%] bottom-[30%] cursor-pointer text-xl`}
            >
              <AiFillEye />
            </span>
          </div>

          <button className="border-1 bg-blue-500 text-white hover:bg-blue-700  rounded-r px-4 py-2 w-full border border-gray-500">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
