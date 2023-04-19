import React, { lazy, Suspense, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./src/header";
// import Body from "./src/body";
import UserContext from "./src/utils/userContext";
import { Footer } from "./src/footer";
import Home from "./src/homePage";
import MenuCard from "./src/menuCard";
import Trial from "./src/trial";
import SignupForm from "./Authorization/src/Register";
import Login from "./Authorization/src/Login";
import Count from "./src/count";
import LoginUsingOtp from "./Authorization/src/loginUsingOtp";
import Card from "./src/cart";
import Timer from "./src/Timer";
import store from "./redux/store";
import ShimmerUI from "./src/shimmerUI";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import About from "./src/about";
const clientConfigs = {
  client_id:
    "899698031769-ndeoh4e02af6ee1qffqgecp23dbno64g.apps.googleusercontent.com",
};

const About = lazy(() => import("./src/about"));
const Body = lazy(() => import("./src/body"));

const AppLayout = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientConfigs.client_id}>
        <Header />

        <Outlet />
        <Footer />
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
        element: (
          <Suspense>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Card />,
      },
      { path: "/count", element: <Count /> },
      { path: "/timer", element: <Timer /> },
      { path: "/login", element: <Login /> },
      { path: "/otpLogin/:id", element: <LoginUsingOtp /> },

      {
        path: "/about",
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
      },
      { path: "/trial", element: <Trial /> },
      {
        path: "/menucard/:id",
        element: <MenuCard />,
      },
      { path: "/trial", element: <Trial /> },
      { path: "/signUp", element: <SignupForm /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
