import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestaurantCard from "./restaurantCard";
import RestaurantCardShimmerUI from "./restaurantCardShimmerUI";
import useRestaurant from "./utils/useRestaurant";
import Footer from "./footer";
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
  let [searchText, setSearchText] = useState("search for a restaurant");
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

  return (
    <>
      <div
        className={` border border-gray-400  w-screen ${
          pageColour == "white" ? "bg-white" : "bg-black"
        }`}
        key="body"
      >
        <div className={`flex justify-center  p-2  `} key="searchBar">
          <input
            className={`rounded-lg lg:w-80 w-1/2  ${
              pageColour === "white"
                ? "shadow-md shadow-gray-300"
                : "shadow-md shadow-gray-500"
            }  `}
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
            className={`${
              pageColour === "white"
                ? "shadow-md shadow-orange-300"
                : "shadow-md shadow-gray-500"
            } ml-2 h-10 px-4 font-medium w-1/6 lg:w-auto text-white rounded-lg bg-[#ec6c10] flex justify-center active:bg-orange-800 items-center`}
            onClick={(e) => {
              let filterData = searchText;
              let filteredData = getFilteredData(filterData, restaurants);
              setFilterSearch(filteredData);
            }}
          >
            search
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
                return <RestaurantCard {...rs.data} key={rs.data.id} />;
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Body;
