import changeMenuTo from "./utils/helperFunction/changeMenuByFilter";
import filterMenu from "./utils/helperFunction/filterMenuFunction";
import { UserContext } from "../app";
import { useContext } from "react";

const FilterMenu = ({
  filterSearch,
  setFilterSearch,
  isVeg,
  filteredRestaurant,
  setFilteredRestaurant,
  setIsVeg,
  details,
  setDetails,
}) => {
  const pageColour = useContext(UserContext);
  return (
    <div
      className={`w-screen   flex justify-center z-[90] sticky top-0 mt-1 ${
        pageColour !== "white"
          ? "bg-black shadow-gray-500 shadow-lg"
          : "bg-white shadow-lg"
      }`}
    >
      <input
        className="h-10 font-semibold rounded-md  bg-white w-1/2 md:w-3/4 lg:w-80"
        type="text"
        value={filterSearch}
        placeholder={" search for dishes..."}
        onChange={(e) => {
          let data = e.target.value;
          console.log("onchange:", data);
          setFilterSearch(data);
          console.log("after:", data);
          filterMenu(
            data,
            setFilterSearch,
            filteredRestaurant,
            setFilteredRestaurant,
            details,
            setDetails,
            isVeg
          );
        }}
      ></input>
      <div
        className={`h-10 font-semibold rounded-md ml-3  bg-white  flex flex-row flex-nowrap items-center `}
      >
        <input
          type={"checkbox"}
          className="h-6 w-6 rounded-md align-middle ml-2 transition duration-500 ease-in-out bg-green-100 border-green-300 text-green-500 focus:ring-green-200"
          onClick={() => {
            if (!isVeg) {
              setIsVeg(true);
              changeMenuTo(
                true,
                filteredRestaurant,
                setFilteredRestaurant,
                details
              );
            } else {
              setIsVeg(false);
              changeMenuTo(
                false,
                filteredRestaurant,
                setFilteredRestaurant,
                details
              );
            }
          }}
        ></input>
        <span className="h-6 rounded-md  align-middle font-semibold ml-1 hover:text-green-700 transition-all">
          Veg🍃
        </span>
      </div>
    </div>
  );
};

export default FilterMenu;
