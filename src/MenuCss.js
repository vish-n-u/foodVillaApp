import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "../app";
import { useContext } from "react";
import { menuImg_CDN_Link } from "./constants";
import useRestaurant from "./utils/useRestaurant";

const MenuCss = () => {
  const { id } = useParams();
  const cartItems = useSelector((store) => store.cart.items);
  let datas = useSelector((store) => store.restaurantDetails);
  const pageColour = useContext(UserContext);
  const Dispatch = useDispatch();

  useRestaurant("", "", "", Dispatch, datas);

  let data = datas[id];

  // console.log("data in menucss:", datas);
  let cuisineData = data?.cuisines?.join(", ");
  let location = data?.area + ", Mumbai";
  let avgRatingMsg =
    typeof (data?.avgRating - 1) == "number" ? "rating" : "too few ratings";

  return Object.keys(datas).length <= 1 ? null : (
    <div
      className={`w-screen flex justify-center z-[90] mt-6 ${
        pageColour != "white" ? "bg-black text-white" : ""
      }`}
    >
      <div
        className={` lg:items-center md:items-center flex-col-reverse lg:justify-between md:flex-row-reverse lg:flex-row-reverse justify-start pb-5 h-auto pt-5  flex p-4    w-11/12 lg:w-2/3 border ${
          pageColour != "white" ? "bg-black text-white" : "bg-white"
        }`}
        key="header"
      >
        <img
          className="lg:h-36 md:h-36 h-32 rounded-md  w-48  mr-1 lg:mr-5 relative  mt-3 lg:mt-0 md:mt-0 "
          src={menuImg_CDN_Link + data.cloudinaryImageId}
          alt="restaurantImg"
        ></img>
        <div
          key="underTitle"
          className={`relative w-full  justify-start align-top items-start  flex flex-col ${
            pageColour !== "white" ? "text-slate-400" : "text-slate-600"
          }`}
        >
          <h1
            className={`font-bold   lg:text-xl py-1 ${
              pageColour == "white" ? "text-black" : "text-white"
            }`}
          >
            {data.name}
          </h1>
          <span className="text-[13px] font-medium ">{cuisineData}</span>
          <span className="text-[13px] font-medium ">{location}</span>
          <ul
            key="otherElem"
            className="flex justify-evenly font-medium pl-0  text-[13px] "
          >
            <li className="whitespace-pre">{data.avgRating + "⭐ " + " | "}</li>
            <li>{data.totalRatingsString}</li>
          </ul>
          <ul className="flex justify-evenly font-medium pl-0  text-[13px] ">
            <li>{data.lastMileTravelString}</li>
            <li className="whitespace-pre">{" | "}</li>
            <li>
              {"₹" +
                data.feeDetails.fees[0].fee / 100 +
                " Delivery fees will be applied"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuCss;
