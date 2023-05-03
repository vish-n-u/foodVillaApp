import { restaurantImg_CDN_Link } from "./constants"
const { Link } = require("react-router-dom");


const RestaurantCard = ({cloudinaryImageId:img,name,avgRating:rating,deliveryTime,cuisines,costForTwoString:cost,id}) =>{
    return (
          
        <div className="aspect-square w-80 lg:m-4 mb-4 mt-0 bg-white   overflow-hidden p-3  hover:transition   hover:shadow-sm hover:shadow-slate-800" key="restaurantCard">
            <Link to={"/menucard/"+id }>
            <img src={restaurantImg_CDN_Link+img} className="aspect-video mb-2 w-72" key ="img" ></img>
            <h2 className="font-semibold  text-lg mb-2 align-middle justify-center ">{name}</h2>
            <h4 id ="cuisines" className="flex ">{cuisines.join(", ")}</h4>
            <ul  key="restElem" className="flex  justify-between mt-5">
                <li key="rating">{rating+"⭐"}</li>
                <li key="deliveryTime">{deliveryTime+"min"}</li>
                <li key="cost">{cost}</li>
            </ul>
            </Link>
        </div>
       

    )
}

export default RestaurantCard