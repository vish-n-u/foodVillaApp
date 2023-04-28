import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import restaurantDetailsSlice from "../redux/restaurantDetailsSlice";
import { prevOrderDetails } from "./constants";
import { restaurantImg_CDN_Link } from "./constants";
import { reOrder } from "../redux/cartSlice";
async function getData(setAllPrevOrders) {
  try {
    const data = await fetch(prevOrderDetails, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        refreshToken: localStorage.getItem("refreshToken"),
      }),
      headers: { "content-type": "application/json" },
    });
    console.log(data);
    const dataJson = await data.json();
    console.log("dataJson-------", dataJson);
    if (dataJson.message.newAccessToken != undefined)
      localStorage.setItem("token", dataJson.message.newAccessToken);
    setAllPrevOrders(dataJson.message);
  } catch (err) {
    console.log(err);
  }
}

const PreviousOrders = () => {
  //createShimmer
  const [allPrevOrders, setAllPrevOrders] = useState([]);
  const restataurantDetails = useSelector((store) => store.restaurantDetails);
  const allMenu = useSelector((store) => store.allMenu);
  const cartItems = useSelector((store) => store.cart.items);
  const [showCartItemsMessage, setShowCartItemsMessage] = useState(false);
  const Dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) getData(setAllPrevOrders);
  }, []);
  console.log("allPrevOrders.length-----", allPrevOrders, allPrevOrders.length);
  return allPrevOrders.length == 0 ? (
    <div></div>
  ) : (
    <div className="flex flex-col h-3/4 my-2 border-2 border-black w-1/2 container overflow-y-scroll">
      {allPrevOrders.map((rs) => {
        let obj = {};
        return (
          <div className="m-2 flex container w-full border p-2 border-black">
            <img
              className="h-24 w-32  border-2 border-blue-700"
              src={
                restaurantImg_CDN_Link +
                restataurantDetails[rs.restaurantId].cloudinaryImageId
              }
              alt="restrauntImg"
            ></img>
            <div className="flex flex-col w-full">
              {Object.keys(rs.orderDetails).map((key) => {
                return allMenu[rs.restaurantId][rs.orderDetails[key][1]].map(
                  (vals) => {
                    if (vals.id == key) {
                      console.log(vals);
                      obj[key] = { ...vals };

                      obj[key].itemsQuantityInCart = rs.orderDetails[key][0];
                      return (
                        <span className="ml-3 mt-1 text-sm text-slate-800">
                          {vals.name + "   x" + +rs.orderDetails[key][0]}
                        </span>
                      );
                    }
                  }
                );
              })}
              <div className="flex align-baseline items-end ml-3 mt-1 h-full w-full flex-wrap justify-around  ">
                <h1 className="">{"Total          " + rs.totalAmount}</h1>
                <button
                  onClick={() => {
                    if (Object.keys(cartItems).length == 0)
                      handleClick(rs.restaurantId, Dispatch, obj);
                    else setShowCartItemsMessage(true);
                  }}
                >
                  🔂 reorder
                </button>
              </div>
            </div>
            {showCartItemsMessage && (
              <div className="w-screen flex transition-all  items-center text-center scroll-smooth justify-center py-4 my-4 border-blue-800">
                <div className="bg-blue-100 container fixed w-11/12 bottom-4 z-50 lg:w-1/3">
                  <h1 className="text-lg font-semibold my-2">
                    Items already in cart
                  </h1>
                  <h1>
                    Your cart contains items from other restaurant. Would you
                    like to reset your cart for adding items from this
                    restaurant?
                  </h1>
                  <div className="w-full flex justify-around my-4">
                    <button
                      className="text-blue-800 border-2 p-2 w-28 my-2 border-blue-800"
                      onClick={() => {
                        setShowCartItemsMessage(false);
                      }}
                    >
                      No
                    </button>
                    <button
                      className="text-blue-800 my-2  border-2 p-2 border-blue-800"
                      onClick={() => {
                        setShowCartItemsMessage(false);
                        handleClick(rs.restaurantId, Dispatch, obj);
                      
                      }}
                    >
                      Yes,start fresh!
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

async function handleClick(id, Dispatch, obj) {
  let newObj = {
    [id]: obj,
  };
  Dispatch(reOrder(newObj));
}

export default PreviousOrders;