import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";

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
        className={`flex flex-wrap content-center ${
          isMenuClicked
            ? pageColour == "white"
              ? "bg-black bg-opacity-80 "
              : ""
            : ""
        } align-middle justify-center items-center w-screen`}
      >
        {/* <h1>{isMenuClicked}</h1> */}
        <div
          className={`flex flex-col  items-center w-full ${
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
            className={` w-screen  justify-start lg:w-screen md:w-3/4 flex flex-row   ${
              pageColour == "white" ? "" : "bg-black"
            } `}
            key={"menuParent"}
          >
            {getWidth() > 1024 && window.screen.width > 1024 && (
              <div className="flex  lg:w-1/4">
                {filteredRestaurant && (
                  <NavBar filteredRestaurant={filteredRestaurant} />
                )}
              </div>
            )}
            <div
              className={`flex  flex-col w-screen lg:w-3/4 ${
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
                                className={`h-auto w-screen lg:w-full  flex justify-between flex-wrap lg:p-2 lg:m-2 border-b-2 ${
                                  pageColour == "white" ? "" : "text-white"
                                }`}
                                key={rs.id + rs.category}
                              >
                                <div
                                  className={`flex flex-col pl-4 w-3/5 lg:w-2/5 md:w-2/5 justify-between  z-[20] ${
                                    pageColour == "white" ? "" : "text-white"
                                  }`}
                                >
                                  {rs.isVeg == 1 ? (
                                    <div>{"🟢"}</div>
                                  ) : (
                                    <div>🔴</div>
                                  )}
                                  <h2 className="font-bold w-full text-lg ">
                                    {rs.name}
                                  </h2>
                                  <h3>
                                    {"₹" +
                                      (rs.defaultPrice / 100 || rs.price / 100)}
                                  </h3>
                                  <span className="overflow-hidden ">
                                    {rs.description}
                                  </span>
                                </div>
                                <div className="flex flex-col-reverse w-2/5  relative h-44 bottom-3 lg:w-3/5 md:w-3/5 justify-between items-center">
                                  {rs.inStock == 1 ? (
                                    <>
                                      {rs.imageid == "" ||
                                      rs.imageId == undefined ? null : (
                                        <img
                                          className="h-36 w-4/5 md:w-1/4 lg:w-1/4  z-[20] relative"
                                          src={
                                            menuItemsImg_CDN_Link + rs.imageId
                                          }
                                          alt="img"
                                        ></img>
                                      )}
                                      {!cartItems?.[id]?.[rs.id]
                                        ?.itemsQuantityInCart ? (
                                        <h1
                                          className="bg-green-50 z-[22] flex  justify-center items-center  text-center -mb-4 border-2 border-green-600 h-9 w-3/5 md:w-1/6 lg:w-1/6 rounded-sm absolute shadow-md hover:cursor-pointer text-black"
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
                                          className="bg-green-50 z-[22] flex shadow-md justify-evenly items-center text-center border-2 border-green-600 h-9 md:w-1/4 w-4/5 rounded-sm absolute text-black"
                                        >
                                          <button
                                            className="font-semibold z-[22] text-2xl"
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
                                            className="font-semibold z-[22]  text-2xl"
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
        <div className="w-screen z-40 flex justify-center content-center  items-center">
          <div className="w-3/4 lg:w-1/3  z-40 bg-white h-auto max-h-[50%] fixed bottom-16 overflow-scroll ">
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
        <div className="w-screen flex transition-all  items-center text-center scroll-smooth justify-center py-4 my-4 border-blue-800">
          <div className="bg-blue-100 container fixed w-11/12 bottom-4 z-50 lg:w-1/3">
            <h1 className="text-lg font-semibold my-2">
              Items already in cart
            </h1>
            <h1>
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
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
