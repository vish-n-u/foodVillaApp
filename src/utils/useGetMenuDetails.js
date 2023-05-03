import { useEffect } from "react";
import { useSelector } from "react-redux";
import { swiggyMenuApi } from "../constants";
import jsonData from "../../data";
import { addMenuDetails } from "../../redux/menuSlice";
import { addData } from "../../redux/restaurantDetailsSlice";
import allMenu from "../../swiggyMenusApi";

async function getDetails(id, setDetails, setFilteredRestaurant, Dispatch) {
  console.log("getDetails of menu is getting called");
  const data = allMenu[id];

  Dispatch(addMenuDetails({ id, data }));
  setDetails(data);
  setFilteredRestaurant(data);
  // console.log("====", data);
}

const useGetMenuDetail = (
  id,
  details,
  setDetails,
  setFilteredRestaurant,
  Dispatch
) => {
  const menuItems = useSelector((store) => store.menuDetails.items);
  const restaurantItems = useSelector((store) => store.restaurantDetails);
  console.log("restaurantItems===", restaurantItems, restaurantItems.length);
  useEffect(() => {
    if (details) return;
    if (Object.keys(restaurantItems).length == 0) {
      jsonData.map((rs) => {
        Dispatch(addData(rs));
      });
    }
    if (menuItems[id]) {
      console.log("this works---");
      setDetails(menuItems[id]);
      setFilteredRestaurant(menuItems[id]);
      return;
    }
    getDetails(id, setDetails, setFilteredRestaurant, Dispatch);
  }, []);
};

export default useGetMenuDetail;
