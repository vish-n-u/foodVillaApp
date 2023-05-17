import React from "react";
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Emailpage from "./Emailpage";
import {
  deleteElement,
  loginRoutes,
  registrationRoute,
} from "../../path.config";
import { validateEmail } from "./utils/helper";
import { updateName } from "../../redux/userNameSlice";
import { UserContext } from "../../app";
import GoogleLogins from "./GoogleLogin";
import LoadingScreen from "../../src/Loading";

const Login = () => {
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  // setUserName userName
  const [noOfSubmits, setNoOfSubmits] = useState(0);
  const [err, setErr] = useState({
    userEmail: "",
    password: "",
  });
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [isLoginUsingOtp, setIsLoginUsingOtp] = useState(false);
  const [isSigningInUsingGoogle, setISSigningInUsingGoogle] = useState(false);
  const Dispatch = useDispatch();
  const pageColour = useContext(UserContext);

  useEffect(() => {
    console.log("`````", showLoadingScreen);
    if (showLoadingScreen)
      onSubmit(
        userEmail,
        setUserEmail,
        password,
        setPassword,
        err,
        setErr,
        setProfileImgSrc,
        setSuccessfulLogin,
        Dispatch,
        setShowLoadingScreen
      );
  }, [showLoadingScreen]);
  return showLoadingScreen ? (
    <LoadingScreen />
  ) : isSigningInUsingGoogle ? (
    <Navigate to="/" />
  ) : successfulLogin ? (
    <Navigate to="/" />
  ) : noOfSubmits <= 3 && !isLoginUsingOtp ? (
    <>
      <div className={`flex   align-top  h-screen mt-1  `}>
        <div
          className={`h-3/4 w-full   flex flex-col justify-center items-center align-middle  ${
            pageColour == "white" ? "" : "bg-black text-white"
          }`}
        >
          <div className="h-fit w-fit lg:mb-7 mb-3">
            <GoogleLogins
              setISSigningInUsingGoogle={setISSigningInUsingGoogle}
            />
          </div>
          <div
            className={`border-2   flex flex-col w-11/12 content-center    h-fit rounded-xl justify-center items-center align-middle lg:w-1/3 ${
              pageColour == "white"
                ? "bg-blue-50 border-black"
                : "bg-black border-white text-white"
            }`}
          >
            <h1 className="text-xl font-semibold m-2"> Hey welcome back!</h1>

            <div className={`flex flex-col mt-5 items-center text-black `}>
              <input
                onChange={(e) => {
                  if (err.userEmail != "") {
                    setErr({ ...err, userEmail: "" });
                  }
                  setUserEmail(e.target.value);
                  if (
                    !validateEmail(e.target.value) &&
                    e.target.value.length > 0
                  ) {
                    setErr({ ...err, userEmail: "Invalid Email" });
                  }
                }}
                className={` border w-full h-10 m-2  mb-0 p-2  ${
                  err.userEmail !== "" ? "border-red-600" : "border-black"
                } `}
              ></input>
              {err.userEmail != "" ? (
                <span className="text-red-600">
                  {err.userEmail == "server"
                    ? "incorrect Email-id provided"
                    : err.userEmail}
                </span>
              ) : null}
              <span
                className={`mb-2 p-2 text-lg font-normal ${
                  pageColour == "white" ? "" : "text-white"
                }`}
              >
                Email-Id{" "}
              </span>
              <input
                type="password"
                onChange={(e) => {
                  if (err.password != "") {
                    setErr({ ...err, password: "" });
                  }
                  setPassword(e.target.value);
                }}
                className="border-black border w-full h-10 m-2 mb-0 p-2"
              ></input>
              {err.password != "" ? (
                <span className="text-red-600">
                  {err.password == "server"
                    ? "incorrect password provided"
                    : err.password}
                </span>
              ) : null}
              <span
                className={`mb-1  p-2 text-lg font-normal  ${
                  pageColour == "white" ? "" : "text-white"
                }`}
              >
                password
              </span>
              <button
                onClick={() => {
                  if (userEmail == "") {
                    setErr({ ...err, userEmail: "userEmail can't be empty" });
                    return;
                  }
                  if (password == "") {
                    setErr({ ...err, password: "password can't be empty" });
                    return;
                  }
                  setNoOfSubmits(noOfSubmits + 1);
                  setShowLoadingScreen(true);
                }}
                className="w-3/4 py-2 flex align-middle mb-3 text-lg font-semibold text-white  justify-center items-center  m-2 rounded-xl  bg-blue-700 active:bg-blue-900"
              >
                Submit
              </button>
            </div>
          </div>
          <h1 className="mt-5 text-lg">
            Not yet registered{"   "}
            <Link to="/signup">
              <span className="text-blue-900 underline">Register now</span>
            </Link>
          </h1>
          <div className="mt-4">
            Login using{" "}
            <span
              onClick={() => setIsLoginUsingOtp(true)}
              className="text-blue-800 cursor-pointer "
            >
              Otp
            </span>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Emailpage />
  );
};

export default Login;

async function onSubmit(
  userEmail,
  setUserEmail,
  password,
  setPassword,
  err,
  setErr,
  setProfileImgSrc,
  setSuccessfulLogin,
  Dispatch,
  setShowLoadingScreen
) {
  console.log(loginRoutes, registrationRoute, deleteElement);
  const data = await fetch(loginRoutes, {
    method: "POST",
    mode: "cors",

    body: JSON.stringify({ userEmail, password }),
    headers: { "content-type": "application/json" },
  });

  let dataJson = await data.json();
  setShowLoadingScreen(false);
  if (data.status == 200) {
    setProfileImgSrc(dataJson.message.imgLink);
    Dispatch(updateName(dataJson.message.userName));
    setSuccessfulLogin(true);

    localStorage.setItem("token", dataJson.message.token);
    localStorage.setItem("refreshToken", dataJson.message.refreshToken);
    return;
  }
  if (data.status == 400) {
    console.log("data.message.email::------", dataJson.message.email);
    if (dataJson.message.email) {
      setUserEmail("");
      setErr({ ...err, userEmail: "server" });
      return;
    } else {
      setPassword("");
      setErr({ ...err, password: "server" });
      return;
    }
  } else {
    alert("An internal server error occured please refresh and retry");
  }
}
