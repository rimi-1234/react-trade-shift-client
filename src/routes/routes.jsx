import { createBrowserRouter } from "react-router"
import MainLayout from "../Layouts/MainLayout/MainLayout"
import Home from "../Pages/Home/Home"
import AuthLayout from "../Layouts/AuthLayout/AuthLayout"
import Register from "../Pages/Register/Register"

import Login from "../Pages/Login/Login"

import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword"
import ErrorPages from "../Pages/ErrorPages/ErrorPages"

import AddExportProduct from "../Pages/AddExportProduct/AddExportProduct"
import PrivateRouter from "../Provider/PrivateRouter"
import AllProduct from "../Pages/AllProduct/AllProduct"


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
        path: "/add-export",
        element: <PrivateRouter><AddExportProduct></AddExportProduct></PrivateRouter>
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
    path: "*",
    element: <ErrorPages></ErrorPages>
  },





])

export default router
