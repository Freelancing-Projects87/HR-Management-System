import React from "react";
import {Fragment, useRef, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/outline";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function GradeModel(props) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
    let [open, setOpen] = useState(false);

  const deleteCandidate = () => {
    console.log(props.candidate, "candidate.candidate");
    // axios
    //   .post(`http://localhost:8000/api/admin/`, {
    //     id: props.id,
    //   })
    //   .then(res => {
    //     if (res.status === 200) {
    //       props.setOpen(false);
    //       props.getData();
    //       // console.log(res, "is deleted");
    //       // navigate(`${navigate(props.to)}`);
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  };
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center min-h-screen w-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white  relative  rounded-lg px-4  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="p-12">
               
             
              </div>
              <div class=" w-full bg-gray-100  px-2 py-2">
                <div
                  className="flex w-full justify-between items-center"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <div className="question bg-blue-500 rounded-md text-white hover:bg-blue-700  p-2 w-full ">
                    {/* {quiz.question} */} grade aeihfsdhf sihsdiujfnsdsd
                  </div>
                  <button className="bg-blue-500 text-white rounded-md hover:bg-blue-700 ml-4 w-[10%] p-2">
                    Grade
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default GradeModel;
