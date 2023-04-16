import changeMenuTo from "./changeMenuByFilter";

function filterMenu(
  filterSearch,
  setFilterSearch,
  filteredRestaurant,
  setFilteredRestaurant,
  details,
  setDetails,
  isVeg
) {
  let newDetails = {};

  Object.keys(details).map((vals) => {
    let arr = [];
    details[vals].map((rs, index) => {
      if (rs.name.toLowerCase().includes(filterSearch.toLowerCase())) {
        if (isVeg) {
          if (rs.isVeg == 1) arr.push(rs);
        } else {
          arr.push(rs);
        }
      }
      if (index + 1 == details[vals].length && arr.length > 0) {
        newDetails[vals] = arr;
      }
    });
  });
  setFilteredRestaurant(newDetails);
}

export default filterMenu;
