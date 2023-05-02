import React from "react";
import { useState, useEffect } from "react";
import { Redirect, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateName } from "../../redux/userNameSlice";
const OTP = ({ err, setErr, email, token, userName, refreshToken }) => {
  console.log(token);
  let [timerSec, setTimerSec] = useState(20);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState(false);
  const [resubmitted, setResubmitted] = useState(0);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const Dispatch = useDispatch();
  useEffect(() => {
    if (timerSec == 0) return;
    let interval = setInterval(() => {
      setTimerSec(timerSec--);

      if (timerSec == -1) {
        clearInterval(interval);
        return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [resubmitted]);
  console.log("--------err", err);

  return resubmitted > 3 ? (
    <Navigate to="/" replace={true} />
  ) : isRegistrationComplete ? (
    <div>
      <Navigate to="/" />
    </div>
  ) : (
    <div className=" justify-center align-middle w-screen ">
      <div className="mt-5 border border-black  justify-center w-11/12  lg:w-1/3 h-fit">
        <div className="flex flex-col justify-center">
          <span className="ml-10 mb-10 font-semibold text-lg inline">
            verifyOtp
          </span>
          <input
            className="mb-3 border-2 border-black p-2 "
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="otp..."
          ></input>
          {otpErr ? <h1 className="text-red-400">Incorrect otp</h1> : null}
          {timerSec > 0 ? (
            <div className="flex flex-col items-center">
              <button
                className="p-2 mb-5 bg-blue-600 rounded-lg w-1/3 active:bg-blue-800"
                onClick={() =>
                  handleSubmit(
                    otp,
                    otpErr,
                    setOtpErr,
                    setIsRegistrationComplete,
                    email,
                    token,
                    userName,
                    Dispatch,
                    refreshToken
                  )
                }
              >
                Submit
              </button>
              <h1 className="mb-5">Enter otp within {timerSec + "s"}</h1>
            </div>
          ) : (
            <h1
              className="cursor-pointer text-blue-900 underline "
              onClick={async () => {
                console.log("-----", email);
                let finalSubmit = await fetch(
                  "http://localhost:7001/otpGenerator/ap1/v1/otps",
                  {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({ to: email }),
                    headers: { "content-type": "application/json" },
                  }
                );
                setTimerSec(30);
                setResubmitted(resubmitted + 1);
                setOtpErr(false);
              }}
            >
              resend otp
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTP;

async function handleSubmit(
  otp,
  otpErr,
  setOtpErr,
  setIsRegistrationComplete,
  email,
  token,
  userName,
  Dispatch,
  refreshToken
) {
  console.log("finalSubmit");
  const isOtpCorrect = await fetch(
    "http://localhost:7001/otpGenerator/ap1/v1/verifyOtp",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email, otp }),
      headers: { "content-type": "application/json" },
    }
  );
  console.log("isOtpCorrect:", isOtpCorrect);
  if (isOtpCorrect.status != 200) {
    // setErr({
    //   ...err,
    //   otp: "incorrect otp",
    // });
    setOtpErr(true);
    console.log("++++++", otp, "+++++++++");
    return;
  }
  if (isOtpCorrect.status == 500) {
    alert("internal server err");
    return;
  } else {
    console.log("this is token", token);
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    Dispatch(updateName(userName));
    setIsRegistrationComplete(true);

    return;
  }
}
