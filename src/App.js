import React from "react";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { io } from "socket.io-client";
import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
    {
        path: '',
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path:  'signup',
                element: <Signup/>
            }
        ]
    }
])

const App = () => {
    return <RouterProvider router={router} />
};
export default App;


// const [time, setTime] = React.useState("fetching");
//     React.useEffect(() => {
//         const socket = io("http://localhost:8080");
//         socket.on("connect", () => console.log(socket.id));

//         socket.on("connect_error", () => {
//             setTimeout(() => socket.connect(), 5000);
//         });

//         socket.on("time", (data) => setTime(data));
//         socket.on("disconnect", () => setTime("server disconnected"));
//     }, []);
//     return (
//         <div className="App">{time}</div>
//     );