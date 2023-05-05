import changeMenuTo from "./utils/helperFunction/changeMenuByFilter";
import filterMenu from "./utils/helperFunction/filterMenuFunction";

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
  return (
    <div className="w-screen flex justify-center z-[90] sticky top-44 ">
      <input
        className="h-10 font-semibold shadow-xl bg-white w-1/2 md:w-3/4 lg:w-80"
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
      <div className="h-10 font-semibold ml-3 shadow-xl bg-white  flex flex-row flex-nowrap items-center">
        <input
          type={"checkbox"}
          className="h-6 w-6 align-middle ml-2 transition duration-500 ease-in-out bg-green-100 border-green-300 text-green-500 focus:ring-green-200"
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
        <span className="h-6  align-middle font-semibold ml-1 hover:text-green-700 transition-all">
          Veg🍃
        </span>
      </div>
    </div>
  );
};

export default FilterMenu;
