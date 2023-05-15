import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Apping from "./src/bikerdude";
import Header from "./src/header";

import MovingImage from "./src/moveImg";
import MenuCard from "./src/menuCard";
import SignupForm from "./Authorization/src/Register";
import Login from "./Authorization/src/Login";
import LoginUsingOtp from "./Authorization/src/loginUsingOtp";
import Cart from "./src/cart";
import store from "./redux/store";
import OTP from "./Authorization/src/OTP";
import Body from "./src/body";
import LoadingScreen from "./src/Loading";
import PreviousOrderShimmer from "./src/previousOrderShimmer";
import BikeDude from "./src/bikerdude";
import App2 from "./src/trial";

const clientConfigs = {
  client_id:
    "899698031769-ndeoh4e02af6ee1qffqgecp23dbno64g.apps.googleusercontent.com",
};

export const UserContext = createContext();
const AppLayout = () => {
  const [pageColour, setPageColour] = useState("white");
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientConfigs.client_id}>
        <UserContext.Provider value={pageColour}>
          <Header setPageColour={setPageColour} pageColour={pageColour} />

          <Outlet />
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/movingImg",
        element: <MovingImage />,
      },

      {
        path: "/bikeDude",
        element: <BikeDude />,
      },
      {
        path: "/previousOrderShimer",
        element: <PreviousOrderShimmer />,
      },
      {
        path: "/loading",
        element: <LoadingScreen />,
      },
      {
        path: "/trial",
        element: <App2 />,
      },
      {
        path: "/apping",
        element: <Apping />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/login", element: <Login /> },
      { path: "/otpLogin/:id", element: <LoginUsingOtp /> },

      {
        path: "/menucard/:id",
        element: <MenuCard />,
      },
      { path: "/signUp", element: <SignupForm /> },
      { path: "/otp", element: <OTP /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
