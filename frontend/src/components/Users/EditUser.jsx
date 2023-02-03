import React, {useState} from "react";
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import {FaPencilAlt, FaMeetup, AiFillEye} from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";

function EditUser() {
  let navigate = useNavigate();
  const location=useLocation()
  const [pdf, getPdf] = useState(null);
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
     name:location.state?.name,
     email:location.state.email,
     password:".........",
     userRole:location.state?.role,
     surname:location.state?.surname
    },
  });

  const onSubmit = data => updateUser(data);

   const updateUser = data => {
     console.log(data, "updated paswword you know");
     const {_id} = JSON.parse(localStorage.getItem("user"));
     const token = localStorage.getItem("token");
     console.log(data, "profile");
     let formData = new FormData();
     formData.append("_id", _id);
     formData.append("name", data.name);
     formData.append("email", data.email);
     formData.append("role", data.userRole);
    formData.append("photo", null);

     axios
       .patch("http://localhost:8000/api/users/updateuser", formData, {
         headers: {
           accept: "application/json",
         },
       })
       .then(res => {
         console.log(res, "user is updated", res);
         if (res.status === 200) {
           toast.success("user updated successfully!", {
             position: "top-center",
           });
           navigate('/users')
           console.log(res, "res");
        //    setUser(res.data?.data);
        //    getUser();
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
        <ToastContainer />
        {/* <Header /> */}
        <div className="  bg-blue-50 w-[70%] rounded-2xl">
          <div className=" overflow-hidden ">
            <div className=" m-8 mx-4 my-4 bg-white rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" bg-white/40 sm:p-6 rounded-2xl  bg-gray-100 px-6 w-11/12 mx-auto  ">
                  <p className="text-2xl text-gray-800 font-bold text-center mb-2">
                    Edit User
                  </p>
                  <div className="col-span-6 sm:col-span-3 pt-4 ">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      {...register("name", {required: true})}
                      aria-invalid={errors.first_name ? "true" : "false"}
                      className={` ${
                        errors.name ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.name?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Name is required
                      </p>
                    )}
                  </div>
                  <div className="col-span-6 sm:col-span-3 pt-4 ">
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Surname
                    </label>
                    <input
                      {...register("surname", {required: true})}
                      aria-invalid={errors.first_name ? "true" : "false"}
                      className={` ${
                        errors.name ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.surname?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        surname is required
                      </p>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3 pt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="your@gmail.com"
                      name="email"
                      id="email"
                      {...register("email", {required: true})}
                      aria-invalid={errors.email ? "true" : "false"}
                      className={` ${
                        errors.email ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.email?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Email is required
                      </p>
                    )}
                  </div>
                  <div className="col-span-6 relative sm:col-span-3 pt-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password *
                    </label>
                    <input
                      type={"text"}
                      placeholder="min 8 characters"
                      disabled
                      name="password"
                      id="password"
                      {...register("password", {required: true})}
                      aria-invalid={errors.password ? "true" : "false"}
                      className={` ${
                        errors.password ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    <span
                    //   onClick={() => {
                    //     setPasswordShow(!show);
                    //   }}
                      className={` ${
                        false ? "border border-gray-400 rounded-xl" : ""
                      } absolute  right-[11%] bottom-[12%] cursor-pointer text-xl`}
                    >
                      {/* <AiFillEye /> */}
                    </span>
                    {errors.password?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Password is required
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
                      {...register("userRole", {required: true})}
                      className={` ${
                        errors.userRole ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    >
                      <option selected value="">
                        Select Role
                      </option>
                      <option value="senior">Senior</option>
                      <option value="junior">Junior</option>
                      <option value="user">User</option>
                    </select>
                    {errors.percentage?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Role is required
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col  items-center mt-4">
                    <button
                      type="submit"
                      class=" text-center content-center border broder-gray-500 bg-blue-700 text-white hover:bg-[] hover:text-black font-bold py-2 px-4 rounded-full w-40  justify-center"
                    >
                      Update user
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
export default EditUser;
