import { useRef, useEffect, useState, useContext } from "react";
import { UserContext } from "../app";
import "../slideIn.css";
import "../buttonOpen.css";

function replaceVal(val) {
  let retur = val.replace(/[^a-zA-Z0-9]/g, "");
  // console.log("regexed val---", retur);
  return retur;
}

function scrollToSection(setIsMenuClicked) {
  if (setIsMenuClicked) setIsMenuClicked(false);
  {
    //console.log("event.target.hash", `${CSS.escape(event.target.hash)}`);
    event.preventDefault();

    const navbarHeight = document.querySelector("nav").offsetHeight;

    const section = document.querySelector(event.target.hash);
    console.log("h22s", section);
    const sectionTop = section.offsetTop - 300;
    // console.log("height diff",navbarHeight,section,sectionTop)
    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
}

const NavBar = ({
  filteredRestaurant,
  menuButton,
  isMenuClicked,
  setIsMenuClicked,
  changedByHandler,
}) => {
  const ref = useRef();
  const pageColour = useContext(UserContext);

  useEffect(() => {
    // let isMenuClicked = isMenuClicked;

    let handler = (e) => {
      console.log(
        "reached mouseDown",
        isMenuClicked,
        isMenuClicked && !ref?.current?.contains(e.target)
      );
      if (isMenuClicked && !ref?.current?.contains(e.target)) {
        console.log("navbar closed the menu");
        setIsMenuClicked(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`flex h-screen transition-all duration-500    ml-5 w-11/12 ${
        !menuButton ? "" : "h-full z-50 "
      }`}
    >
      <nav
        className={`flex flex-col   scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-medium  scrollbar-corner-white overflow-y-scroll lg:h-[50%]  rounded-2xl  container  shadow-2xl bg-gray-500 w-full   border-2 border-white items-center  ${
          pageColour == "white"
            ? "bg-black text-white  border-white"
            : "bg-white text-black border-black"
        } ${menuButton ? "h-full rounded-2xl " : "h-auto"}`}
      >
        {Object.keys(filteredRestaurant).map((rs) => {
          // console.log("reached", rs);
          return (
            <ul className="my-3">
              <li className="">
                <a
                  className="font-medium font-serif text-lg "
                  href={"#" + replaceVal(rs)}
                  onClick={(event) =>
                    menuButton
                      ? scrollToSection(setIsMenuClicked)
                      : scrollToSection()
                  }
                >
                  {rs == "undefined" ? "others" : rs}
                </a>
              </li>
            </ul>
          );
        })}
      </nav>
    </div>
  );
};

export default NavBar;
