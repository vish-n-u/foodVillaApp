import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "../../redux/userNameSlice";
import { GoogleLogin } from "@react-oauth/google";
import { registerViaGoogle } from "../../path.config";
import LoadingScreen from "../../src/Loading";

function GoogleLogins({ setISSigningInUsingGoogle }) {
  const Dispatch = useDispatch();
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  useEffect(() => {
    if (showLoadingScreen) responseMessage();
  }, [showLoadingScreen]);

  const responseMessage = async (response) => {
    const data = await fetch(registerViaGoogle, {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(response),
    });
    const newData = await data.json();
    setShowLoadingScreen(false);
    localStorage.setItem("token", newData.message.token);
    localStorage.setItem("refreshToken", newData.message.refreshToken);
    Dispatch(updateName(newData.message.userName));
    setISSigningInUsingGoogle(true);
  };
  const errorMessage = (error) => {
    alert("An internal server error occured please retry");
    console.log(error);
  };
  return showLoadingScreen ? (
    <LoadingScreen />
  ) : (
    <div className="flex flex-col-reverse lg:flex-row  items-center  lg:mt-3 ">
      <h2 className=" text-lg mt-5 lg:mr-10 lg:mt-0">or </h2>

      <GoogleLogin
        width="280px"
        onSuccess={responseMessage}
        onError={errorMessage}
      />
    </div>
  );
}

export default GoogleLogins;
