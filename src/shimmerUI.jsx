const ShimmerUI  =() =>{
    return <div className=" w-screen flex flex-row flex-wrap  justify-evenly mt-5">
    {new Array(12).fill(true).map(()=>{
        return(
        
            <div className="aspect-video w-1/5 bg-slate-300 border-2 my-3 " >

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

export default ShimmerUI