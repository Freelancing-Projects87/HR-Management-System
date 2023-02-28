import axios from "axios";
import jsCookie from "js-cookie";

// Set config defaults when creating the instance
let token = localStorage.getItem("token");
let options = {
  // baseURL: "https://devapp.aaenterpris.com",
  // baseURL: "http://192.168.42.93:3310",
  //   baseURL: "https://devapp.aaenterpris.com",
  //   baseURL: "http://192.168.18.141:3310",
  //for production
  // baseURL: "https://cargoapp.aaenterpris.com",
  // "homepage": "https://travel.aaenterpris.com/",
  baseURL: "http://localhost:8000/",
  withCredentials: true,
};
if (token) {
  options.headers = {
    Authorization: `Bearer ${token}`,
  };
}
const axiosInstance = axios.create(options);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      jsCookie.remove("token");
      localStorage.removeItem("token");
      if (
        error.response.data.message !==
        "Your login details could not be verified. Please try again."
      ) {
        console.log("I'm into the expired session");
        window.location.href = "/login";
      }
      // if (
      //     !(~window.location.href.indexOf('/auth/login')
      //         || ~window.location.href.indexOf('signup')
      //         || ~window.location.href.indexOf('signuporg')
      //         || ~window.location.href.indexOf('reset'))
      // ) {
      //     history.push("/auth/login")
      //     window.location.href = "/auth/login"
      // }
    }
    return Promise.reject(error);
  }
);

// Alter defaults after instance has been created
// axiosInstance.defaults.headers.common["token"] = process.env.see_its_my;

export default axiosInstance;
