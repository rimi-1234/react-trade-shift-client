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
import MyExport from "../Pages/MyExport/MyExport"
import ProductDetails from "../Pages/ProductDetails/ProductDetails"
import MyImports from "../Pages/MyImports/MyImports"
import Statistics from "../Pages/Dashboard/Common/Statistics"
import DashboardLayout from "../Layouts/DashboardLayout"
import Profile from "../Pages/Dashboard/Common/Profile"


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
      {
        path: "/my-exports",
        element: <PrivateRouter><MyExport></MyExport></PrivateRouter>
      },
      {
        path: "/my-imports",
        element: <PrivateRouter><MyImports></MyImports></PrivateRouter>
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
