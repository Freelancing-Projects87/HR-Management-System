import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {AiFillEye} from "react-icons/ai";


function Signup() {
  let navigate = useNavigate();
  const [show, setPasswordShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const onSubmit = data => SignupUser(data);

  console.log(watch("example")); // watch input value by passing the name of it

  const SignupUser = data => {
    data.role="user"
        console.log(data, "look data");

    axios.post("http://localhost:8000/api/users/register", data)
      .then(res => {
        // let {data} = res.data;
        console.log(res,"you know");
        if (res.status === 201) {
          storetokenData(res?.data?.data)
          console.log(res, "hmm");
          navigate("/login");
        }
      })
      .catch(err => {
        console.error(err);
      })
  };
   function storetokenData(data) {
     console.log(data, "logged in user data");
     axios
       .post("http://localhost:8000/api/users/storetoken_data", data)
       .then(res => {
         if ((res.status = 200)) {
           console.log(res, "see token response");
         }
       });
   }

  return (
    <>
      <div className="h-[90vh] flex items-center justify-center  bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . ">
        {/* <Header /> */}
        <div className="items-center justify-center  bg-blue-50 rounded-2xl">
          <div className="flex items-center justify-center overflow-hidden ">
            <div className=" m-8 mx-4 my-4 bg-white rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" bg-white/40 sm:p-6 rounded-2xl border broder-gray-800 bg-gray-100 px-6 w-96  ">
                  <p className="text-2xl text-gray-800 font-bold text-center mb-2">
                    Create Your account
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
                      type={`${show ? "text" : "password"}`}
                      placeholder="min 8 characters"
                      name="password"
                      id="password"
                      {...register("password", {required: true})}
                      aria-invalid={errors.password ? "true" : "false"}
                      className={` ${
                        errors.password ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    <span
                      onClick={() => {
                        setPasswordShow(!show);
                      }}
                      className={` ${
                        show ? "border border-gray-400 rounded-xl" : ""
                      } absolute  right-[11%] bottom-[12%] cursor-pointer text-xl`}
                    >
                      <AiFillEye />
                    </span>
                    {errors.password?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Password is required
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col  items-center mt-4">
                    <button
                      type="submit"
                      // onClick={getApiData}
                      class=" text-center content-center border broder-gray-500 bg-blue-700 text-white hover:bg-[] hover:text-black font-bold py-2 px-4 rounded-full w-40  justify-center"
                    >
                      Signup
                    </button>
                  </div>
                  <p
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="underline cursor-pointer text-center font-semibold text-xs pt-2"
                  >
                    Do you already have an account? Log in
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
