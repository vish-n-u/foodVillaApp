import { restaurantImg_CDN_Link } from "./constants"
import { UserContext } from "../app";
import { useContext, useState } from "react";
const { Link } = require("react-router-dom");


const RestaurantCard = ({cloudinaryImageId:img,name,avgRating:rating,deliveryTime,cuisines,costForTwoString:cost,id}) =>{
    const pageColour = useContext(UserContext)
    return (
          
        <div className={`aspect-square w-64 lg:m-4 mb-4 mt-0 rounded-md     p-3  transition  ${pageColour == "white" ? "bg-white hover:shadow-md border-gray-200  border hover:border-gray-300 hover:shadow-gray-500 " : "bg-black  text-white border-gray-800  border hover:border-orange-900 shadow-md hover:shadow-white"}   `} key="restaurantCard">
            <Link to={"/menucard/"+id }>
            <img src={restaurantImg_CDN_Link+img} className=" mb-2 w-56  rounded-md" key ="img" ></img>
            <h2 className="  text-base mb-1 align-middle justify-center ">{name}</h2>
            <h4 id ="cuisines" className="flex text-[12px]">{cuisines.join(", ")}</h4>
            <ul  key="restElem" className="flex font-medium text-[13px] justify-between mt-3">
                <li className={`${rating>=4?"bg-green-600":"bg-orange-700"} text-white  px-2`} key="rating">{rating+"⭐"}</li>
                <li key="deliveryTime">{deliveryTime+"min"}</li>
                <li key="cost">{cost}</li>
            </ul>
            </Link>
        </div>
       

    )
}

export default RestaurantCard