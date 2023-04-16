import { useEffect, useState } from "react";

import { swiggyMenuApi, swiggyRestaurantApi } from "./constants";
import RestaurantCard from "./restaurantCard";
import ShimmerUI from "./shimmerUI";
import useRestaurant from "./utils/useRestaurant";
import { IsOnline } from "./utils/useIfOnline";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../redux/restaurantDetailsSlice";

function getFilteredData(keyword, restaurants) {
  return restaurants.filter((rs) => {
    if (rs?.data?.name?.toLowerCase().includes(keyword.toLowerCase()))
      return rs;
  });
}

function ErrorDisplay() {
  return <h1>some internal err has occured...</h1>;
}
const Body = () => {
  // create a search bar
  // create ShimmerUI
  //create two state variables filterData and restaurantData
  let [filterSearch, setFilterSearch] = useState([]);
  let [searchText, setSearchText] = useState("search");
  let [restaurants, setRestaurants] = useState([]);
  let restaurantDetails = useSelector((store) => store.restaurantDetails);
  const Dispatch = useDispatch();
  let err = false;
  console.log("----restauranrDetails", restaurantDetails, filterSearch);
  useRestaurant(
    setRestaurants,
    setFilterSearch,
    err,
    Dispatch,
    restaurantDetails
  );
  return (
    <div className=" bg-fuchsia-50 w-screen" key="body">
      <div className="flex justify-center my-3" key="searchBar">
        <input
          id="bar"
          key="bar"
          type="text"
          placeholder={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          id="search"
          key="search"
          onClick={(e) => {
            let filterData = searchText;
            let filteredData = getFilteredData(filterData, restaurants);
            setFilterSearch(filteredData);
          }}
        >
          Search
        </button>
        {/* <p className="flex justify-end">{IsOnline() == true ? "🟢" : "🔴"}</p> */}
      </div>

      <div className="flex flex-wrap" key="cards">
        {/* {restaurants.length == 0 ? (
          <ShimmerUI />
        ) : err ? (
          <ErrorDisplay />
        ) : ( */}
        {restaurants.length == 0 ? (
          <ShimmerUI />
        ) : (
          <div className="w-screen flex flex-row justify-evenly flex-wrap">
            {filterSearch.map((rs) => {
              if (Object.keys(restaurantDetails).length <= 1) {
                Dispatch(addData(rs));
              }

              return <RestaurantCard {...rs.data} key={rs.data.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
