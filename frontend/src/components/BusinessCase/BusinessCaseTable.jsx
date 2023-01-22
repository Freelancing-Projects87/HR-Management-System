import React, {useEffect, useState} from "react";
import {
  AiOutlineDelete,
  AiOutlinePlusSquare,
  AiOutlineBank,
  AiOutlineEdit,
  AiFillEye,
} from "react-icons/ai";
import {FaPencilAlt} from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DeleteModel from "../ModelDelete";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";

function BusinessCaseTable() {
  const [businessData, setBusiness] = useState([]);
      const [excelData, setExcelData] = useState({
        bcTitle: "",
        type: "",
        difficulty: "",
        expectedTime: "",
        excelData: {approach: "", context: "", expectedResult: ""},
      });

  const [popup, setPopup] = useState(true);
  let [open, setOpen] = useState(false);
  const [delId, setDelId] = useState(null);
  console.log(delId, "delId");
  const navigate = useNavigate();
  const getBusinessCase= () => {
    // bcTitle;
    axios.get("http://localhost:8000/api/admin/getBusinessCase").then(res => {
        if (res.status === 200) {
          setBusiness(res.data?.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    getBusinessCase()
  }, [])
  //  to add overall business case from 
   const saveBusiness = data => {
    console.log(data,"data");
    if(data.excelData){
     axios
       .post("http://localhost:8000/api/admin/addBusinessCase", data)
       .then(res => {
         if (res.status == 200) {
           console.log(res, "hmm");
           navigate("/businesscase");
           toast.success("Business Case added successfully..!", {
             position: toast.POSITION.TOP_CENTER,
           });
               getBusinessCase();
         }
       })
       .catch(err => {
         console.error(err);
       });
    }
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
     
       console.log(dataParse[1], "excelData dataParse", excelData);
       saveBusiness({
         bcTitle: dataParse[1][0],
         type: dataParse[1][1],
         difficulty: dataParse[1][2],
         expectedTime: dataParse[1][3],
         excelData: {
           context: dataParse[1][4],
           approach: dataParse[1][5],
           expectedResult: dataParse[1][6],
         },
       });
   
     };
     reader.readAsBinaryString(f);
   }
  return (
    <>
      <div className="flex mb-4 ml-2 items-end justify-end w-full ">
        <button
          onClick={() => {
            navigate("/businesscaseAdd");
          }}
          type="button"
          className="inline-flex  relative right-12 top-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
      shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add <AiOutlineBank className="ml-2 text-xl" />
        </button>
      </div>
      <div className="flex flex-col w-[82.3%]  float-right overflow-hidden ">
        <div className="-my-2 overflow-hidden sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden  border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y  overflow-hidden divide-gray-200 bg-gray-50">
                <thead className="">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bc Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Difficulty
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Extected time to solve
                    </th>
                    {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th> */}
                    <th scope="col" className="relative px-6 py-3">
                      <input
                        style={{color: "transparent"}}
                        type="file"
                        id="uploadoverall"
                        onChange={handleFileUpload}
                        className="w-1/2 hidden"
                      />
                      <label
                        htmlFor="uploadoverall"
                        className="bg-blue-600  p-2 rounded-md text-white text-sm cursor-pointer"
                      >
                        Upload Overall
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {businessData &&
                    businessData.map(business => (
                      <tr key={"fdfd"} onClick={() => {}}>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {business.bcTitle}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {business.type}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {business.difficulty}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6  py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {business.expectedTime}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap  text-right text-sm font-medium">
                          <FaPencilAlt
                            onClick={() => {
                              navigate("/businesscaseEdit", {state: business});
                            }}
                            className=" cursor-pointer relative left-48  h-6 w-6  p-1 rounded-sm bg-blue-700 hover:bg-blue-500 text-white text-xl"
                          />
                        </td>
                        {/* <td>
                          <AiFillEye
                            onClick={() => {
                              navigate("/businessView", {state: business});
                            }}
                            className=" cursor-pointer   h-6 w-6  p-1 rounded-sm bg-gray-300 text-blue text-xl hover:bg-gray-500"
                          />
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <AiOutlineDelete
                            onClick={() => {
                              setOpen(true);
                              setDelId(business._id);
                            }}
                            className=" cursor-pointer  text-red-500 text-xl"
                          />
                        </td>
                        <DeleteModel
                          open={open}
                          setOpen={setOpen}
                          id={delId && delId}
                          getData={getBusinessCase}
                          to={"deleteBusinessCase"}
                        />
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessCaseTable;
