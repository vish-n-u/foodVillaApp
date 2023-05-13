import React from "react";

let arr = new Array(5).fill(10);
const PreviousOrderShimmer = () => {
  return (
    <div
      className={`flex flex-col flex-wrap lg:w-1/2 mt-16  w-11/12 align-top justify-between items-center  border-2 lg:h-3/4 h-full`}
    >
      {arr.map((rs, index) => (
        <div
          key={index}
          className="w-full border-2 lg:p-4 p-2 border-black flex"
        >
          <div className="h-24 w-32 bg-gray-500"></div>
          <div className="w-full lg:p-4 h-6 lg:m-3 m-2 bg-gray-400"></div>;
        </div>
      ))}
    </div>
  );
};
export default PreviousOrderShimmer;
