import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import WebLayout from './layouts/WebLayout';
import Register from './components/web/register/Register';
import Login from './components/web/login/Login';
import WebHome from './components/web/home/WebHome';
import WebCategories from './components/web/categories/WebCategories';
import WebPageNotFound from './components/web/pageNotFound/WebPageNotFound';
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './components/dashboard/home/AdminHome';
import AdminCategories from './components/dashboard/categories/AdminCategories';
import AdminPageNotFound from './components/dashboard/pageNotFound/AdminPageNotFound';


function App() {
  const [user, setUser] = useState(null);

  const saveCurrentUser = () => {
    const token = localStorage.getItem("userToken");
    const decoded = jwtDecode(token);
    setUser(decoded);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken"))
      saveCurrentUser();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout user={user} setUser={setUser} />,
      children: [
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'login',
          element: <Login saveCurrentUser={saveCurrentUser} />
        },
        {
          index:true, //same as path: '/'
          element: <WebHome />
        },
        {
          path: 'categories',
          element: <WebCategories />
        },
        {
          path: '*',
          element: <WebPageNotFound />
        }
      ]
    },
    {
      path: "/dashboard",
      element: <AdminLayout />,
      children: [
        {
          path: 'home',
          element: <AdminHome />
        },
        {
          path: 'categories',
          element: <AdminCategories />
        },
        {
          path: '*',
          element: <AdminPageNotFound />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App