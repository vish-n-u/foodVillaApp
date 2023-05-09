const RestaurantCardShimmerUI  =() =>{
    return <div className=" w-screen flex flex-row flex-wrap  justify-evenly mt-5">
    {new Array(12).fill(true).map((x,index)=>{
        return(
        
            <div key={index} className="aspect-square w-80 lg:m-4 mb-4 mt-0 p-3  border-2 my-3 " >
                <div className="aspect-video mb-2 w-72 bg-slate-300"> </div>
                <div className="font-semibold bg-slate-400 text-lg mb-2 w-2/3 h-5 align-middle justify-center "></div>
            <h4 id ="cuisines" className="flex bg-slate-400 w-2/3 h-5"></h4>
            <ul  key="restElem" className="flex bg-slate-400 justify-between mt-5 w-full h-5">
                <li key="rating" ></li>
                <li key="deliveryTime" ></li>
                <li key="cost" > </li>
            </ul>
        </div>
        )
    })}
    </div>
}
// style={{height:"350px",
//         width:"300px",
//         padding: "8px",
//         display: "inline-block",
//         margin: "10px",
//         contain:"content",
//         border:"2px solid black"
//         }

export default RestaurantCardShimmerUI