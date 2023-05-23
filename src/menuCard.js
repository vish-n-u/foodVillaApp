import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import "../slideIn.css";
import { useSelector, useDispatch } from "react-redux";
import FilterMenu from "./FilterMenu";
import { menuItemsImg_CDN_Link, swiggyMenuApi } from "./constants";
import MenuCss from "./MenuCss";
import categoryObj from "./utils/helperFunction/categoryObjFunction";
import { getWidth } from "./constants";
import useGetMenuDetail from "./utils/useGetMenuDetails";
import { addItem, removeItem } from "../redux/cartSlice";
import { UserContext } from "../app";
import NavBar from "./menuNavbar";
import MenuCardShimmer from "./menuCardShimmerUi";
import "../buttonOpen.css"

function replaceVal(val) {
  let replaceValue = val.replace(/[^a-zA-Z0-9]/g, "");
  // console.log("menuCard regex value", retur);
  return replaceValue;
}

const MenuCard = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const pageColour = useContext(UserContext);
  const dispatch = useDispatch();
  const handleAddItems = (item) => dispatch(addItem(item));
  const handleRemoveItems = (item) => dispatch(removeItem(item));
  let { id } = useParams();
  let [details, setDetails] = useState("");
  let [filteredRestaurant, setFilteredRestaurant] = useState(null);
  const [filterSearch, setFilterSearch] = useState("");
  const [isVeg, setIsVeg] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState("");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [showCartItemsMessage, setShowCartItemsMessage] = useState(false);
  const [shouldCartItemsChange, setShouldCartItemsChange] = useState(false);

  const refButton = useRef();

  useGetMenuDetail(id, details, setDetails, setFilteredRestaurant, dispatch);

  useEffect(() => {
    let handler = (event) => {
      event.stopPropagation();
      console.log("Reached in butoon ref", isMenuClicked);
      if (refButton.current.contains(event.target)) {
        if (isMenuClicked) {
          console.log("menu will be closed");
          setIsMenuClicked(false);
        } else {
          console.log("Menu will be opened");
          setIsMenuClicked(true);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    // console.log("useEffect", filteredRestaurant);
    if (filteredRestaurant) {
      categoryObj(filteredRestaurant, isCategoryOpen, setIsCategoryOpen);
    }
  }, [filteredRestaurant]);
  useEffect(() => {
    console.log("window.screen.width", getWidth());
  }, [getWidth()]);

  console.log(window.screen.width);
  return !details ? (
    <MenuCardShimmer />
  ) : (
    <>
      <MenuCss restaurant={filteredRestaurant} />
      <div
        className={`flex  content-center ${
          isMenuClicked
            ? pageColour == "white"
              ? "bg-black  bg-opacity-80 "
              : ""
            : ""
        } align-baseline  items-end w-screen`}
      >
        {/* <h1>{isMenuClicked}</h1> */}
        <div
          className={`flex flex-col justify-center items-center w-full ${
            pageColour == "white" ? "" : "bg-black"
          }`}
        >
          {
            <FilterMenu
              filterSearch={filterSearch}
              setFilterSearch={setFilterSearch}
              isVeg={isVeg}
              filteredRestaurant={filteredRestaurant}
              setFilteredRestaurant={setFilteredRestaurant}
              setIsVeg={setIsVeg}
              details={details}
              setDetails={setDetails}
            />
          }

          <div
            className={` w-screen  justify-center   flex flex-row   ${
              pageColour == "white" ? "" : "bg-black"
            } `}
            key={"menuParent"}
          >
            {/* {getWidth() > 1024 && window.screen.width > 1024 && (
              <div className="flex  lg:w-1/4">
                {filteredRestaurant && (
                  <NavBar filteredRestaurant={filteredRestaurant} />
                )}
              </div>
            )} */}
            <div
              className={`flex border-x-2 flex-col w-screen lg:w-2/3 ${
                pageColour == "white" ? "" : "bg-black text-white"
              }`}
            >
              {filteredRestaurant &&
                isCategoryOpen &&
                Object.keys(filteredRestaurant).map((val) => {
                  if (filteredRestaurant[val].length > 0)
                    return (
                      <div key={val}>
                        <div
                          id={replaceVal(val)}
                          className="text-xl  mt-10 font-semibold   py-4 w-screen flex justify-evenly lg:w-full"
                        >
                          <h1 className="">
                            {filteredRestaurant[val].length > 0
                              ? val == "undefined"
                                ? "others"
                                : val
                              : null}
                          </h1>
                          <h1
                            className="cursor-pointer"
                            onClick={() => {
                              setIsCategoryOpen({
                                ...isCategoryOpen,
                                [val]: !isCategoryOpen[val],
                              });
                            }}
                          >
                            {isCategoryOpen[val] ? "⬆" : "⬇"}
                          </h1>
                        </div>
                        {isCategoryOpen[val] &&
                          filteredRestaurant[val].map((rs) => {
                            return (
                              <div
                                className={`h-auto w-screen lg:w-full items-center  flex flex-col flex-wrap lg:flex-row justify-between lg:p-2 lg:my-2 border-b-2 ${
                                  pageColour == "white" ? "" : "text-white"
                                }`}
                                key={rs.id + rs.category}
                              >
                                <div
                                  className={`flex flex-col pl-4 w-full lg:w-[60%]  justify-between  z-[20] ${
                                    pageColour == "white" ? "" : "text-white"
                                  }`}
                                >
                                  {rs.isVeg == 1 ? (
                                    <img
                                      className="h-6 w-6"
                                      src="data:image/jpeg;base64,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"
                                      alt="isVeg"
                                    ></img>
                                  ) : (
                                    <img
                                      src="https://th.bing.com/th/id/OIP.Ve98fZy09lyEDcJbX9qToQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                      alt="non veg"
                                      className="h-6 w-6"
                                    ></img>
                                  )}
                                  <h2 className="font-bold w-full text-lg ">
                                    {rs.name}
                                  </h2>
                                  <h3 className="font-semibold">
                                    {"₹" +
                                      (rs.defaultPrice / 100 || rs.price / 100)}
                                  </h3>
                                  <span className="overflow-hidden text-[12px] font-normal text-gray-500">
                                    {rs.description}
                                  </span>
                                </div>
                                <div className="flex flex-col-reverse w-1/5  min-h-[90px]  relative p-4 lg:p-0 bottom-3 lg:w-[40%] md:w-3/5 justify-between items-center">
                                  {rs.inStock == 1 ? (
                                    <>
                                      {rs.imageId == "" ||
                                      !rs.imageId ? null : (
                                        <img
                                          className="w-4/5  min-w-[140px]  max-w-[160px] lg:min-w-[130px] lg:min-h-[90px] rounded-md  z-[20] relative"
                                          src={
                                            menuItemsImg_CDN_Link + rs.imageId
                                          }
                                          alt="img"
                                        ></img>
                                      )}
                                      {!cartItems?.[id]?.[rs.id]
                                        ?.itemsQuantityInCart ? (
                                        <h1
                                          className=" z-[22] flex  justify-center items-center hover:shadow-orange-200 bg-white rounded-md  text-center -mb-4 border-2  h-9 min-w-[100px] w-3/5 md:w-1/6 lg:w-1/6  absolute shadow-md hover:cursor-pointer text-orange-500"
                                          onClick={() => {
                                            if (
                                              Object.keys(cartItems).length >
                                                0 &&
                                              Object.keys(cartItems)[0] != id
                                            ) {
                                              setShowCartItemsMessage(true);
                                              setShouldCartItemsChange(rs);
                                              return;
                                            }
                                            handleAddItems({ rs: rs, id: id });
                                          }}
                                        >
                                          Add
                                        </h1>
                                      ) : (
                                        <div
                                          id="kk"
                                          key="key"
                                          className="bg-white z-[22] flex min-w-[140px] shadow-md hover:shadow-orange-200 justify-evenly items-center text-center border-2  h-9 md:w-1/4 w-4/5 rounded-sm absolute text-orange-500"
                                        >
                                          <button
                                            className="font-semibold z-[22] text-2xl active:text-3xl"
                                            onClick={() => {
                                              handleRemoveItems({
                                                rs: rs,
                                                id: id,
                                              });
                                            }}
                                          >
                                            -
                                          </button>
                                          <span className="inline font-semibold text-lg">
                                            {
                                              cartItems?.[id]?.[rs.id]
                                                .itemsQuantityInCart
                                            }
                                          </span>
                                          <button
                                            className="font-semibold z-[22] active:text-3xl  text-2xl"
                                            onClick={() => {
                                              if (
                                                Object.keys(cartItems).length >
                                                  0 &&
                                                Object.keys(cartItems)[0] != id
                                              ) {
                                                setShowCartItemsMessage(true);
                                                return;
                                              }
                                              handleAddItems({
                                                rs: rs,
                                                id: id,
                                              });
                                            }}
                                          >
                                            +
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className=" flex flex-wrap items-center  z-[20]  border-[1] border-slate-400 text-sm w-2/3 text-black">
                                      {rs?.nextAvailableAtMessage}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    );
                })}
            </div>
          </div>
        </div>
      </div>
      {isMenuClicked && (
        <div className="w-screen z-40 flex justify-center content-center transition-all duration-500 items-center">
          <div className="w-3/4 lg:w-1/3  z-40  h-auto max-h-[50%] fixed bottom-16  ">
            <NavBar
              filteredRestaurant={filteredRestaurant}
              menuButton={true}
              isMenuClicked={isMenuClicked}
              setIsMenuClicked={setIsMenuClicked}
            />
          </div>
        </div>
      )}
      {
        <div className="w-screen flex justify-center items-center  content-center align-middle ">
          <h1
            ref={refButton}
            className="fixed cursor-pointer w-24 z-40 flex justify-center text-center items-center content-center align-middle   bottom-2 bg-slate-300 p-3 rounded-r-2xl rounded-l-2xl"
          >
            Menu
          </h1>
        </div>
      }
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
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
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
                  dispatch(
                    addItem({
                      rs: shouldCartItemsChange,
                      id,
                      deleteCurrItems: true,
                    })
                  );
                  setShouldCartItemsChange("");
                }}
              >
                Yes,start fresh!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuCard;
