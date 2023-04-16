import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { menuImg_CDN_Link } from "./constants";
import useRestaurant from "./utils/useRestaurant";

const MenuCss = () => {
  const { id } = useParams();
  const cartItems = useSelector((store) => store.cart.items);
  let datas = useSelector((store) => store.restaurantDetails);
  const Dispatch = useDispatch();

  useRestaurant("", "", "", Dispatch, datas);

  let data = datas[id];

  // console.log("data in menucss:", datas);
  let cuisineData = data?.cuisines?.join(" ");
  let avgRatingMsg =
    typeof (data?.avgRating - 1) == "number" ? "rating" : "too few ratings";

  return Object.keys(datas).length <= 1 ? null : (
    <div
      className="bg-slate-800 lg:items-center lg:justify-center justify-start pb-5 h-56 pt-5 sticky top-0 flex p-4  z-[100] text-yellow-50 w-screen"
      key="header"
    >
      <img
        className="lg:h-36 md:h-36 h-28  w-2/5 lg:w-1/6 mr-1 lg:mr-5 relative  "
        src={menuImg_CDN_Link + data.cloudinaryImageId}
        alt="restaurantImg"
      ></img>
      <div key="underTitle" className="relative w-4/5 lg:w-1/5  flex flex-col ">
        <h1 className="font-semibold   lg:text-3xl p-3 pl-0">{data.name}</h1>
        <span>{cuisineData}</span>
        <ul key="otherElem" className="flex justify-evenly  pl-0 pt-2">
          <li>
            {data.avgRating + "⭐" + " |  "}
            <div className="font-light text-sm">{avgRatingMsg}</div>
          </li>
          <li>{data.costForTwoString + " |  "}</li>
          <li>{data?.sla?.deliveryTime + "min"}</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuCss;
