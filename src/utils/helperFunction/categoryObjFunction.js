function categoryObj(filteredRestaurant, isCategoryOpen, setIsCategoryOpen) {
  console.log("Reached", filteredRestaurant);
  let obj = {};
  Object.keys(filteredRestaurant).map((val) => {
    if (!obj[val]) {
      obj[val] = true;
    }
  });
  // console.log("````obj````", obj);
  setIsCategoryOpen(obj);
}
export default categoryObj