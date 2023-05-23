import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prevOrderDetails } from "../path.config";
import { restaurantImg_CDN_Link } from "./constants";
import { reOrder } from "../redux/cartSlice";
import { UserContext } from "../app";
import "../slideIn.css";

import PreviousOrderShimmer from "./previousOrderShimmer";
async function getData(
  allPrevOrders,
  setAllPrevOrders,
  setShowLoadingScreen,
  pageNumber,
  setPageNumber,
  setShowPreviousOrderBtn,
  setLoadingBtn
) {
  setLoadingBtn(true);
  try {
    const data = await fetch(prevOrderDetails + `?num=${pageNumber}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        refreshToken: localStorage.getItem("refreshToken"),
      }),
      headers: { "content-type": "application/json" },
    });
    console.log("show data", data);
    const dataJson = await data.json();

    console.log("show dataJson", dataJson);
    if (dataJson.message.newAccessToken != undefined)
      localStorage.setItem("token", dataJson.message.newAccessToken);
    console.log("Data", allPrevOrders, dataJson.message);
    let allData = [...allPrevOrders];
    allData.push(dataJson.message);
    console.log("allData", allData, allPrevOrders, dataJson.message, dataJson);
    let fullData = allData.flat();
    console.log("allData", fullData);

    setAllPrevOrders(fullData);
    setPageNumber(pageNumber + 1);
    setShowLoadingScreen(false);
    if (dataJson.areMoreItemsAvailable === false) {
      setShowPreviousOrderBtn(false);
    }
    console.log("pageNumber:--", pageNumber);
  } catch (err) {
    console.log(err);
  }
  setLoadingBtn(false);
}

const PreviousOrders = ({ setIsUsing20PercentOff }) => {
  //createShimmer
  const [allPrevOrders, setAllPrevOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const restataurantDetails = useSelector((store) => store.restaurantDetails);
  const allMenu = useSelector((store) => store.allMenu);
  const cartItems = useSelector((store) => store.cart.items);
  const [showCartItemsMessage, setShowCartItemsMessage] = useState(false);
  const Dispatch = useDispatch();
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [orderId, setOrderId] = useState();
  const pageColour = useContext(UserContext);
  const [showPreviousOrderBtn, setShowPreviousOrderBtn] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  console.log("-----:showPreviousBtn:-----", showPreviousOrderBtn);

  useEffect(() => {
    if (localStorage.getItem("token")) setShowLoadingScreen(true);
  }, []);
  useEffect(() => {
    if (showLoadingScreen) {
      getData(
        allPrevOrders,
        setAllPrevOrders,
        setShowLoadingScreen,
        pageNumber,
        setPageNumber,
        setShowPreviousOrderBtn,
        setLoadingBtn
      );
    }
  }, [showLoadingScreen]);

  return showLoadingScreen ? (
    <PreviousOrderShimmer />
  ) : allPrevOrders.length === 0 ? (
    <div className="flex flex-col w-full h-full justify-start border-black align-middle items-center border">
      <div className="m-2 w-full font-semibold text-lg">
        Happy first ordering
      </div>

      <span className="mt-10">
        Hey! since its your first order you can use the below offer
      </span>
      <div className="w-full flex flex-wrap items-center justify-center">
        <button
          onClick={() => setIsUsing20PercentOff(true)}
          className="flex justify-center  items-center flex-wrap  p-2 bg-orange-600 rounded-md w-40 m-2 text-white"
        >
          Rapidosh20%
        </button>
      </div>
    </div>
  ) : (
    <div className="m-2 w-full h-full flex flex-col justify-start ">
      <div
        className={`flex mx-2 flex-col  h-screen  lg:w-full lg:mt-16  w-11/12  items-center 
    `}
      >
        <div
          className={`h-[63%] w-full py-4 my-2 rounded-md border-2 ${
            pageColour == "white"
              ? "bg-white "
              : "bg-black border-white text-white"
          }`}
        >
          <div
            className={`text-lg font-bold  mb-2 flex justify-center lg:mb-5"  ${
              pageColour === "white" ? "text-black" : " text-white"
            }
        `}
          >
            Previous orders
          </div>
          <div
            className={`flex flex-col   h-full  border-2  lg:w-full w-full  px-2 overflow-y-scroll ${
              pageColour == "white" ? "bg-white" : "bg-black text-white"
            }`}
          >
            {allPrevOrders.map((rs) => {
              let obj = {};
              return (
                <div
                  key={rs._id}
                  className={`my-2 rounded-lg flex container  w-full border p-2 border-black ${
                    pageColour == "white" ? "border-black" : "border-white"
                  }`}
                >
                  <div className="w-full flex flex-col justify-between">
                    <div className=" flex w-full justify-between lg:flex-row md:flex-row flex-col border-b-2 pb-3 mb-3 border-dashed">
                      <div className="flex  w-full  mt-3 border-black">
                        <img
                          className="h-24 w-32  border-2 border-blue-700"
                          src={
                            restaurantImg_CDN_Link +
                            restataurantDetails[rs.restaurantId]
                              .cloudinaryImageId
                          }
                          alt="restrauntImg"
                        ></img>
                        <div className="flex flex-col">
                          <h1 className="ml-2 mt-2 font-semibold">
                            {restataurantDetails[rs.restaurantId].name}
                          </h1>
                          <h1 className="ml-2 lg:text-sm md:text-sm text-[11px] text-gray-500">
                            ordered on:{" "}
                            {rs.updatedAt.slice(0, 10) +
                              "  |  " +
                              convertToHrs(rs.updatedAt.slice(11, 16))}
                          </h1>
                        </div>
                      </div>
                      <h1>
                        {rs.orderSuccessful
                          ? "✅ Delivered Sucessfully!"
                          : "❌ Order Cancelled"}
                      </h1>
                    </div>

                    <div className="flex flex-col mt-2 justify-start w-full">
                      {Object.keys(rs.orderDetails).map((key, index) => {
                        return allMenu[rs.restaurantId][
                          rs.orderDetails[key][1]
                        ].map((vals) => {
                          if (vals.id == key) {
                            console.log(vals);
                            obj[key] = { ...vals };

                            obj[key].itemsQuantityInCart =
                              rs.orderDetails[key][0];
                            // setObjects({ object, ...obj });
                            return (
                              <div
                                className="lg:text-sm md:text-sm text-[12px] "
                                key={key + index}
                              >
                                <span
                                  className={`ml-3 mt-1   ${
                                    pageColour == "white"
                                      ? "text-slate-800"
                                      : "text-white"
                                  }`}
                                >
                                  {vals.name}
                                </span>
                                <span
                                  key={key}
                                  className={`ml-3 mt-1 font-semibold  ${
                                    pageColour == "white"
                                      ? "text-black"
                                      : "text-white"
                                  }`}
                                >
                                  {" x" + +rs.orderDetails[key][0]}
                                </span>
                              </div>
                            );
                          }
                        });
                      })}
                      <div className="flex align-baseline items-end ml-3 mt-1 h-full w-full flex-wrap justify-between px-4 font-semibold">
                        <h1 className="">
                          {"Total          " + "₹" + rs.totalAmount}
                        </h1>
                        <button
                          className="bg-orange-500 text-white font-medium rounded-md active:bg-orange-700 p-2 px-4"
                          onClick={() => {
                            if (Object.keys(cartItems).length == 0)
                              handleClick(
                                rs._id,
                                Dispatch,
                                allPrevOrders,
                                allMenu
                              );
                            else {
                              setShowCartItemsMessage(true);
                              setOrderId(rs._id);
                            }
                          }}
                        >
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                  {showCartItemsMessage && (
                    <div
                      className={`fixed bottom-0 right-4 z-[150] duration-500 transform-gpu translate-y-full w-screen flex transition-all  items-center text-center  justify-center py-4 my-4 `}
                      style={{
                        animation: showCartItemsMessage
                          ? "slideInFromBottom 0.5s ease-out forwards"
                          : "none",
                      }}
                    >
                      <div className="bg-white container border-2 p-3 shadow-md shadow-gray-600 rounded-md  fixed w-3/4 bottom-4 z-50 lg:w-1/3">
                        <h1 className="text-lg font-semibold my-2">
                          Items already in cart
                        </h1>
                        <h1>
                          Your cart contains items from other restaurant. Would
                          you like to reset your cart for adding items from this
                          restaurant?
                        </h1>
                        <div className="w-full flex justify-around my-4">
                          <button
                            className="text-orange-500 font-semibold  border-2 p-2 w-28 my-2 border-orange-500"
                            onClick={() => {
                              setShowCartItemsMessage(false);
                            }}
                          >
                            No
                          </button>
                          <button
                            className="bg-orange-500 my-2 font-semibold  text-white p-2 border-orange-500"
                            onClick={() => {
                              setShowCartItemsMessage(false);
                              handleClick(
                                orderId,
                                Dispatch,
                                allPrevOrders,
                                allMenu
                              );
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
        </div>
        {showPreviousOrderBtn && (
          <button
            className="p-3 mt-5 bg-orange-500 text-lg font-normal font-serif active:bg-orange-700  text-white rounded-md"
            onClick={() => {
              getData(
                allPrevOrders,
                setAllPrevOrders,
                setShowLoadingScreen,
                pageNumber,
                setPageNumber,
                setShowPreviousOrderBtn,
                setLoadingBtn
              );
            }}
          >
            {!loadingBtn ? "show more items" : "loading..."}
          </button>
        )}
      </div>
    </div>
  );
};

async function handleClick(id, Dispatch, allPrevOrders, allMenu) {
  // console.log("entered handleClick ,id----", id);
  let obj = {};
  let newId;
  allPrevOrders.map((rs) => {
    if (rs._id == id) {
      Object.keys(rs.orderDetails).map((key, index) => {
        return allMenu[rs.restaurantId][rs.orderDetails[key][1]].map((vals) => {
          newId = rs.restaurantId;
          if (vals.id == key) {
            console.log(vals);
            obj[key] = { ...vals };

            obj[key].itemsQuantityInCart = rs.orderDetails[key][0];
          }
        });
      });
      let finalObj = { [newId]: obj };
      Dispatch(reOrder(finalObj));
    }
  });

  // Dispatch(reOrder(newObj));
}

function convertToHrs(str) {
  let min = str.slice(3);
  let carryForward = 0;
  console.log(min);
  min = parseInt(min) + 30;
  min = min >= 60 ? min - 60 : min;
  console.log(min);
  if (min <= 30) {
    carryForward = 1;

    min = min < 10 ? "0" + min : min;
  }
  // console.log(min, carryForward);
  let hrs = str.slice(0, 2);
  let hr = parseInt(hrs) + carryForward + 5;
  // console.log(min, carryForward, hr, hrs);
  hr = hr >= 24 ? hr - 24 : hr;

  if (parseInt(hr) < 10) {
    return "0" + hr + ":" + min + "AM";
  } else {
    return hr + ":" + min + "PM";
  }
}

export default PreviousOrders;
