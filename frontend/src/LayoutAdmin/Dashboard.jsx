import { Fragment, useState, } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react';
import logo from "../../src/logo.png"
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [style1,setStyle1]=useState(false)
  const [style2,setStyle2]=useState(false)
  const [style3,setStyle3]=useState(false)
    const [style4, setStyle4] = useState(false);

  const navigate = useNavigate()
function signOut(){
   axios.get("http://localhost:8000/api/users/logout").then((res)=>{
    if(res.status==200){
     localStorage.removeItem('token')
     navigate('/login')
     window.location.reload()
    }
   })
}


//   const userSignout=async ()=>{
//      dispatch({type:adminAction.signout_user_request})
//      const res = await axios.post('/admin/signout')
//      console.log(res)
//        if(res.status===200){
//           localStorage.clear()
//          dispatch({type:adminAction.signout_user_success,payload:{message:"you are logout"}})
//          window.location.reload()
//        }else{
//          dispatch({ type: adminAction.signout_user_fail,payload:{error:res.data.error}});
//        }
//   }
 

  return (
    <>
      <div className="">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden "
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-8 w-auto" src={logo} alt="Interviewer" />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {/* sidebar for mobile */}
                    <nav className="flex-1 px-2 pb-4 space-y-1">
                      {/* 1 */}
                      <p
                        onClick={() => {
                          setStyle1(true);
                          setStyle2(false);
                          setStyle3(false);
                        }}
                        className={classNames(
                          `text-gray-600  ${
                            style1 ? "bg-purple-600" : ""
                          } bg-gray-100 cursor-pointer `,
                          "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <HomeIcon
                          className={classNames(
                            "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className={`${style1 ? "text-white" : ""}`}>
                          Dashboard
                        </span>
                      </p>
                      {/* 2 */}
                      <p
                        onClick={() => {
                          setStyle2(true);
                          setStyle1(false);
                          setStyle3(false);
                        }}
                        className={classNames(
                          `text-gray-600 ${
                            style2 ? "bg-purple-600 text-white" : ""
                          }  cursor-pointer`,
                          "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <CalendarIcon
                          className={classNames(
                            "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className={`${style2 ? "text-white" : ""}`}>
                          {" "}
                          Category
                        </span>
                      </p>
                      {/* 3 */}
                      <p
                        onClick={() => {
                          setStyle3(true);
                          setStyle2(false);
                          setStyle1(false);
                        }}
                        className={classNames(
                          `text-gray-600 ${
                            style3 ? "bg-purple-600" : ""
                          }  cursor-pointer`,
                          "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <InboxIcon
                          className={classNames(
                            "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className={`${style3 ? "text-white" : ""}`}>
                          Products
                        </span>
                      </p>
                    </nav>
                    {/* sidebar for mobile */}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 ">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5  overflow-y-auto">
            {/* here you can edit sidebar */}
            <div className="flex items-center justify-center flex-shrink-0 px-4">
              <img className="h-10 w-14 w-auto" src={logo} alt="Workflow" />
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {/* 1 */}
                <p
                  onClick={() => {
                    setStyle1(true);
                    setStyle2(false);
                    setStyle3(false);
                    setStyle4(false)
                    // window.location.href = "/candidates";
                    navigate("/candidates");
                  }}
                  className={classNames(
                    `text-gray-600  ${
                      style1 ? "bg-purple-600" : ""
                    } cursor-pointer `,
                    "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <HomeIcon
                    className={classNames(
                      "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className={`${style1 ? "text-white" : ""}`}>
                    Candidates
                  </span>
                </p>
                {/* 2 */}
                <p
                  onClick={() => {
                    setStyle2(true);
                    setStyle1(false);
                    setStyle3(false);
                    setStyle4(false)
                    navigate("/business");
                  }}
                  className={classNames(
                    `text-gray-600 ${
                      style2 ? "bg-purple-600 text-white" : ""
                    }  cursor-pointer`,
                    "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <CalendarIcon
                    className={classNames(
                      "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className={`${style2 ? "text-white" : ""}`}>
                    {" "}
                    Business Pipeline
                  </span>
                </p>
                {/* 3 */}
                <p
                  onClick={() => {
                    setStyle3(true);
                    setStyle2(false);
                    setStyle1(false);
                    setStyle4(false)
                    navigate("/businesscase")
                  }}
                  className={classNames(
                    `text-gray-600 ${
                      style3 ? "bg-purple-600" : ""
                    }  cursor-pointer`,
                    "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <InboxIcon
                    className={classNames(
                      "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className={`${style3 ? "text-white" : ""}`}>
                    Business Case
                  </span>
                </p>
                <p
                  onClick={() => {
                    setStyle4(true)
                    setStyle3(false);
                    setStyle2(false);
                    setStyle1(false);
                    navigate("/interview");
                  }}
                  className={classNames(
                    `text-gray-600 ${
                      style4 ? "bg-purple-600" : ""
                    }  cursor-pointer`,
                    "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <InboxIcon
                    className={classNames(
                      "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className={`${style4 ? "text-white" : ""}`}>
                    Interview
                  </span>
                </p>
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                {/* <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form> */}
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {
                        // userNavigation.map((item) => (
                        <Menu.Item>
                          {({active}) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              <p
                                onClick={() => {
                                  signOut();
                                }}
                              >
                                {userNavigation[2].name}
                              </p>
                            </Link>
                          )}
                        </Menu.Item>
                        // ))
                      }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}