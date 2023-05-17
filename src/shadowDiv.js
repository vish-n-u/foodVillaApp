import React from "react";

const ShadowDiv = () => {
  return (
    <div className="relative">
      <div className="h-48 w-48 bg-gray-300 shadow-md"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-25"></div>
    </div>
  );
};

export default ShadowDiv;
