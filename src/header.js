import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../redux/userNameSlice";
import { IsOnline } from "./utils/useIfOnline";
import { authenticateUserAndGetData } from "../Authorization/src/utils/constants";

let online = <IsOnline />;
// console.log("---", IsOnline());

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
const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const userName = useSelector((store) => store.userName);
  const [isSigninClicked, setIsSigninClicked] = useState(false);
  const ref = useRef();
  const Dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    else {
      // console.log("user in header", user);
      if (!userName || userName == undefined) {
        setUserData(Dispatch);
      } else {
        return;
      }
    }
  }, []);

  useEffect(() => {
    function listens(e) {
      if (!ref.current?.contains(e.target)) {
        setIsSigninClicked(false);
      }
    }
    document.addEventListener("mousedown", listens);
    return () => {
      document.removeEventListener("mousedown", listens);
    };
  });

  return (
    <div className="flex justify-between shadow-lg bg-fuchsia-100 w-screen lg:h-40">
      <img
        className="lg:h-36 lg:w-44 m-1 my-3 md:h-36 md:w-40 h-24 w-28 lg:px-4"
        src="https://images-workbench.99static.com/xsIn-JPiXqWm4PaVeCGm7zz1Vn0=/99designs-contests-attachments/95/95490/attachment_95490984"
        alt="companyLogo"
      ></img>

      <div className="font-bold font-serif items-center w-full  lg:justify-around lg:items-stretch relative flex flex-col">
        <span className="text-xl lg:w-1/2 w-full justify-center py-4 lg:p-0 flex lg:justify-end lg:my-10 lg:text-3xl">
          rápidosh
        </span>

        <div className="flex justify-end  w-full lg:mr-5">
          <ul className="flex lg:text-xl font-thin justify-between m-0 md:mr-5 lg:mr-5">
            <li className="my-3 p-2">
              <Link to="/">Home</Link>
            </li>
            {/* <li className="my-3 py-2">Contact</li>
            <li className="my-3 p-2">
              <Link to="/about">About</Link>
            </li> */}
            <div
              className="my-3 p-2"
              onClick={() => setIsSigninClicked(!isSigninClicked)}
            >
              {userName || "Signin"}
              {isSigninClicked && (
                <div
                  ref={ref}
                  className="fixed lg:top-36  right-5 lg:h-32 lg:w-60 bg-white flex justify-around items-center md:h-24 md:w-44 h-20 w-40"
                >
                  {!userName ? (
                    <>
                      {" "}
                      <li className="z-10">
                        <Link to="/signUp">Register</Link>
                      </li>
                      <li className="z-10">
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  ) : (
                    <li
                      className="z-10"
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

            <li className="my-3 p-2">
              <Link to="/cart">Cart-{Object.keys(cartItems).length}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
