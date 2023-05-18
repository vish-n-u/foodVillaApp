import React, { useState, useEffect } from "react";
import { getWidth } from "./constants";
import  "../bikerDude.css"
import { updateOrderDetails } from "../path.config";


async function updateData(id){
  console.log("bikerDudeId========",id)
  const data = await fetch(updateOrderDetails,{
    mode: "cors",
    method:"PUT",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({id:id,
      token:localStorage.getItem("token"),
      refreshToken:localStorage.getItem("refreshToken"),})
  })
  if(data.status!==200){
    alert("internal server error! please retry ordering ")
  }
  return "success"
}


// import React, { useEffect, useState } from 'react';

const FullScreenDiv = () => {
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    // Delay showing the div for 1 second to allow for transition effect
    const timeout = setTimeout(() => {
      setShowDiv(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex-col flex items-center justify-center bg-red-500 text-white transform transition-transform duration-[3000ms] ${
        showDiv ? 'scale-100' : 'scale-0'
      }`}
    >
      <div className="lg:text-3xl text-2xl font-semibold block">Your Delivery partner had an accident!</div>
      <div className="lg:text-2xl text-lg mt-4 ">Your order has been cancelled!</div>
    </div>
  );
};


const ShowCooking  =({showCooking,setShowCooking,setIsOpened})=>{
useState(()=>{
  if(showCooking){
    setTimeout(()=>{
     setShowCooking(false) 
     setIsOpened(true)
    },5000)
  }
},[])

return <div className="h-screen w-screen flex flex-col  lg:align-middle items-center ">
<div className="lg:text-2xl text-lg font-serif font-semibold text-orange-700 mb-2">Your Food is being prepared......</div>
<img alt="cooking.gif" className="h-1/3 bg-slate-600 lg:w-1/3 w-1/2 mb-20  lg:mb-60" src="https://media4.giphy.com/media/gg8Q0J4HD2rFm5LTHe/giphy.gif?cid=6c09b952532df19a09a6d7c0f18c372543c1fa54a58f39fc&ep=v1_internal_gifs_gifId&rid=giphy.gif&ct=g"></img>
</div>
}

const BikeDude = ({showLoadingScreen,id}) => {
  const [showCooking,setShowCooking] = useState(true)
  const [isOpened, setIsOpened] = React.useState(false);
  const [translateX, setTranslateX] = React.useState(0);
  const [translateY,setTranslateY] = React.useState(0)
  const [direction,setDirection] = useState("left")
  const [face,setFace] = useState(0)
  const [incresePos,setIncreasePos] = useState(0)
  const [increasePercentage,setIncreasePercentage] = useState(1)
  console.log(showLoadingScreen,typeof showLoadingScreen=="undefined")
  const [hasAccidentHappened,setHasAccidentHappened] = useState(false)
  useEffect(() => {
    if (showLoadingScreen||isOpened) {
      // console.log("face",face,showLoadingScreen)
      let maxWidth =  getWidth()
      maxWidth = maxWidth>1024?90:maxWidth<1024&&maxWidth>768?80:70
      const interval = setInterval(() => {
        let posX = direction=="left"? (translateX<maxWidth?translateX+increasePercentage:maxWidth) :translateX>0?translateX-increasePercentage:0
         let posY =direction=="top"&&translateY<incresePos+10?translateY+increasePercentage:incresePos+10 
         if(posX>=maxWidth&&posY>=70) {setIsOpened(false)
          window.location.href = '/' 
      window.open("/")
        alert("Delivery partner has reached your location")}
         if(increasePercentage>5){
          setTranslateY(translateY-2)
          if(direction=="right") setTranslateX(translateX-2)
          if(direction=="left") setTranslateX(translateX+2)
          
          if((translateX>=maxWidth||translateX<=0) &&translateY<=0){ setIsOpened(false)
          setHasAccidentHappened(true)
        }
        }
      
         
         else if(direction=="right"||direction=="left"){
          
          if(direction=="left" && posX===maxWidth){
          setDirection("top") 
          setIncreasePos(incresePos+15)
          setFace(90)}
          else if(direction=="right"&&posX===0) {
            setDirection("top")
          setFace(face+90)
          setIncreasePos(incresePos+15)
        }
          setTranslateX(posX)
         }
         else if(direction==="top"){
          // console.log(direction,posY,translateX)
          if(direction==="top" && posY===incresePos+10 &&translateX==maxWidth) {setDirection("right")
          setFace(face+90)}
          if(direction=="top"&&translateX===0&& posY==incresePos+10) {setDirection("left")
          setFace(0)}
         
          setTranslateY(posY)
         }
         
        
      }, 100);
      return () => clearInterval(interval);
    }
 
    
   
  }, [showLoadingScreen,isOpened, translateX,translateY,direction]);
  useEffect(()=>{
    if(increasePercentage==5) alert("Dont speed up anymore!It may cause an accident")
  },[increasePercentage])
useEffect(()=>{
  if(hasAccidentHappened){
    updateData(id)
    setTimeout(()=>{
      window.location.href = '/' // can have a state variable to check whether the request has been completed and based on that set the alert
      window.open("/")
    },7000)
  }
},[hasAccidentHappened])
  return (
    showCooking?<ShowCooking showCooking={showCooking} setIsOpened={setIsOpened} setShowCooking={setShowCooking}/>:
    <div className="h-screen absolute w-screen   justify-between justify  lg:mt-16">
      <div
         id="target"
        className="absolute container w-screen  h-3/5 lg:w-10/12  transition-all    justify-center items-center   "
      > {
        hasAccidentHappened&&
        <FullScreenDiv/>
      }
        {isOpened&& (
          <div className="flex flex-col ">
          <div className="lg:-top-[10%]  lg:left-[50%] font-serif lg:font-semibold text-xl lg:text-2xl absolute z-50 flex justify-center text-red-700">Your food is out for Delivery...</div>
          <img
          className={`h-28 w-28 lg:h-36  lg:w-36 absolute   transform ${increasePercentage>5?"rotating-image-container":""} ${increasePercentage<=5&&direction === 'top' ? 'rotate-90' : ''} ${direction === 'right' ? 'scale-x-[-1]' : ''}`}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/115a5246415003.58537fa9604a6.gif"
            
          style={{left:`${translateX}%` ,top:`${translateY}%`  }}
          ></img> 
          </div>
        )}
         {!hasAccidentHappened&&<img id="destination" style={{bottom:"0" ,right:`0`}} alt="location/img" className="absolute h-10 w-10" src="https://media.tenor.com/6utC7ZK8iJkAAAAC/location-red.gif"></img>}
      </div>
      {/* <button className="bg-black h-5 absolute  text-white" onClick={()=>setIsOpened(!isOpened)}>{"click me"}</button> */}
    {!hasAccidentHappened&&<button className="bg-orange-500 p-4 shadow-md rounded-lg text-lg left-[50%] bottom-60 absolute text-white" onClick={()=>setIncreasePercentage(increasePercentage+2)}>increaseSpeed</button>}
    </div>
  );
};

export default BikeDude;
