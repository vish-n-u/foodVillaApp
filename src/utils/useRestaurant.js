import { useEffect } from "react";
import { addData } from "../../redux/restaurantDetailsSlice";
import { swiggyRestaurantApi } from "../constants";
// import allMenu from "../../swiggyMenusApi";
import { addMenuData } from "../../redux/allMenuSlice";
import jsonData from "../../data";

async function getData(
  setRestaurants,
  setFilterSearch,
  err,
  Dispatch,
  restaurantDetails
) {
  // try {
  // console.log("restaurant data", jsonData);
  // const getMenuData = await fetch(
  //   "http://localhost:3000/socialMedia/api/v1/menuDetails",
  //   {
  //     method: "GET",
  //     mode: "cors",
  //     headers: { "content-type": "application/json" },
  //   }
  // );
  // const jsonDatas = await getMenuData.json();
  // console.log("!!!!!!!", getMenuData, jsonDatas);
  // console.log("useRestaurant getData", setRestaurants, setFilterSearch, err);

  if (setRestaurants) {
    // const data = await jsonData.json();
    setRestaurants(jsonData);
    setFilterSearch(jsonData);
    if (Object.keys(restaurantDetails).length < 1) {
      jsonData.map((rs) => {
        Dispatch(addMenuData(rs));
      });
    }

    // Dispatch(addMenuData(jsonDatas.message));

    return;
  } else {
    // console.log("use Restaurant else case");
    jsonData.map((rs) => {
      Dispatch(addMenuData(rs));
    });
  }
  // } catch (error) {
  //   console.log(error);
  //   err = true;
  //   return;
  // }
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
    } else {
      getData(
        setRestaurants,
        setFilterSearch,
        err,
        Dispatch,
        restaurantDetails
      );
    }
  }, [setRestaurants, setFilterSearch, Dispatch]);
};

export default useRestaurant;
