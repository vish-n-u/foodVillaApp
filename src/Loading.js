import React from "react";

const LoadingScreen = () => {
  return (
    <div>
      <div className="fixed top-20 left-30 w-full h-full flex justify-center items-center  z-50">
        <img
          src="https://cdn.dribbble.com/users/393062/screenshots/14492170/media/67f661f7f825b62980571026e1280675.gif"
          className=" rounded-full  max-h-96 max-w-sm border-t-2 border-b-2 "
        ></img>
      </div>
    </div>
  );
};

export default LoadingScreen;
