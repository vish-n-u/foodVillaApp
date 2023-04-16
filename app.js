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
import SignupForm from "./src/signuUp";
import Count from "./src/count";
import MarkdownEditor from "./src/count";
import Card from "./src/cart";
import Timer from "./src/Timer";
import store from "./redux/store";
import ShimmerUI from "./src/shimmerUI";
// import About from "./src/about";

const About = lazy(() => import("./src/about"));
const Body = lazy(() => import("./src/body"));

const AppLayout = () => {
  const user = useContext(UserContext);
  const [users, setUsers] = useState({
    firstName: "AAA",
    email: "xyz@gmail.com",
  });
  return (
    <Provider store={store}>
      {console.log("userContext.provider=", UserContext.Provider)}

      <Header />
      <UserContext.Provider
        value={{
          ...user,
          user: {
            firstName: users.firstName,
            email: users.email,
          },
        }}
      >
        <Outlet />
        <Footer />
      </UserContext.Provider>
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
