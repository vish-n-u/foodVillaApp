import React, { useEffect, useState } from "react";
import classNames from "classnames";

const MovingImage = () => {
    const [position, setPosition] = useState(0);
    const [closeMoveImg,setCloseMoveImg] = useState(false)
    const [text,setText] = useState("L")
    let arr = "Loading...."
  
    useEffect(()=>{
        if(closeMoveImg){
       let interval =  setInterval(()=>{
            
                let pos = position+1>90?0:position+1
                setPosition(pos)
                setText(text+arr[Math.floor(position/10)])
                if(pos==0) setText("")
            
        },100)
  
        return()=>{
            // console.log("this was called first",closeMoveImg)
            clearInterval(interval)
        }
    }
},[position,closeMoveImg]
    )
  
    const styles = {
      container: "border-black border-2 h-64 w-3/4 ml-10 mt-20 bg-white relative",
      image: "h-20 w-20 absolute top-0 ",
    };
  
    return (
        <>
      <div className={styles.container}>
        <h1 className="mt-12 text-lg">{text}</h1>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/115a5246415003.58537fa9604a6.gif"
          alt="random"
          className={styles.image}
        //   onAnimationIteration={handleAnimationEnd}
          style={{ top: `${position}%` }}
        />
        <div className="text-lg font-semibold text-black">Looaaading...</div>
      </div>
       <button
       className="bg-blue-500 text-white px-4 py-2 rounded"
       onClick={()=>setCloseMoveImg(!closeMoveImg)}
     >
       Move Image
     </button>
     
     </>
    );
  };

export default MovingImage;
