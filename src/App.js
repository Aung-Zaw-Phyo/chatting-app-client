import React from "react";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css'
import Home, {loader as homeLoader} from "./pages/Home";
import Login, {action as loginAction} from "./pages/Login";
import Signup, {action as signupAction} from "./pages/Signup";
import { usersLoader } from './utils/rootLoader'
import Error from "./pages/Error";
import Root from "./pages/Root";
import {action as updateProfileAction} from './components/sidebar/profile/Profile'
import { authCheckLoader, authFormLoader, logoutLoader } from "./utils/auth";
import Dashboard, {loader as adminLoader} from "./pages/Dashboard";
import Detail, {loader as detailLoader} from "./pages/Detail";
 
const router = createBrowserRouter([
    {
        path: '',
        errorElement: <Error/>,
        loader: authCheckLoader,
        children: [
            {
                path: '',
                id: 'root',
                loader: usersLoader,
                element: <Root/>,
                children: [
                    {
                        index: true,
                        element: <Home/>, 
                        loader: homeLoader,
                        action: updateProfileAction
                    },
                    {
                        path: 'p/:id',
                        element: <Home chatType="private"/>,
                        loader: homeLoader,
                        action: updateProfileAction
                    },
                    {
                        path: 'g/:id',
                        element: <Home chatType="group"/>,
                        loader: homeLoader,
                        action: updateProfileAction
                    },
                ]
            },
            {
                path: '/admin',
                children: [
                    {
                        path: '/admin',
                        element: <Dashboard/>,
                        loader: adminLoader
                    },
                    {
                        path: 'detail/:id',
                        element: <Detail/>,
                        loader: detailLoader
                    }
                ]
            },
        ]
    },
    {
        path: '/login',
        errorElement: <Error/>,
        element: <Login/>,
        action: loginAction,
        loader: authFormLoader
    },
    {
        path:  '/signup',
        errorElement: <Error/>,
        element: <Signup/>, 
        action: signupAction,
        loader: authFormLoader
    },
    {
        path: '/logout',
        loader: logoutLoader
    }
])

const App = () => {
    return <RouterProvider router={router} />
};
export default App;


