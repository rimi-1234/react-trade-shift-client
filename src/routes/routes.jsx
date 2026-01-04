import { createBrowserRouter } from "react-router"
import MainLayout from "../Layouts/MainLayout/MainLayout"
import Home from "../Pages/Home/Home"
import AuthLayout from "../Layouts/AuthLayout/AuthLayout"
import Register from "../Pages/Register/Register"

import Login from "../Pages/Login/Login"

import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword"
import ErrorPages from "../Pages/ErrorPages/ErrorPages"


import PrivateRouter from "../Provider/PrivateRouter"
import AllProduct from "../Pages/AllProduct/AllProduct"
import MyExport from "../Pages/Dashboard/Trade/MyExport/MyExport"

import ProductDetails from "../Pages/ProductDetails/ProductDetails"
import MyImports from "../Pages/Dashboard/Trade/MyImports/MyImports"
import Statistics from "../Pages/Dashboard/Common/Statistics"
import DashboardLayout from "../Layouts/DashboardLayout"
import Profile from "../Pages/Dashboard/Common/Profile"
import About from "../Pages/About/About"
import Contact from "../Pages/Contact/Contact"
import MarketInsights from "../Pages/MarketInsights/MarketInsights"
import TradeRoute from "./TradeRoute"
import AddExportProduct from "../Pages/Dashboard/Trade/AddExportProduct/AddExportProduct"




const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,

    children: [
      {
        path: '/',
        Component: Home,

      },
      {
        path: '/all-products',
        Component: AllProduct,

      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/insights",
        element: <MarketInsights />,
      },
 
      {
        path: "/products-details/:id",
        element: (
          <PrivateRouter>
            <ProductDetails />
          </PrivateRouter>
        ),
      },


    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword ></ForgotPassword>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <Statistics />
          </PrivateRouter>
        ),
      },
           {
        path: "add-export",
        element: <TradeRoute><AddExportProduct></AddExportProduct></TradeRoute>
      },
      {
        path: "my-exports",
        element: <TradeRoute><MyExport></MyExport></TradeRoute>
      },
      {
        path: "my-imports",
        element: <TradeRoute><MyImports></MyImports></TradeRoute>
      },

      {
        path: 'profile',
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
      },


    ],
  },

  {
    path: "*",
    element: <ErrorPages></ErrorPages>
  },





])

export default router
