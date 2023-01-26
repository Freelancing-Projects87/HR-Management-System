import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useLocation, json} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [showForm, setShowForm] = useState(false);
  const [photo,setPhoto]=useState(null);
  const [user,setUser]=useState({})
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = data => UpdateProfile(data);
  console.log(user, "user");
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({defaultValues: {}});
  const UpdateProfile = data => {
    console.log(data, "updated paswword you know");
    const {_id} = JSON.parse(localStorage.getItem("user"));
    // data._id = _id;
    // data.photo=photo
    const token = localStorage.getItem("token");
    console.log(data, "profile");
    let formData = new FormData();
    formData.append("photo", photo);
    formData.append("_id", _id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    // formData.append("bio", data.bio);
    formData.append("phone", data.phone);
    console.log(formData,"formdata");
    axios.patch("http://localhost:8000/api/users/updateuser", formData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res, "user is updated", res);
        if (res.status === 200) {
          console.log(res,"res");
         getUser()
        }
      })
      .catch(err => {
        console.error(err);
      })
  };
    function getUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .get(`http://localhost:8000/api/users/getuser/${user._id}`)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("user",JSON.stringify( res.data?.data));
            setUser(res.data.data);
            console.log(res.data?.data.role, "res.data?.role");
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, []);
  return (
    <div className="h-[90vh] w-[85%] ml-auto flex items-center justify-center  bg-white ">
      <ToastContainer />
      <div className="h-full w-11/12">
        <div className="border-b-2 block md:flex">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
            <div className="flex justify-between">
              <span className="text-xl font-semibold block">Profile</span>
              {/* <button
                onClick={() => {
                  setShowForm(!showForm);
                }}
                className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                Edit
              </button> */}
            </div>
            <div className="text-gray-600 text-md">
              Name: <span className="font-bold">{user.name}</span>{" "}
            </div>{" "}
            <br />
            <div className="text-gray-600 text-md">
              Email: <span className="font-bold">{user.email}</span>
            </div>
            <br />
            <div className="text-gray-600 text-md">
              Phone: <span className="font-bold">{user.phone}</span>
            </div>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border"
                src={user?.photo}
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
                    Phone
                  </label>
                  <input
                    id=""
                    {...register("phone", {required: true})}
                    className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
                    type="text"
                  />
                  {errors.phone?.type === "required" && (
                    <p role="alert" className="text-red-500">
                      phone is required
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
                    onChange={e => {
                      setPhoto(e.target.files[0]);
                    }}
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
