import { useState, useEffect } from "react";

export const IsOnline = () => {
  const [ifOnline, setIfOnline] = useState(1);
  console.log("listening...");
  const handleOnline = () => {
    // gets triggered whenever i am online
    console.log("online");
    setIfOnline(1);
  };
  const handleOffline = () => {
    // gets triggered when i go offline
    console.log("ofline", ifOnline);
    setIfOnline(0);
  };
  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

  return ifOnline;
};

function checkOnline(setIfOnline, ifOnline) {
  window.addEventListener("online", () => {
    // gets triggered whenever i am online
    console.log("online");
    setIfOnline(1);
  });
  window.addEventListener("offline", () => {
    // gets triggered when i go offline
    console.log("ofline", ifOnline);
    setIfOnline(0);
  });
}
// useEffect(() => {
//   checkOnline(setIfOnline, ifOnline);
// }, []);
