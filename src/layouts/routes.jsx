import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import WebLayout from './WebLayout';
import Register from '../components/web/register/Register';
import Login from '../components/web/login/Login';
import WebHome from '../components/web/home/WebHome';
import WebCategories from '../components/web/categories/WebCategories';
import WebPageNotFound from '../components/web/pageNotFound/WebPageNotFound';
import AdminLayout from './AdminLayout';
import AdminHome from '../components/dashboard/home/AdminHome';
import AdminCategories from '../components/dashboard/categories/AdminCategories';
import AdminPageNotFound from '../components/dashboard/pageNotFound/AdminPageNotFound';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <WebLayout />,
        children: [
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'home',
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