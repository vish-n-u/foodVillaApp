import { Link } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux";

import { IsOnline } from "./utils/useIfOnline";
import UserContext from "./utils/userContext";

let online = <IsOnline />;
// console.log("---", IsOnline());
const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const { user, frusser } = useContext(UserContext);
  console.log(user, frusser);
  return (
    <div className="flex justify-between shadow-lg bg-fuchsia-100 w-screen">
      <img
        className="lg:h-36 lg:w-44 m-3 md:h-28 md:w-36 h-16 w-20"
        src="https://images-workbench.99static.com/xsIn-JPiXqWm4PaVeCGm7zz1Vn0=/99designs-contests-attachments/95/95490/attachment_95490984"
        alt="companyLogo"
      ></img>

      <div className="font-bold font-serif relative flex flex-col md:flex-row lg:flex-row">
        <span className="text-xl">rápidosh</span>

        <div>
          <ul className="flex justify-between m-0 md:mr-5 lg:mr-5">
            <li className="my-3 p-2">
              <Link to="/">Home</Link>
            </li>
            <li className="my-3 py-2">Contact</li>
            <li className="my-3 p-2">
              <Link to="/about">About</Link>
            </li>
            <li className="my-3 p-2">
              <Link to="/signUp">Signin</Link>
            </li>
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
