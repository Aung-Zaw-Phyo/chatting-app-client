import React from "react";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css'
import Home, {loader as homeLoader} from "./pages/Home";
import Login, {action as loginAction} from "./pages/Login";
import Signup, {action as signupAction} from "./pages/Signup";
import { usersLoader } from './utils/rootLoader'
import Error from "./pages/Error";
import Root from "./pages/Root";
import { authCheckLoader, authFormLoader } from "./utils/auth";
 
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
                        loader: homeLoader
                    },
                    {
                        path: '/:id',
                        element: <Home/>,
                        loader: homeLoader
                    },
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
    }
])

const App = () => {
    return <RouterProvider router={router} />
};
export default App;


