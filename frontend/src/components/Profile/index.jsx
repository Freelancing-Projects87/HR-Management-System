import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = data => UpdateProfile(data);
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({defaultValues: {}});
  const UpdateProfile = data => {
    console.log(data, "updated paswword you know");
    const {_id} = JSON.parse(localStorage.getItem("user"));

    data._id = _id;
    // alert(_id)
    const token = localStorage.getItem("token");
    
    axios
      .post("http://localhost:8000/api/users/updateuser", data, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res, "user is updated", res);
        // if (res.status === 200) {
        //   console.log(res,"res");
        // }
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {}, []);
  return (
    <div className="h-[90vh] w-[85%] ml-auto flex items-center justify-center  bg-white ">
      <ToastContainer />
      <div className="h-full w-11/12">
        <div className="border-b-2 block md:flex">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
            <div className="flex justify-between">
              <span className="text-xl font-semibold block">Profile</span>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                }}
                className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                Edit
              </button>
            </div>

            <span className="text-gray-600">
              This information is secret so be careful
            </span>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border"
                src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                alt=""
              />
            </div>
          </div>

          <div className={`w-full  md:w-3/5 p-8 bg-white lg:ml-4 shadow-md`}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded  shadow p-6">
                <div className="pb-6">
                  <label
                    for="name"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Name
                  </label>
                  <div className="flex">
                    <input
                      id="name"
                      {...register("name", {required: true})}
                      className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
                      type="text"
                    />
                  </div>
                  {errors.name?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      Name is required
                    </p>
                  )}
                </div>
                <div className="pb-4">
                  <label
                    for="about"
                    className="font-semibold text-gray-700 py-2 block px-4 "
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email", {required: true})}
                    className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
                    type="email"
                  />
                  {errors.email?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      email is required
                    </p>
                  )}
                </div>
                <div className="pb-4">
                  <label
                    for="about"
                    className="font-semibold text-gray-700 py-2 block px-4 "
                  >
                    Photo
                  </label>
                  <input
                    id="email"
                    {...register("photo", {required: true})}
                    className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
                    type="file"
                  />
                  {errors.photo?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      Photo is required
                    </p>
                  )}
                </div>
                <button className="border-1 bg-blue-500 text-white hover:bg-blue-700  rounded-r px-4 py-2 w-full border border-gray-500">
                  Update
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
