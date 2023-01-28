import React, {useState, useEffect,useRef} from "react";
import axios from "axios";
import {useNavigate, useLocation, json} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [showForm, setShowForm] = useState(false);
      const location = useLocation();

  const [photo,setPhoto]=useState(null);
    const fileref=useRef()

  let [user,setUser]=useState({})
  const navigate = useNavigate();
  const onSubmit = data => UpdateProfile(data);
  console.log(user,"user");
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors},
    watch,
  
  } = useForm({defaultValues:{name:"",phone:"",email:""}});
  console.log(errors,"orro");
  const UpdateProfile = data => {
    console.log(data, "updated paswword you know");
    const {_id} = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    console.log(data, "profile");
    let formData = new FormData();
    formData.append("photo", photo)
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
          toast.success("profile updated successfully!",{position:"top-center"})
          console.log(res,"res");
          setUser(res.data?.data)
         getUser()
        }
      })
      .catch(err => {
        console.error(err);
      })
  };
    function getUser() {
      axios
        .get(`http://localhost:8000/api/users/getuser/${location.state._id}`)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("user",JSON.stringify( res.data?.data));
                       res?.data && reset(res?.data?.data);

          setUser(res?.data?.data);
            console.log(res.data?.data.role, "res.data?.role");
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
    useEffect(() => {
      getUser();
    }, [location.state,reset]);
  return (
    <div className="h-[90vh] w-[85%] ml-auto flex items-center justify-center  bg-white ">
      <ToastContainer />
      <div className="h-full w-11/12">
        <div className="border-b-2 block md:flex">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white ">
            {/* <div className="flex justify-between">
              <span className="text-xl font-semibold block">Profile</span>
             
            </div>
            <div className="text-gray-600 text-md">
              Name: <span className="font-bold">{user?.name}</span>{" "}
            </div>{" "}
            <br />
            <div className="text-gray-600 text-md">
              Email: <span className="font-bold">{user?.email}</span>
            </div>
            <br />
            <div className="text-gray-600 text-md">
              Phone: <span className="font-bold">{user?.phone}</span>
            </div>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border"
                src={user?.photo}
                alt=""
              />
            </div> */}
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
                      // defaultValue={user?.name}
                      onChange={e => {
                        setUser({name: e.target.value});
                      }}
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
                    defaultValue={user?.email}
                    id="email"
                    disabled
                    {...register("email", {required: false})}
                    className="border-1  rounded-r px-4 py-2 w-full border border-gray-500"
                    type="email"
                  />
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
                    defaultValue={user?.phone}
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
                    id="photo"
                    ref={fileref}
                    onChange={e => {
                      setPhoto(e.target.files[0]);
                    }}
                    className="border-1 hidden  rounded-r px-4 py-2 w-full border border-gray-500"
                    type="file"
                  />
                  <label htmlFor="photo">
                    <img
                      onClick={() => {
                        fileref.current.click();
                      }}
                      src={
                       !photo? user?.photo :URL.createObjectURL(photo)
                      }
                      alt=""
                      className="w-48 rounded-md h-48"
                    />
                  </label>
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
