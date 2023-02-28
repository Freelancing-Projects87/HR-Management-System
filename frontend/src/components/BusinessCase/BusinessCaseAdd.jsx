import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import axiosInstance from "../../utils/axiosInstance";


function BusinessCaseAdd() {
  let navigate = useNavigate();
    const [excelData, setExcelData] = useState({expectedResult:"",approach:"",context:""});

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const onSubmit = data => saveBusiness(data);

  const saveBusiness = data => {
    data.excelData=excelData
    console.log(data, "data")
  axiosInstance.post("api/admin/addBusinessCase", data).then(res => {
      if (res.status == 200) {
        console.log(res, "hmm");
        navigate("/businesscase");
        toast.success("Business Case added successfully..!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
  };
  //  handler for getting data from excel sheet to add in businessCase
    const handleFileUpload = e => {
      e.preventDefault();
      var files = e.target.files,
        f = files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        let readedData = XLSX.read(data, {type: "binary"});
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {header: 1, defval: ""});
      dataParse &&
        setExcelData({
          context: dataParse[1][0],
          approach:dataParse[1][1],
          expectedResult:dataParse[1][2]
        });
      // dataParse&&  setExcelData({context:uploadData[0],approach:uploadData[1],expectedResult:uploadData[2]})
        console.log(excelData, "excelData");
        if (dataParse.length > 1) {
          // context.value = dataParse && dataParse[1][0];
          // approach.value = dataParse[1][1] && dataParse[1][0];
          // er.value = dataParse && dataParse[1][2];
        }
      };
      reader.readAsBinaryString(f);
    }

  return (
    <>
      {" "}
      {/* bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 . */}
      <div className="h-[90vh] w-[85%] ml-auto flex items-center justify-center  bg-white ">
        {/* <Header /> */}
        <div className="  bg-blue-50 w-[70%] rounded-2xl  ">
          <div className=" overflow-hidden  ">
            <div className=" m-8 mx-4  bg-white rounded-2xl ">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <p className="text-xl text-gray-600 pt-4 font-bold text-center mb-2">
                  Add Business Pipeline
                </p>
                <div className=" bg-white/40 sm:p-2 rounded-2xl grid grid-cols-2 gap-y-4 h-full   bg-gray-600 px-6 w-[87%]  mx-auto ">
                  <div className=" pt-4 ">
                    <label
                      htmlFor="requester"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Business Case Title
                    </label>
                    <input
                      type={"text"}
                      {...register("bcTitle", {required: true})}
                      aria-invalid={errors.bcTitle ? "true" : "false"}
                      className={` ${
                        errors.bcTitle ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.bcTitle?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Bc Title is required
                      </p>
                    )}
                  </div>

                  <div className=" pt-4 w-full ">
                    <label
                      htmlFor="neededby"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expected Time to solve
                    </label>
                    <input
                      type={"text"}
                      {...register("expectedTime", {required: true})}
                      aria-invalid={errors.expectedTime ? "true" : "false"}
                      className={` ${
                        errors.expectedTime ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    />
                    {errors.expectedTime?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Expected Time is required
                      </p>
                    )}
                  </div>

                  <div className=" pt-4 w-full ">
                    <label
                      for="small"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Diffculty
                    </label>
                    <select
                      {...register("difficulty", {required: true})}
                      className={` ${
                        errors.difficulty ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    >
                      {/* <option selected>Select</option>   */}
                      <option value="low" selected>
                        Low
                      </option>
                      <option value="medium">medium</option>
                      <option value="high">High</option>
                    </select>
                    {errors.difficulty?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Difficulty is required
                      </p>
                    )}
                  </div>
                  <div className=" pt-4 w-full">
                    <label
                      htmlFor="requester"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sheet....
                    </label>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="w-1/2"
                    />
                  </div>
                  <div className=" pt-4 w-full ">
                    <label
                      for="small"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Type
                    </label>
                    <select
                      {...register("type", {required: true})}
                      className={` ${
                        errors.type ? " border border-red-500" : ""
                      } mt-1 px-2 block w-full   sm:w-11/12 sm:px-6 py-2 border   border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
                    >
                      {/* <option selected>Assigned </option>   */}
                      <option value="Marketing Size" selected>
                        Marketing Size
                      </option>
                      <option value="Teaser">Teaser</option>
                    </select>
                    {errors.type?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Type is required
                      </p>
                    )}
                  </div>

                  <div className="w-full bg-gray-50 px-2 pb-6 rounded-md flex items-start  flex-col pt-8  space-y-2">
                    <textarea
                      name="context"
                      id="context"
                      value={excelData.context}
                      onChange={e => {
                        setExcelData({
                          ...excelData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      placeholder="Context"
                      className="bg-white shadow-md w-full h-20 px-3 rounded-xl"
                    ></textarea>
                    <textarea
                      name="approach"
                      value={excelData.approach}
                      onChange={e => {
                        setExcelData({
                          ...excelData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      placeholder="Approach"
                      id="approach"
                      className="bg-white shadow-md w-full h-20 px-3 rounded-xl"
                    ></textarea>
                    <textarea
                      name="expectedResult"
                      value={excelData.expectedResult}
                      onChange={e => {
                        setExcelData({
                          ...excelData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      placeholder="Expected Results"
                      className="bg-white shadow-md w-full h-20 px-3 rounded-xl"
                      id="er"
                    ></textarea>
                  </div>
                  <div></div>
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
export default BusinessCaseAdd;
