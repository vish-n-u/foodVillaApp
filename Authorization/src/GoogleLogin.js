import React from "react";
import { useDispatch } from "react-redux";
import { updateName } from "../../redux/userNameSlice";
import { GoogleLogin } from "@react-oauth/google";
import { registerViaGoogle } from "./utils/constants";

function GoogleLogins({ setISSigningInUsingGoogle }) {
  const Dispatch = useDispatch();
  const responseMessage = async (response) => {
    const data = await fetch(registerViaGoogle, {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(response),
    });
    const newData = await data.json();

    localStorage.setItem("token", newData.message.token);
    localStorage.setItem("refreshToken", newData.message.refreshToken);
    Dispatch(updateName(newData.message.userName));
    setISSigningInUsingGoogle(true);
  };
  const errorMessage = (error) => {
    alert("An internal server error occured please retry");
    console.log(error);
  };
  return (
    <div className="flex flex-col   items-center  lg:mt-3 ">
      <h2 className=" text-lg ">or </h2>

      <GoogleLogin
        width="280px"
        onSuccess={responseMessage}
        onError={errorMessage}
      />
    </div>
  );
}

export default GoogleLogins;
