import React, { useState, useEffect } from "react";

const App2 = ({ showLoadingScreen, setUnMount, setShowLoadingScreen }) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const [translateX, setTranslateX] = React.useState(0);
  const [increaseVal, setIncreaseVal] = useState(3);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);

  const handleChange = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    let oldTarget = document.getElementById("target");
    const width = oldTarget.offsetWidth;
    const startX = oldTarget.getBoundingClientRect().left - width;
    const startY = oldTarget.getBoundingClientRect().right - width;
    setLeft(startX - 40);
    setWidth(startY - 40);
    setIsOpened(true);
    setTranslateX(startX - 40);
    console.log(
      "#############",
      startX,
      width,
      startY,
      translateX + 3 > width,
      "#############"
    );
  }, []);

  useEffect(() => {
    if (isOpened) {
      console.log("showLoadingScreen from Trial", showLoadingScreen, left);
      const interval = setInterval(() => {
        let increaseSum =
          translateX + increaseVal > width ? left : translateX + increaseVal;
        console.log("///++++", increaseSum, width);
        setTranslateX(increaseSum);
      }, 100);
      if (showLoadingScreen === -1) {
        if (
          window.visualViewport.width >= 760 &&
          window.visualViewport.width <= 1200
        )
          setIncreaseVal(8);
        else if (window.visualViewport.width < 760) {
          setIncreaseVal(5);
        } else {
          setIncreaseVal(12);
        }
      }
      if (showLoadingScreen === -1 && translateX >= width - 30) {
        console.log("reached here");
        clearInterval(interval);
        setIsOpened(false);

        setUnMount(true);
        setShowLoadingScreen(false);
      }
      return () => clearInterval(interval);
    }
  }, [isOpened, translateX]);
  return (
    <div className="h-screen absolute w-screen flex justify justify-evenly lg:mt-16">
      <div
        id="target"
        className="absolute h-3/5 w-[30%] border-y-4 transition-all  bg-white flex align-middle items-center  opacity-1 border-black"
      >
        {isOpened && (
          <img
            className="h-40 w-40 absolute "
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/115a5246415003.58537fa9604a6.gif"
            style={{ left: `${translateX}px` }}
          ></img>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default App2;
