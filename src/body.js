import { useState, useContext } from "react";

import RestaurantCard from "./restaurantCard";
import RestaurantCardShimmerUI from "./restaurantCardShimmerUI";
import useRestaurant from "./utils/useRestaurant";

import { useDispatch, useSelector } from "react-redux";
import { addData } from "../redux/restaurantDetailsSlice";
import { UserContext } from "../app";

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
  let [filterSearch, setFilterSearch] = useState([]);
  let [searchText, setSearchText] = useState("search");
  let [restaurants, setRestaurants] = useState([]);
  let restaurantDetails = useSelector((store) => store.restaurantDetails);
  const Dispatch = useDispatch();
  const pageColour = useContext(UserContext);
  let err = false;

  useRestaurant(
    setRestaurants,
    setFilterSearch,
    err,
    Dispatch,
    restaurantDetails
  );
  console.log(
    "----restauranrDetails",
    restaurantDetails,
    "----filterSearch",
    filterSearch
  );
  return (
    <div
      className={`  w-screen ${
        pageColour == "white" ? "bg-white" : "bg-black"
      }`}
      key="body"
    >
      <div className="flex justify-center py-2  my-3" key="searchBar">
        <input
          className="rounded-full px-6 shadow-md shadow-white  "
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
          className="ml-2 "
          onClick={(e) => {
            let filterData = searchText;
            let filteredData = getFilteredData(filterData, restaurants);
            setFilterSearch(filteredData);
          }}
        >
          🔍
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
          <RestaurantCardShimmerUI />
        ) : (
          <div className="w-screen flex flex-row  justify-evenly flex-wrap">
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
