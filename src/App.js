import React from "react";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css'
import Home, {loader as homeLoader} from "./pages/Home";
import Login, {action as loginAction} from "./pages/Login";
import Signup, {action as signupAction} from "./pages/Signup";

const router = createBrowserRouter([
    {
        path: '',
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
            {
                path: 'login',
                element: <Login/>,
                action: loginAction
            },
            {
                path:  'signup',
                element: <Signup/>, 
                action: signupAction
            }
        ]
    }
])

const App = () => {
    return <RouterProvider router={router} />
};
export default App;


