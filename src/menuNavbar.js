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
      className={`flex h-screen transition-all duration-500 w-11/12   ml-5 lg:w-full ${
        !menuButton ? "" : "h-full z-50 "
      }`}
    >
      <nav
        className={`flex flex-col  items-start  p-6      overflow-y-scroll lg:h-[50%]  rounded-2xl  container  shadow-2xl bg-white w-full   overflow-x-hidden border-white   ${
          pageColour == "white"
            ? "bg-black text-gray-700  border-white"
            : "bg-white text-black border-black"
        } ${menuButton ? "h-full rounded-md " : "h-auto"}`}
        style={{
          scrollbarColor: "#4A5568",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4A5568",
            borderRadius: "4px",
          },
        }}
      >
        {Object.keys(filteredRestaurant).map((rs) => {
          // console.log("reached", rs);
          return (
            filteredRestaurant[rs].length > 0 && (
              <ul key={rs} className="my-3  w-full ml-3">
                <a
                  className="flex w-full justify-between"
                  href={"#" + replaceVal(rs)}
                  onClick={(event) =>
                    menuButton
                      ? scrollToSection(setIsMenuClicked)
                      : scrollToSection()
                  }
                >
                  <a
                    href={"#" + replaceVal(rs)}
                    onClick={(event) =>
                      menuButton
                        ? scrollToSection(setIsMenuClicked)
                        : scrollToSection()
                    }
                    className="font-medium  text-sm "
                  >
                    {rs == "undefined" ? "others" : rs}
                  </a>
                  <a
                    href={"#" + replaceVal(rs)}
                    onClick={(event) =>
                      menuButton
                        ? scrollToSection(setIsMenuClicked)
                        : scrollToSection()
                    }
                    className="font-medium mr-3 text-sm"
                  >
                    {filteredRestaurant[rs].length}
                  </a>
                </a>
              </ul>
            )
          );
        })}
      </nav>
    </div>
  );
};

export default NavBar;
