import { useEffect } from "react";

function searchMenu(
  filterSearch,
  filteredRestaurant,
  setFilteredRestaurant,
  details,
  isVeg
) {
  if (filterSearch.length >= 3 || filterSearch.length == 0) {
    console.log(filterSearch.length, filterSearch);
    let filteredData = Object.values(filteredRestaurant).filter(
      (rsx, index) => {
        if (index != 0) {
          // console.log("rsx", rsx.name);
          return rsx.itemCards.map((data) => {
            if (
              data.card.name.toLowerCase().includes(filterSearch.toLowerCase())
            )
              return rsx;
          });
        }
      }
    );
    setFilteredRestaurant(filteredData);
    console.log("filter", filteredData);
  }
  if (filterSearch.length == 0) {
    if (isVeg) {
      let filteredData = Object.values(details.menu.items).filter(
        (rsx, index) => {
          if (index != 0) {
            // console.log("rsx", rsx.name);
            return rsx.itemCards.map((data) => {
              if (data.card.isVeg == 1) return data;
            });
          }
        }
      );
      setFilteredRestaurant(filteredData);
    } else {
      setFilteredRestaurant(details.menu.items);
    }
  }
}

const useSearchMenu = (
  filterSearch,
  filteredRestaurant,
  setFilteredRestaurant,
  details,
  isVeg
) => {
  useEffect(() => {
    searchMenu(
      filterSearch,
      filteredRestaurant,
      setFilteredRestaurant,
      details,
      isVeg
    );
  }, [filterSearch]);
};

export default useSearchMenu;
