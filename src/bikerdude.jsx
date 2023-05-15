import React, { useState, useEffect } from "react";

const BikeDude = ({showLoadingScreen}) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const [translateX, setTranslateX] = React.useState(0);
  const [translateY,setTranslateY] = React.useState(0)
  const [direction,setDirection] = useState("left")
  const [face,setFace] = useState(0)
  useEffect(() => {
    if (showLoadingScreen) {
      console.log("face",face,showLoadingScreen)
      const interval = setInterval(() => {
        let posX = direction=="left"? (translateX<80?translateX+1:80) :translateX>0?translateX-1:0
         let posY =direction=="top"? (translateY<80?translateY+1:80) :translateY>0?translateY-1:0
         if(direction=="right"||direction=="left"){
          if(direction=="left" && posX==80){setDirection("top") 
          setFace(90)}
          if(direction=="right"&&posX===0) {setDirection("bottom")
          setFace(face+90)}
          setTranslateX(posX)
         }
         else if(direction=="top"||direction=="bottom"){
          if(direction=="top" && posY==80) {setDirection("right")
          setFace(face+90)}
          if(direction=="bottom"&&posY===0) {setDirection("left")
          setFace(0)}
         
          setTranslateY(posY)
         }
         
        
      }, 100);
      return () => clearInterval(interval);
    }
   
  }, [showLoadingScreen, translateX,translateY,direction]);
 
  return (
    <div className="h-screen absolute w-screen flex justify justify-evenly lg:mt-16">
      <div
        id="target"
        className="absolute container w-screen h-3/5 lg:w-[30%]  transition-all  bg-white flex   opacity-1 "
      >
        {showLoadingScreen && (
          <>
          <img
            className={`h-28 w-28 absolute  transform ${direction==="top"&&"rotate-90"} ${direction==="right"&&"rotate-180"}  ${direction==="bottom"&& "-rotate-90"}`}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/115a5246415003.58537fa9604a6.gif"
            style={{ left: `${translateX}%`, top: `${translateY}%` }}
      
          ></img> 
          <div className="h-full w-full flex items-center justify-center align-middle content-centre">
          <h1 className="h-1/2 w-1/2 border-2 border-black">
            <h1>Loading---</h1>
          </h1>
          </div>
          </>
        )}
      </div>
     
    </div>
  );
};

export default BikeDude;
