export const swiggyRestaurantApi =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2183013&lng=73.0878267&page_type=DESKTOP_WEB_LISTING";
export const restaurantImg_CDN_Link =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";
export const swiggyMenuApi =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.2183013&lng=73.0878267&restaurantId=";
export const menuImg_CDN_Link =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";
export const menuItemsImg_CDN_Link =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
export const prevOrderDetails =
  "http://localhost:3000/socialMedia/api/v1/orders";
// "https://cute-teal-pelican-tam.cyclic.app/socialMedia/api/v1/orders";

export function getWidth() {
  console.log(
    "getWIdth:",

    Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    )
  );
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
