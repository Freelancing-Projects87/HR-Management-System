import React, {useState, useRef} from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axiosInstance";

function CandidateEdit() {
  let navigate = useNavigate();
  const location = useLocation();
  const [candidate, setCandidate] = useState({});
  const [countries, setCountries] = useState([]);
  let imgRef = useRef();

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      firstname: location.state?.firstname,
      lastname: location.state?.lastname,
      email: location.state?.email,
      phone: location.state?.email,
      nationality: location.state?.nationality,
    },
  });

  const onSubmit = data => updateCandidate(data);

  const updateCandidate = data => {
    data._id = candidate._id;
    console.log(data, " edit data");
    data.cv = data.cv[0];
    if (data.cv == undefined) {
      toast.error("please upload cv", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      let formData = new FormData();
      formData.append("cv", data.cv);
      formData.append("_id", data._id);
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("nationality", data.nationality);
      console.log(formData, "formData edit ");
      axiosInstance
        .post("api/admin/update_candidate", formData)
        .then(res => {
          console.log(res, "you know");
          if (res.status === 200) {
            console.log(res, "hmm");
            navigate("/candidates", {state: {sucess: false}});
            toast.success("Candidate edited successfully..!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  useEffect(() => {
    setCandidate(location?.state);
    console.log(location?.state);
  }, []);
  function getCountries() {
    axios
      .get("https://trial.mobiscroll.com/content/countries.json")
      .then(res => setCountries(res.data));
  }
  useEffect(() => {
    getCountries();
  }, []);
  console.log(errors, "errors");
  return (
    <>
      <ToastContainer />{" "}
      {/* bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . */}
      <div className="h-[90vh] w-[85%] ml-auto flex items-center justify-center  bg-white ">
        {/* <Header /> */}
        <div className="  bg-blue-50 w-[70%] rounded-2xl">
          <div className=" overflow-hidden ">
            <div className=" m-8 mx-4 my-4 bg-white rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-xl text-gray-600 p-4 font-bold text-center mb-2">
                  Add Candidate detail
                </p>
                <div className=" bg-white/40 sm:p-2 rounded-2xl grid grid-cols-2 gap-y-4 h-full   bg-gray-600 px-6 w-[87%]  mx-auto ">
                  <div className=" pt-4 ">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type={"text"}
                      {...register("firstname", {required: true})}
                      aria-invalid={errors.firstname ? "true" : "false"}
                      className={` ${
                        errors.firstname ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.firstname?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        firstname is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      {...register("lastname", {required: true})}
                      aria-invalid={errors.lastname ? "true" : "false"}
                      className={` ${
                        errors.lastname ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.lastname?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        lastname is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {required: true})}
                      aria-invalid={errors.email ? "true" : "false"}
                      className={` ${
                        errors.email ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.email?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        email is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      for="small"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nationality
                    </label>
                    <select
                      {...register("nationality", {required: true})}
                      className={` ${
                        errors.nationality ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    >
                      <option selected>{candidate.nationality}</option>
                      {countries?.map(country => (
                        <>
                          <option
                            className="border border-gray-500"
                            value={country.text}
                          >
                            {country.text}
                          </option>
                        </>
                      ))}
                      {/* 
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="DE">Pakistan</option>
                      <option value="DE">India</option>
                      <option value="DE">uk</option>
                      <option value="DE">Spain</option>
                      <option value="DE">Argentina</option>
                      <option value="DE">Portgal</option>
                      <option value="DE">Uae</option> */}
                    </select>
                  </div>
                  {/* <div className="col-span-6 sm:col-span-3 pt-4 ">
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Recomendation
                    </label>

                    <select
                      {...register("recomendation", {required: true})}
                      id="countries"
                      class="w-full sm:w-11/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose Recomendation</option>
                      <option value="offer">Offer</option>
                      <option value="not offer">not Offer</option>
                      <option value="second interview">Second interview</option>
                    </select>
                    {errors.recomendation?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        recomendation is required
                      </p>
                    )}
                  </div> */}
                  {/* <div className="col-span-6 sm:col-span-3 pt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Starting Date *
                    </label>
                    <input
                      type="date"
                      placeholder="your@gmail.com"
                      name="startingDate"
                      {...register("startingDate", {required: true})}
                      aria-invalid={errors.email ? "true" : "false"}
                      className={` ${
                        errors.startingDate ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.startingDate?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        startingDate is required
                      </p>
                    )}
                  </div> */}
                  <div className=" pt-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cv
                    </label>
                    <input
                      type="file"
                      placeholder=""
                      name="cv"
                      id="password"
                      {...register("cv", {required: true})}
                      aria-invalid={errors.password ? "true" : "false"}
                      className={` ${
                        errors.cv ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.cv?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        cv is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="phone"
                      id="password"
                      {...register("phone", {required: true})}
                      aria-invalid={errors.password ? "true" : "false"}
                      className={` ${
                        errors.phone ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.phone?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        phone is required
                      </p>
                    )}
                  </div>
                  <div>
                    {/* {!previewImg?
                    <img src={candidate.cv} className="w-24 h-24" alt="" />: */}
                    {/* <img className="w-24 h-24" ref={imgRef} /> */}
                  </div>
                  <div className="flex flex-col  items-center mt-4">
                    <button
                      type="submit"
                      class=" text-center mb-4 content-center border broder-gray-500 bg-blue-700 text-white hover:bg-[] hover:text-black font-bold py-2 px-4 rounded-full w-40  justify-center"
                    >
                      Save
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
export default CandidateEdit;
