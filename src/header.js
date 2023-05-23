import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../redux/userNameSlice";

import { DarkMode } from "../src/darkMode";
import { authenticateUserAndGetData } from "../path.config";
import Cart from "./cart";

async function setUserData(Dispatch) {
  const isValidUser = await fetch(authenticateUserAndGetData, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken"),
    }),
    headers: { "content-type": "application/json" },
  });
  console.log("isValidUSer by header----,", isValidUser);

  if (isValidUser.status != 200) {
    localStorage.clear();
  } else {
    console.log("Meh");
    let validUserData = await isValidUser.json();
    console.log("validUserData by header----,", validUserData.message.userName);
    Dispatch(updateName(validUserData.message.userName));
  }
}
const Header = ({ setPageColour, pageColour }) => {
  const cartItems = useSelector((store) => store.cart.items);
  const userName = useSelector((store) => store.userName);
  const [isSigninClicked, setIsSigninClicked] = useState(false);
  const [isCartClicked, setIsCartClicked] = useState(false);
  const ref = useRef();
  const ref2 = useRef();
  const cartRef = useRef();
  const Dispatch = useDispatch();
  const cartRef2 = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    else {
      if (!userName || userName == undefined) {
        setUserData(Dispatch);
      } else {
        return;
      }
    }
  }, []);

  useEffect(() => {
    function listens(e) {
      if (ref2.current?.contains(e.target)) return;
      if (!ref.current?.contains(e.target)) {
        console.log("ref does not contain signin", isSigninClicked);
        if (isSigninClicked) setIsSigninClicked(false);
      } else {
        console.log("ref does contain signin", isSigninClicked);
        setIsSigninClicked(!isSigninClicked);
      }
    }

    document.addEventListener("mousedown", listens);

    return () => {
      document.removeEventListener("mousedown", listens);
    };
  });
  useEffect(() => {
    function listen(e) {
      if (cartRef2.current?.contains(e.target)) return;
      if (!cartRef.current?.contains(e.target)) {
        const threshold = 200; // adjust this to your liking
        // const shouldHideNow = window.scrollY > threshold;
        if (isCartClicked) setIsCartClicked(false);
      } else {
        setIsCartClicked(!isCartClicked);
      }
    }
    document.addEventListener("mousedown", listen);
    document.addEventListener("scroll", listen);
    return () => {
      document.removeEventListener("mousedown", listen);
      document.removeEventListener("scroll", listen);
    };
  });

  return (
    <>
      <div className="flex justify-between shadow-lg  text-black w-screen  lg:h-20">
        <Link
          to="/"
          className="flex flex-col align-middle justify-center items-center content-center py-2  lg:px-4"
        >
          <img
            className=" h-12 w-14  "
            src="data:image/jpeg;base64,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"
            alt="companyLogo"
          ></img>
          <h1 className="font-semibold ml-0 font-serif text-orange-800 text-lg">
            TigerFoods
          </h1>
        </Link>

        <div className="flex align-middle  items-center content-center justify-end  w-full ">
          <ul className="flex mr-5 lg:text-base font-semibold  m-0 md:mr-5 lg:mr-5">
            <li className="px-2 mx-2">
              <Link to="/">Home</Link>
            </li>

            <div
              ref={ref}
              className="px-2 mx-2 cursor-pointer"
              id="signInButton"
            >
              {userName || "Signin"}
              {isSigninClicked && (
                <div
                  ref={ref2}
                  className="fixed top-20 z-[100]  right-28 text-black lg:h-32 lg:w-60 bg-white flex justify-around items-center md:h-24 md:w-44 h-20 w-40"
                >
                  {!userName ? (
                    <>
                      {" "}
                      <li
                        className="z-10 cursor-pointer"
                        onClick={() => setIsSigninClicked(false)}
                      >
                        <Link to="/signUp">Register</Link>
                      </li>
                      <li
                        onClick={() => setIsSigninClicked(false)}
                        className="z-10 cursor-pointer"
                      >
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  ) : (
                    <li
                      className="z-10 cursor-pointer"
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload(false);
                      }}
                    >
                      {" "}
                      logout
                    </li>
                  )}
                </div>
              )}
            </div>
            <>
              <img
                src="https://freepngimg.com/thumb/categories/1325.png"
                ref={cartRef}
                onClick={() => console.log("is cartClicked", isCartClicked)}
                className="px-2 mx-2 h-6 w-12 cursor-pointer scale-x-[-1]"
              ></img>
              <h1 className="bg-orange-500 relative -top-2 -left-5 h-6 w-6 min-w-[24px] flex justify-center rounded-full text-end text-black">
                {Object.keys(cartItems) > 0
                  ? Object.keys(cartItems[Object.keys(cartItems)[0]]).length
                  : 0}
              </h1>
            </>
          </ul>
          <DarkMode setPageColour={setPageColour} pageColour={pageColour} />
        </div>
      </div>
      {isCartClicked ? (
        <div className="flex h-screen w-screen fixed  justify-end z-[100]">
          <div
            ref={cartRef2}
            className={` flex fixed justify-end mr-3   rounded-lg box-content ${
              Object.keys(cartItems).length == 0
                ? "lg:h-1/3 lg:w-1/5 h-1/3 w-1/2 bg-white border-2 border-black flex justify-center items-center"
                : "h-2/3 lg:w-[60%] md:w-1/2  w-3/4 "
            } `}
          >
            {Object.keys(cartItems).length != 0 ? (
              <Cart fromHeader={true} setIsCartClicked={setIsCartClicked} />
            ) : (
              <h1 className="text-lg ">Your cart is Empty cart</h1>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
