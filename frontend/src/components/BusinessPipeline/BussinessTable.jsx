import React, {useEffect, useState} from "react";
import {
  AiOutlineDelete,
  AiOutlinePlusSquare,
  AiOutlineUserAdd,
} from "react-icons/ai";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BussinessTable() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex mb-4 ml-2 items-end justify-end w-full ">
        <button
          onClick={() => {
            navigate("/addcandidate");
          }}
          type="button"
          className="inline-flex  relative right-12 top-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
      shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add <AiOutlineUserAdd className="ml-2 text-xl" />
        </button>
      </div>
      <div className="flex flex-col w-[83.3%]  ml-auto ">
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* {product.products && product.products.map((product: any) => ( */}
                  <tr key={"fdfd"} onClick={() => {}}>
                    <td className="px-6  py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* <div onClick={(e) => setOpen(true)} className="flex space-x-0.5 h-10 w-20">
                                {
                                  product.productPicture && product.productPicture.map((src) => (
                                    <img className="h-10 w-10  rounded-full" src={`http://localhost:2000/public/${src.img}`} alt={`http://localhost:2000/public/${src.img}`} />
                                  ))
                                }
                              </div> */}
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {"fdfd"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {"dfdfdf"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{"sdsd"}</div>
                      <div className="text-sm text-gray-500">{"sff"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {"fdf"}
                      </span>
                    </td>
                    <td
                      onClick={e => {}}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {"fdfd"}...
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <p
                        onClick={() => {
                          navigate("/editcandidate");
                        }}
                        className="text-indigo-600 cursor-pointer mr-3 hover:text-indigo-900"
                      >
                        Edit
                      </p>
                    </td>

                    <AiOutlineDelete
                      onClick={() => {}}
                      className="relative cursor-pointer top-6 right-3 text-red-500 text-xl"
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BussinessTable;
