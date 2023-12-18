import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import WebLayout from './WebLayout';
import Register from '../components/web/auth/Register';
import Login from '../components/web/auth/Login';
import SendCode from '../components/web/auth/SendCode';
import ForgotPassword from '../components/web/auth/ForgotPassword';
import Profile from '../components/web/profile/Profile';
import UserInfo from '../components/web/profile/UserInfo';
import UserContact from '../components/web/profile/UserContact';
import Order from '../components/web/order/Order';
import WebHome from '../components/web/home/WebHome';
import WebCategories from '../components/web/categories/WebCategories';
import Cart from '../components/web/cart/Cart';
import CreateOrder from '../components/web/order/CreateOrder';
import CategoriesDetails from '../components/web/categories/CategoriesDetails';
import Product from '../components/web/products/Product';
import WebPageNotFound from '../components/web/pageNotFound/WebPageNotFound';
import AdminLayout from './AdminLayout';
import AdminHome from '../components/dashboard/home/AdminHome';
import AdminCategories from '../components/dashboard/categories/AdminCategories';
import AdminPageNotFound from '../components/dashboard/pageNotFound/AdminPageNotFound';
import ProtectedRoute from '../components/web/protectedRoute/ProtectedRoute';

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
                path: 'sendCode',
                element: <SendCode />
            },
            {
                path: 'forgotPassword',
                element: <ForgotPassword />
            },
            {
                path: 'profile',
                element:
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <UserInfo />
                    },
                    {
                        path: 'contact',
                        element: <UserContact />
                    },
                    {
                        path: 'order',
                        element: <Order />
                    }
                ]
            },
            {
                index: true, //same as path: '/'
                element: <WebHome />
            },
            {
                path: 'categories',
                element: <WebCategories />
            },
            {
                path: 'cart',
                element:
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
            },
            {
                path: 'createOrder',
                element:
                    <ProtectedRoute>
                        <CreateOrder />
                    </ProtectedRoute>
            },
            {
                path: 'products/category/:categoryId',
                element: <CategoriesDetails />
            },
            {
                path: 'product/:productId',
                element: <Product />
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