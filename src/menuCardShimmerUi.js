const MenuCardShimmer = () => {
  let arr = new Array(20).fill(20);

  return (
    <>
      <div
        className="bg-slate-800 lg:items-center lg:justify-center justify-start pb-5 h-56 pt-5 sticky top-0 flex p-4  z-[90] text-yellow-50 w-screen"
        key="header"
      >
        <div className="lg:h-36 md:h-36 h-28  w-2/5 lg:w-1/6 mr-1 lg:mr-5 relative  bg-slate-400"></div>
        <div
          key="underTitle"
          className="relative w-4/5 lg:w-1/5  flex flex-col "
        >
          <div className="font-semibold bg-slate-400 mt-1 h-10 lg:text-3xl p-3 pl-0"></div>
          <span className="bg-slate-400 h-5 w-1/3 mt-1"></span>
          <ul key="otherElem" className="flex justify-evenly mt-2  pl-0 pt-2">
            <div className="bg-slate-400 mt-1 h-5 w-1/3">
              {/* <div className="font-light text-sm bg-slate-400 h-5 w-1/3"></div> */}
            </div>
            <div className="bg-slate-400 h-5 mt-1 w-1/3"></div>
            <div className="bg-slate-400 mt-1 h-5 w-1/3"></div>
          </ul>
        </div>
      </div>
      <div className="w-full  flex justify-center items-center ">
        <div className="lg:w-3/4 w-screen flex flex-col justify-center  items-center">
          <div className="w-full lg:w-1/2  mt-20 flex h-10 justify-center items-center   lg:bg-slate-400"></div>
          {arr.map((index) => {
            return (
              <div
                key={index}
                className=" w-screen lg:w-full   justify-between flex lg:p-2 m-5 lg:bg-gray-500  border-b-2  "
              >
                <div
                  className={`flex flex-col pl-4 w-3/5 lg:w-2/5 md:w-2/5 justify-between  z-[20] `}
                >
                  {<div></div>}
                  <h2 className="font-bold lg:m-2 m-1 lg:w-full w-1/2  h-3  lg:h-10 text-lg bg-gray-500">
                    {}
                  </h2>
                  <h3 className="font-bold w-8 m-1 lg:m-2 lg:h-5 text-lg bg-gray-500"></h3>
                  <span className="overflow-hidden lg:m-2 lg:h-8 text-lg bg-gray-500"></span>
                </div>
                <div className="h-36 w-4/5 md:w-1/4 mt-4 lg:w-1/6 bg-slate-200"></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenuCardShimmer;
