import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import OTP from "./OTP";
import {
  registrationRoute,
  deleteElement,
  authenticateUserAndGetData,
} from "./utils/constants";

async function getData(setUserName, setImgVal, setEmail) {
  const data = await fetch(authenticateUserAndGetData, {
    method: "POST",
    mode: "cors",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token: localStorage.getItem("token") }),
  });
  const dataJson = await data.json();
  console.log("----DATAjSON-----", dataJson);
  if (data.status == 200) {
    setImgVal(dataJson.message.imgLink);
    setUserName(dataJson.message.userName);
    setEmail(dataJson.message.email);
    return;
  }
  if (data.status == 500) {
    alert("Internal server err , please refresh");
    return;
  }
}

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

const ProfileUpdatePage = () => {
  const [userName, setUserName] = useState("userName");
  const [userPassword, setUserPassword] = useState("password");
  const [email, setEmail] = useState("email-id");
  const [err, setErr] = useState({
    userNameErr: "",
    userPasswordErr: "",
    userEmailErr: "",
  });
  const [isFormSubmitted, setisFormSubmitted] = useState(false);
  const [imgVal, setImgVal] = useState(
    "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-5.jpg"
  );

  useEffect(() => {
    getData(setUserName, setImgVal, setEmail);
  }, []);
  return (
    <>
      <div className="flex flex-col bg-slate-200 h-screen items-center content-center  align-middle lg:flex lg:flex-row lg:justify-evenly">
        <div className="w-screen flex-col mt-2 justify-start items-center flex  mb-7 lg:w-1/2 lg:justify-center">
          <div className="border-2 w-11/12 border-black mt-5   bg-blue-50 h-fit rounded-xl lg:w-3/5">
            <div className="flex flex-col content-center align-middle justify-center items-center">
              <div>
                <div className="font-semibold mb-2 ml-6  text-3xl mt-5 font-white ">
                  Update Profile
                </div>
              </div>
              <div className="flex flex-col justify-center items-center align-middle content-center">
                <label htmlFor="avatar">
                  <img
                    className="h-28 w-28 ml-10  m-2 cursor-pointer rounded-full "
                    src={imgVal}
                  ></img>
                  <span className="text-slate-600">
                    Click on icon to upload img
                  </span>
                </label>
              </div>
              <input
                id="avatar"
                name="avatar"
                type="file"
                className="hidden"
                onChange={(e) => {
                  onUpload(e, setImgVal);
                }}
              ></input>
            </div>
            <div className="flex flex-col items-center h-full  w-full">
              <input
                className="border border-black mb-6 m-2 mt-3 w-3/5 pl-2 h-10"
                placeholder={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></input>

              <input
                type="password"
                placeholder={"change password"}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                className="border border-black w-3/5 m-2 mb-6 pl-2 h-10"
              ></input>

              <input
                type="email"
                placeholder={email}
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
                  className="px-5 bg-blue-700 py-2 rounded-md mb-5 w-1/2"
                  onClick={() => {
                    handleClick(
                      userName,
                      userPassword,
                      email,
                      setErr,
                      setEmail,
                      setisFormSubmitted,
                      err,
                      imgVal
                    );
                  }}
                >
                  Submit
                </button>
              ) : null}
            </div>
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
  val
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
    let returnDataJson = returnData.json();
    console.log(returnData, "returnData.status", returnData.status);

    if (returnData.status == 400) {
      setErr({ ...err, userEmailErr: 400 });
      setEmail = "";
      return;
    }
    if (returnData.status == 500) {
      alert("An internal server err occured pls retry");
      return;
    } else {
      await sendOTP(email, setisFormSubmitted, returnDataJson);
    }
  } catch (err) {
    console.log(err);
    alert("An internal server err occured pls retry");
  }
}

async function sendOTP(email, setisFormSubmitted, returnDataJson) {
  console.log("myEmail:", email);
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
    }
    setisFormSubmitted(true);
    localStorage.setItem("token", returnDataJson.message.token);
  } catch (err) {
    console.log(err);
  }
}

export default ProfileUpdatePage;
