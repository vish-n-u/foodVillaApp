import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const LoginUsingOtp = () => {
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  return (
    <div className="flex justify-center items-center align-middle h-screen">
      <div className="flex flex-col w-1/3 h-fit  bg-blue-50 border border-black justify-center items-center">
        <input
          value={otp}
          className="m-2 mb-1 p-2 w-2/5"
          onChange={(e) => setOtp(e.target.value)}
        ></input>
        <h1 className="m-2 mt-0 p-2 "> otp</h1>
        <button className="m-2 p-2 w-3/5 bg-blue-700">Submit</button>
      </div>
    </div>
  );
};

export default LoginUsingOtp;
