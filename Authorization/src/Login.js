import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Emailpage from "./Emailpage";
import { loginRoute } from "./utils/constants";
import { validateEmail } from "./utils/helper";
import { updateName } from "../../redux/userNameSlice";

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
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [isLoginUsingOtp, setIsLoginUsingOtp] = useState(false);
  const Dispatch = useDispatch();
  return successfulLogin ? (
    <Navigate to="/" />
  ) : noOfSubmits <= 3 && !isLoginUsingOtp ? (
    <div className="flex  flex-col justify-center items-center align-middle  h-screen bg-slate-100">
      <div className="border-2  border-black flex flex-col w-11/12 content-center   bg-blue-50 h-fit rounded-xl justify-center items-center align-middle lg:w-1/3">
        <h1 className="text-xl font-semibold m-2"> Hey welcome back!</h1>

        <img
          className="h-28 w-28  m-4 rounded-full"
          src={
            profileImgSrc ||
            "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-5.jpg"
          }
        ></img>
        <div className="flex flex-col mt-5 items-center">
          <input
            onChange={(e) => {
              if (err.userEmail != "") {
                setErr({ ...err, userEmail: "" });
              }
              setUserEmail(e.target.value);
              if (!validateEmail(e.target.value) && e.target.value.length > 0) {
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
          <span className="mb-2 p-2 text-lg font-normal">Email-Id </span>
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
          <span className="mb-1  p-2 text-lg font-normal">password</span>
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
              onSubmit(
                userEmail,
                setUserEmail,
                password,
                setPassword,
                err,
                setErr,
                setProfileImgSrc,
                setSuccessfulLogin,
                Dispatch
              );
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
  Dispatch
) {
  let data = await fetch(loginRoute, {
    method: "POST",
    mode: "cors",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ userEmail, password }),
  });
  let dataJson = await data.json();
  
  if (data.status == 200) {
    setProfileImgSrc(dataJson.message.imgLink);
    Dispatch(updateName(dataJson.message.userName));
    setSuccessfulLogin(true);

    localStorage.setItem("token", dataJson.message.token);
    localStorage.setItem("refreshToken", dataJson.message.refreshToken);
    return;
  }
  if (data.status == 404) {
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