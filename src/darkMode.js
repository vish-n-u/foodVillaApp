import { useState } from "react";
import { getWidth } from "./constants";

export function DarkMode({ setPageColour, pageColour }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="h-6 w-30 flex flex-col items-end   justify-end  overflow-hidden">
      {getWidth() > 1023 ? (
        <div className="flex ">
          <label class="inline-flex  relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled}
              readOnly
            />
            <div
              onClick={() => {
                setEnabled(!enabled);
                let colour = pageColour == "white" ? "black" : "white";
                setPageColour(colour);
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-400  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-500"
            ></div>
            <span className="ml-2 text-sm font-medium text-black">
              DarkMode
            </span>
          </label>
        </div>
      ) : (
        <div className=" hover:shadow-2xl shadow-black">
          <h1
            className="cursor-pointer  hover:shadow-2xl shadow-black "
            onClick={() => {
              setEnabled(!enabled);
              let colour = pageColour == "white" ? "black" : "white";
              setPageColour(colour);
            }}
          >
            {pageColour != "white" ? "☀️" : "🌕"}
          </h1>
        </div>
      )}
    </div>
  );
}
