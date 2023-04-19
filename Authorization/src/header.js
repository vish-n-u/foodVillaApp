import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function getData(setVal, setUserName) {
  try {
    let tokens = localStorage.getItem("token");
    console.log(tokens);
    let data = await fetch(
      "https://cute-teal-pelican-tam.cyclic.app/socialMedia/api/v1/authUser",
      {
        method: "POST",
        body: JSON.stringify({ token: tokens }),
        mode: "cors",
        headers: { "content-type": "application/json" },
      }
    );
    let dataJson = await data.json();
    if (data.status == 200) {
      console.log("dataJson", dataJson);
      setVal(dataJson.message.imgLink);
      setUserName(dataJson.message.userName);
      return;
    } else {
      localStorage.removeItem("token");
      return;
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    return;
  }
}

const Header = () => {
  const [val, setVal] = useState(
    "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-5.jpg"
  );
  const [userName, setUserName] = useState("");
  let token = localStorage.getItem("token");
  
  console.log("token--", token);
  useEffect(() => {
    getData(setVal, setUserName);
  }, []);
  return (
    <div className="flex">
      <h1>Insta....</h1>
      {!token ? (
        <div>
          <Link to="/signup">
            <h1>{Register}</h1>
          </Link>
          <Link to="/login">
            <h1>Login</h1>
          </Link>
        </div>
      ) : null}
      <img className="w-32 h-32 rounded-full" src={val} alt="logo"></img>
      <Link to="/profile">
        <h1>Update profile</h1>
      </Link>
      <h1>{userName}</h1>
    </div>
  );
};

export default Header;
