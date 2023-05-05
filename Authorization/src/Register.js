import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import GoogleLogins from "./GoogleLogin";
import OTP from "./OTP";
import {
  registerViaGoogle,
  registrationRoute,
  deleteElement,
} from "./utils/constants";
import { UserContext } from "../../app";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
async function onUpload(e, setVal) {
  console.log("e.target.files[0]::----", e.target.files);
  if (e.target.files[0]) {
    console.log("reached");
    const base64 = await toBase64(e.target.files[0]);
    console.log("base64::", base64);
    setVal(base64);
  }
}

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState({
    userNameErr: "",
    userPasswordErr: "",
    userEmailErr: "",
  });
  const [isFormSubmitted, setisFormSubmitted] = useState(false);
  const [val, setVal] = useState(
    "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-5.jpg"
  );
  const [isSigningInUsingGoogle, setISSigningInUsingGoogle] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const pageColour = useContext(UserContext);

  return isSigningInUsingGoogle ? (
    <Navigate to="/" />
  ) : isFormSubmitted ? (
    <OTP
      isFormSubmitted={isFormSubmitted}
      err={err}
      setErr={setErr}
      email={email}
      token={jwtToken}
      userName={userName}
      refreshToken={refreshToken}
    />
  ) : (
    <>
      <div className={`flex align-top flex-wrap mt-10 `}>
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
                  className="border border-black mb-6 m-2 mt-3 w-3/5 pl-2 h-10"
                  placeholder="Username..."
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                ></input>

                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setUserPassword(e.target.value);
                  }}
                  className="border border-black w-3/5 m-2 mb-6 pl-2 h-10"
                ></input>

                <input
                  type="email"
                  placeholder="Email-id"
                  className="border border-black w-3/5 m-2 pl-2 h-10 mb-10"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>

                {err.userEmailErr == 400 ? (
                  <h1>
                    This email is already registered with us try
                    <Link to="/login" className="text-blue-700 underline">
                      logging in
                    </Link>
                  </h1>
                ) : null}
                {!isFormSubmitted ? (
                  <button
                    className="px-5 bg-blue-700 font-medium text-lg py-2 rounded-md mb-5 w-1/2 text-white"
                    onClick={() => {
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
                        setRefreshToken
                      );
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
  setRefreshToken
) {
  const data = {
    userName,
    userPassword,
    email,
  };
  try {
    console.log("final submission");
    const returnData = await fetch(registrationRoute, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        userName,
        password: userPassword,
        email,
        imgLink: val,
      }),
      headers: { "content-type": "application/json" },
    });
    let returnDataJson = await returnData.json();
    console.log(
      returnData,
      "returnData.status",
      returnData.status,
      "returnDataJson",
      returnDataJson,
      "returnData.body",
      returnDataJson.body,
      "returnData.msg",
      returnDataJson.message
    );

    if (returnData.status == 400) {
      setErr({ ...err, userEmailErr: 400 });
      setEmail = "";
      return;
    }
    if (returnData.status == 500) {
      alert("An internal server err occured pls retry");
      return;
    } else {
      sendOTP(
        email,
        setisFormSubmitted,
        returnDataJson,
        setJwtToken,
        userName,
        setRefreshToken
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
  setRefreshToken
) {
  console.log("myEmail:", email, "myTOken", returnDataJson.message.token);
  try {
    let sendOTP = await fetch(
      "http://localhost:7001/otpGenerator/ap1/v1/otps",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ to: email }),
        headers: { "content-type": "application/json" },
      }
    );
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
    }
  } catch (err) {
    console.log(err);
  }
}

export default Register;
