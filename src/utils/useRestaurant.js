import { useEffect } from "react";
import { addData } from "../../redux/restaurantDetailsSlice";
import { swiggyRestaurantApi } from "../constants";
import jsonData from "../../data.json";

async function getData(setRestaurants, setFilterSearch, err, Dispatch) {
  try {
    // console.log("restaurant data", jsonData);
    // const jsonData = await data.json();
    // console.log("useRestaurant getData", setRestaurants, setFilterSearch, err);

    if (setRestaurants) {
      console.log("---reached setTimeout");
      setRestaurants(jsonData);

      setFilterSearch(jsonData);
      return;
    } else {
      // console.log("use Restaurant else case");
      jsonData.map((rs) => {
        Dispatch(addData(rs));
      });
    }
  } catch (error) {
    console.log(error);
    err = true;
    return;
  }
}

const useRestaurant = (
  setRestaurants,
  setFilterSearch,
  err,
  Dispatch,
  restaurantDetails
) => {
  useEffect(() => {
    console.log(Object.keys(restaurantDetails).length);
    if (Object.keys(restaurantDetails).length > 1) {
      // if (!setRestaurants) return;

      let arr = [];
      Object.keys(restaurantDetails).map((rs) => {
        arr.push({ data: restaurantDetails[rs] });
      });
      if (setRestaurants) {
        setRestaurants(arr);
        setFilterSearch(arr);
      }
      return;
    }

    getData(setRestaurants, setFilterSearch, err, Dispatch);
  }, [setRestaurants, setFilterSearch, Dispatch]);
};

export default useRestaurant;
