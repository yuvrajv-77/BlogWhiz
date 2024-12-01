import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from "react-router-dom";
import AuthContextProvider from './contexts/AuthContext';

import Home from './app/Home';
import RootLayout from './app/RootLayout';
import Blog from './app/Blog';
import Dashboard from './app/admin/Dashboard';
import Form from './app/admin/Form';
import ForgotPassword from './app/forgotPassword/ForgotPassword';
import NewPassword from './app/forgotPassword/NewPassword';
import ProtectedRoutes from './components/ProtectedRoutes';


function App(): React.ReactElement {

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/blog/:id",
            element: <Blog />
          },
          {
            
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/admin",
                children: [
                  {
                    path: "dashboard",
                    element: <Dashboard />,
                  },
                  {
                    path: "form",
                    element: <Form />,
                  }
                ],
              },
            ]
          },
          // {
          //   path: "register",
          //   element: <Register />,
          // },
          // {
          //   path: "login",
          //   element: <Login />,
          // },
         
          {
            path: "forgotpassword",
            element: <ForgotPassword />,
          },
          {
            path: "forgotpassword/setnewpassword",
            element: <NewPassword />,
          },

        ]
      },

      // {
      //   element: <ProtectedRoutes />,
      //   children: [
      //     {
      //       path: "/app",
      //       element: <Layout />,
      //     },
      //   ]
      // },
    ]
  )

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  )
}

export default App
