import { useEffect } from "react";
import { useSelector } from "react-redux";
import { swiggyMenuApi } from "../constants";
import { addMenuDetails } from "../../redux/menuSlice";
import allMenu from "../../swiggyMenusApi";

async function getDetails(id, setDetails, setFilteredRestaurant, Dispatch) {
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
  useEffect(() => {
    if (details) return;
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
