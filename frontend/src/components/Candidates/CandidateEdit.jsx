import React, {useState} from "react";
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";

function CandidateEdit() {
  let navigate = useNavigate();
  const location = useLocation()
  const [candidate,setCandidate]=useState({})
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const onSubmit = data => updateCandidate(data);

  const updateCandidate = data => {
    data._id=candidate._id
    axios
      .post("http://localhost:8000/api/admin/update_candidate", data)
      .then(res => {
        console.log(res, "you know");
        if (res.status === 200) {
          console.log(res, "hmm");
          navigate("/candidates");
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
useEffect(()=>{
setCandidate(location?.state);
console.log(location?.state);
},[])
  return (
    <>
      <div className="h-[90vh] w-[83.3%] ml-auto flex items-center justify-center  bg-white ">
        {/* <Header /> */}
        <div className="  bg-blue-50 w-[70%] rounded-2xl">
          <div className=" overflow-hidden ">
            <div className=" m-8 mx-4 my-4 bg-white rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" bg-white/40 sm:p-6 rounded-2xl  bg-gray-600 px-6 w-[87%] mx-auto ">
                  <p className="text-2xl text-gray-800 font-bold text-center mb-2">
                    Update Candidate detail
                  </p>
                  <div className="col-span-6 sm:col-span-3 pt-4 w-full ">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      defaultValue={candidate.name}
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
                      Recomendation
                    </label>

                    <select
                      defaultValue={candidate?.recomendation}
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
                  </div>

                  <div className="col-span-6 sm:col-span-3 pt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Starting Date *
                    </label>
                    <input
                      defaultValue={candidate?.startingDate}
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
                  </div>
                  <div className="col-span-6 sm:col-span-3 pt-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Grade *
                    </label>
                    <input
                      defaultValue={candidate?.grade}
                      type="number"
                      placeholder=""
                      name="password"
                      id="password"
                      {...register("grade", {required: true})}
                      aria-invalid={errors.password ? "true" : "false"}
                      className={` ${
                        errors.grade ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.grade?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        grade is required
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col  items-center mt-4">
                    <button
                      type="submit"
                      // onClick={saveCandidate}
                      class=" text-center content-center border broder-gray-500 bg-blue-700 text-white hover:bg-[] hover:text-black font-bold py-2 px-4 rounded-full w-40  justify-center"
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
