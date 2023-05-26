import React from "react";

let arr = new Array(4).fill(10);
const PreviousOrderShimmer = () => {
  return (
    <div
      className={`flex animate-pulse h-screen  lg:w-full flex-col flex-wrap  mt-16  w-11/12 align-top justify-between items-center  border-2 lg:h-3/4 `}
    >
      {arr.map((rs, index) => (
        <div
          key={index}
          className="w-full border-2 h-1/5 animate-pulse bg-gray-800 lg:p-4 p-2 border-black flex"
        >
          ;
        </div>
      ))}
    </div>
  );
};
export default PreviousOrderShimmer;
