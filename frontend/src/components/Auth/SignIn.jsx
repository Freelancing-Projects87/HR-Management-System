import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AiFillEye} from "react-icons/ai"

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
const [show,setPasswordShow]=useState(false)
  const onSubmit = data => LoginUser(data);
  let navigate = useNavigate();
  const LoginUser = data => {
   console.log(data);
    axios
      .post("http://localhost:8000/api/users/login", data, {
        headers: {
          accept: "application/json",
        },
      })
      .then(res => {
        console.log(res,"data of loged in user");
        if (res.status === 200) {
          localStorage.setItem("token", res?.data?.data.token);
          localStorage.setItem("user", JSON.stringify(res?.data?.data));
          // navigate("/");
           navigate('/candidates',{state:{fromLogin:true}})

          window.location.reload();
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
                <div className=" bg-white/40 sm:p-6 rounded-2xl border broder-gray-800  bg-gray-100 px-6   h-96">
                  <div>
                    <p className="text-2xl text-gray-800 font-bold text-center mb-2">
                      Sign in
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className=" underline cursor-pointer text-center font-semibold text-xs"
                  >
                    Not signed up yet? Create a free account
                  </div>
                  <div className="col-span-6 sm:col-span-3 pt-4">
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email *
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
                  <div className="col-span-6 relative sm:col-span-3 pt-4">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password *
                    </label>
                    <input
                      {...register("password", {required: true})}
                      aria-invalid={errors.password ? "true" : "false"}
                      type={`${show ? "text" : "password"}`}
                      className={` ${
                        errors.password ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    <span
                      onClick={() => {
                        setPasswordShow(!show);
                      }}
                      className={` ${show?"border border-gray-400 rounded-xl":""} absolute  right-[11%] bottom-[12%] cursor-pointer text-xl`}
                    >
                      <AiFillEye />
                    </span>

                    {errors.password?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        password is required
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col  items-center mt-8">
                    <button
                      type="submit"
                      class=" text-center content-center border broder-gray-500 bg-blue-700 text-white hover:bg-blue-400 hover:text-black font-bold py-2 px-4 rounded-full w-40  justify-center"
                    >
                      Login
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
