import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import LoadingScreen from "../../src/Loading";
import BikeDude from "../../src/bikerdude";
import GoogleLogins from "./GoogleLogin";
import {
  otpGenerator,
  registerViaGoogle,
  registrationRoute,
  deleteElement,
  loginRoutes,
} from "../../path.config";

import App2 from "../../src/trial";
import { validateEmail } from "./utils/helper";
import OTP from "./OTP";
import { UserContext } from "../../app";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState({
    userNameErr: "",
    userPasswordErr: "",
    userEmailErr: "",
  });
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [isFormSubmitted, setisFormSubmitted] = useState(false);
  const [val, setVal] = useState(
    "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-5.jpg"
  );
  const [isSigningInUsingGoogle, setISSigningInUsingGoogle] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [attemptedMails, setAttemptedMails] = useState({});
  const pageColour = useContext(UserContext);
  const [unMount, setUnMount] = useState(false);

  useEffect(() => {
    function onEnter(e) {
      console.log("ENTER HAS BEEN PRESSDE", e, e.key);
      if (e.key === "Enter") {
        setShowLoadingScreen(true);
      }
    }
    const targetElement = document.getElementById("register");
    targetElement.addEventListener("keypress", onEnter);
    return () => {
      console.log("Component unmounted");
      targetElement.removeEventListener("keypress", onEnter);
    };
  }, []);
  console.log(err, "=====");

  useEffect(() => {
    console.log(" useEffect register handleclick called", showLoadingScreen);
    if (showLoadingScreen === true) {
      handleClick(
        userName,
        userPassword,
        email,
        setErr,
        setEmail,
        setisFormSubmitted,
        err,
        val,
        setJwtToken,
        setRefreshToken,
        setShowLoadingScreen
      );
    }
  }, [showLoadingScreen]);
  console.log("=====", showLoadingScreen, unMount, "=======");
  return showLoadingScreen ? (
    <BikeDude showLoadingScreen={showLoadingScreen} />
  ) : isSigningInUsingGoogle ? (
    showLoadingScreen === false && <Navigate to="/" />
  ) : isFormSubmitted ? (
    showLoadingScreen === false && (
      <OTP
        isFormSubmitted={isFormSubmitted}
        err={err}
        setErr={setErr}
        email={email}
        token={jwtToken}
        userName={userName}
        refreshToken={refreshToken}
      />
    )
  ) : (
    <>
      <div id="register" className={`flex align-top flex-wrap mt-10 `}>
        <div
          className={`h-3/4 w-screen flex  flex-col-reverse items-center justify-center content-center lg:flex lg:flex-row lg:justify-evenly ${
            pageColour == "white" ? "" : "bg-black border  text-white"
          }`}
        >
          <div className="w-screen flex-col mt-2 justify-start items-center flex  mb-7 lg:w-1/2 lg:justify-center lg:align-middle lg:content-center ">
            <div
              className={`border-2 w-11/12 border-black mt-5     rounded-xl lg:w-3/5 ${
                pageColour == "white"
                  ? "bg-blue-50"
                  : "bg-black border-white text-white"
              }`}
            >
              <div className="flex flex-col content-center  align-middle justify-center items-center">
                <div>
                  <div className="font-semibold mb-2 ml-6  text-3xl mt-5 font-white ">
                    Sign up
                  </div>
                  <h1 className=" text-slate-500 mb-5">Create a new account</h1>
                </div>
              </div>
              <div className="flex flex-col items-center h-full text-black  w-full">
                <input
                  className={`border border-black mb-6 m-2 mt-3 w-3/5 pl-2 h-10 ${
                    err.userNameErr ? "mb-0" : ""
                  }`}
                  placeholder="Username..."
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (err.userNameErr !== "") {
                      setErr({ ...err, userNameErr: "" });
                    }
                  }}
                ></input>
                {err.userNameErr ? (
                  <span className="text-red-500 mb-5">{err.userNameErr}</span>
                ) : null}

                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setUserPassword(e.target.value);
                    if (err.userPasswordErr !== "") {
                      setErr({ ...err, userPasswordErr: "" });
                    }
                  }}
                  className={`border border-black mb-6 m-2 mt-3 w-3/5 pl-2 h-10 ${
                    err.userPasswordErr ? "mb-0" : ""
                  }`}
                ></input>
                {err.userPasswordErr ? (
                  <span className="text-red-500 mb-5">
                    {err.userPasswordErr}
                  </span>
                ) : null}
                <input
                  type="email"
                  placeholder="Email-id"
                  className={`border border-black mb-6 m-2 mt-3 w-3/5 pl-2 h-10 ${
                    err.userEmailErr ? "mb-0" : ""
                  }`}
                  onChange={(e) => {
                    if (err.email != "") {
                      setErr({ ...err, userEmailErr: "" });
                    }
                    setEmail(e.target.value);
                    if (
                      !validateEmail(e.target.value) &&
                      e.target.value.length > 0
                    ) {
                      setErr({ ...err, userEmailErr: "Invalid Email" });
                    }
                  }}
                ></input>

                {err.userEmailErr == 400 || attemptedMails[email] ? (
                  <h1 className="text-red-500  mb-5">
                    This email is already registered with us try
                    <Link to="/login" className="text-blue-700 underline">
                      logging in
                    </Link>
                  </h1>
                ) : err.userEmailErr == "Invalid Email" ? (
                  <h1 className="text-red-500">Invalid Email</h1>
                ) : (
                  ""
                )}
                {!isFormSubmitted ? (
                  <button
                    className={`px-5 bg-blue-700 font-medium text-lg py-2 rounded-md mb-5 w-1/2 text-white ${
                      err.userEmailErr !== "" ||
                      err.userNameErr !== "" ||
                      err.userPasswordErr !== ""
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => {
                      setShowLoadingScreen(true);
                    }}
                  >
                    Submit
                  </button>
                ) : null}
              </div>
            </div>
            <h1 className="mt-2 text-lg">
              Already registered
              <Link to="/login" className="text-blue-700 ">
                <span> Login now</span>
              </Link>
            </h1>
          </div>
          <div className="h-fit w-fit">
            <GoogleLogins
              setISSigningInUsingGoogle={setISSigningInUsingGoogle}
            />
          </div>
        </div>
      </div>
    </>
  );
};

async function handleClick(
  userName,
  userPassword,
  email,
  setErr,
  setEmail,
  setisFormSubmitted,
  err,
  val,
  setJwtToken,
  setRefreshToken,
  setShowLoadingScreen,
  showLoadingScreen
) {
  console.log("handleSubmit called", err.userNameErr, showLoadingScreen);
  if (err.userNameErr || err.userPasswordErr || err.userEmailErr) {
    return;
  }
  if (!userName) {
    setErr({ ...err, userNameErr: "UserName can't be empty" });
    return;
  }
  if (!userPassword) {
    setErr({ ...err, userPasswordErr: "password can't be empty" });
    return;
  }
  if (!email) {
    setErr({ ...err, userEmailErr: "email can't be empty" });
    return;
  }

  try {
    const returnData = await fetch(registrationRoute, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        userName,
        password: userPassword,
        email,
        imgLink: val,
      }),
      headers: { "content-type": "application/json" },
    });
    let returnDataJson = await returnData.json();
    console.log("showLoadingScreen", showLoadingScreen);

    if (returnData.status == 400) {
      setErr({ ...err, userEmailErr: 400 });
      setEmail("");
      setShowLoadingScreen(false);
      return;
    }
    if (returnData.status == 500) {
      alert("An internal server err occured pls retry");
      setShowLoadingScreen(false);
      return;
    } else {
      sendOTP(
        email,
        setisFormSubmitted,
        returnDataJson,
        setJwtToken,
        userName,
        setRefreshToken,
        setShowLoadingScreen
      );
    }
  } catch (err) {
    console.log(err);
    alert("An internal server err occured pls retry");
  }
}

async function sendOTP(
  email,
  setisFormSubmitted,
  returnDataJson,
  setJwtToken,
  userName,
  setRefreshToken,
  setShowLoadingScreen
) {
  console.log("myEmail:", email, "myTOken", returnDataJson.message.token);
  try {
    let sendOTP = await fetch(otpGenerator, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ to: email }),
      headers: { "content-type": "application/json" },
    });
    console.log("sendOTP:", sendOTP, sendOTP.status);

    if (sendOTP.status !== 200) {
      const returnData = await fetch(deleteElement, {
        method: "DELETE",
        mode: "cors",
        body: JSON.stringify({ email }),
        headers: { "content-type": "application/json" },
      });

      localStorage.clear();
      return;
    } else {
      console.log("OTP VERIFICATION SUCESS", returnDataJson.message.token);
      setisFormSubmitted(true);
      setJwtToken(returnDataJson.message.token);
      setRefreshToken(returnDataJson.message.refreshToken);
      setShowLoadingScreen(false);
    }
  } catch (err) {
    console.log(err);
  }
}

export default Register;
