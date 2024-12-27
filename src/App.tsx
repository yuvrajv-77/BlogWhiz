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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



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

  const queryClient = new QueryClient();

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
