function changeMenuTo(
  isVeg,
  filteredRestaurant,
  setFilteredRestaurant,
  details
) {
  if (isVeg) {
    let newDetails = {};
    Object.keys(filteredRestaurant).map((vals) => {
      let arr = [];
      filteredRestaurant[vals].map((rs, index) => {
        // console.log("isveg rs", rs);
        if (rs.isVeg == 1) {
          arr.push(rs);
        }
        if (index + 1 == filteredRestaurant[vals].length) {
          newDetails[vals] = arr;
        }
      });
    });

    setFilteredRestaurant(newDetails);

    return;
  } else {
    setFilteredRestaurant(details);
  }
}
export default changeMenuTo;
