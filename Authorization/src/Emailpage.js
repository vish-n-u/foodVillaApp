import React from "react";
import { useState } from "react";
import OTP from "./OTP";
import { loginRoute } from "./utils/constants";
import { validateEmail } from "./utils/helper";
const Emailpage = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState({ err: false, message: "", otp: "" });
  const [invalidEmail, setInvalidEmail] = useState({});
  const [otpSent, setIsOtpSent] = useState(false);
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userName, setUserName] = useState("");
  console.log("invalidEmail", invalidEmail);
  return otpSent ? (
    <OTP
      err={err}
      setErr={setErr}
      email={email}
      token={token}
      userName={userName}
      refreshToken={refreshToken}
    />
  ) : (
    <div className="w-full h-screen bg-red-200  ">
      <div className="flex flex-col  h-5/6 w-full flex-wrap items-center align-middle justify-center content-center">
        <span className="text-lg">Please provide your registered email-id</span>
        <div className="border border-black w-11/12   p-2 m-2  h-2/3  flex flex-col align-middle justify-center content-center items-center bg-blue-100 rounded-lg md:w-1/3 lg:w-1/3 md:h-1/2 lg:h-1/2">
          <input
            className={`w-3/5 h-10 pl-2 m-4 border border-black ${
              err ? "mb-0" : "mb - 4"
            }`}
            value={email}
            placeholder="Email-Id..."
            onChange={(e) => {
              setEmail(e.target.value);

              if (!validateEmail(e.target.value)) {
                if (!err.err) {
                  console.log("regeX");
                  setErr({ err: true, message: "" });
                }
              } else if (invalidEmail[e.target.value]) {
                console.log("invalidEmail", invalidEmail);
                setErr({ err: true, message: "email" });
              } else {
                if (err.err) {
                  console.log("reached");
                  setErr({ err: false, message: "" });
                }
                console.log(email, err);
              }
            }}
          ></input>

          {err.err && err.message.length == 0 && email.length > 0 ? (
            <p className="text-red-600 mb-4 mt-1">Invalid Email</p>
          ) : invalidEmail[email] ? (
            <p className="text-red-600 mb-4 mt-1">
              email-id isn't registered with us , please register or provide a
              registered email-id
            </p>
          ) : null}
          <button
            className={`p-2 m-2 mt-5 py-3 w-2/6 rounded-lg  text-white text-lg font-semibold bg-blue-700 ${
              err.err ? "cursor-not-allowed" : "cursor-pointer"
            } `}
            onClick={() => {
              if (err.err) return;
              verifyUser(
                email,
                setErr,
                invalidEmail,
                setInvalidEmail,
                setIsOtpSent,
                setToken,
                setUserName,
                setRefreshToken
              );
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const verifyUser = async (
  email,
  setErr,
  invalidEmail,
  setInvalidEmail,
  setIsOtpSent,
  setToken,
  setUserName,
  setRefreshToken
) => {
  const data = await fetch(loginRoute, {
    method: "POST",
    mode: "cors",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, requestFor: "otpBased" }),
  });
  console.log(data);
  const dataJson = await data.json();

  if (data.status == 404) {
    console.log("data---", data);
    setErr({
      err: true,
      message: "email-id isn't registered with us , please try logging in",
    });
    setInvalidEmail({ ...invalidEmail, [email]: true });
    return;
  }
  if (data.status == 500) {
    alert("A server err occured please retry");
    return;
  } else {
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
      if (data.status == 500) {
        alert("A server err occured please retry");
      } else if (data.status == 200) {
        console.log(dataJson, "from emailPage");
        setToken(dataJson.message.token);
        setRefreshToken(dataJson.message.refreshToken);
        setUserName(dataJson.message.userName);
        setIsOtpSent(true);
      }
    } catch (err) {
      alert("A server err occured please retry");
    }
  }
};

export default Emailpage;
