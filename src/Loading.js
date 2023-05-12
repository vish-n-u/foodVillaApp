import React from "react";

const LoadingScreen = () => {
  return (
    <div>
      (
      <div className="fixed top-40 left-30 w-full h-full flex justify-center items-center bg-gray-100 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      )
    </div>
  );
};

export default LoadingScreen;
