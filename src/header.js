import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../redux/userNameSlice";
import RapidoshLogo from "./utils/RapidoshLogo.jpg";
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
            alt="companyLogo"
            src={RapidoshLogo}
          ></img>
          <h1 className="font-semibold ml-0 font-serif text-orange-800 text-lg">
            Rapidosh
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
              <h1 className="text-lg ">Your cart is Empty </h1>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
