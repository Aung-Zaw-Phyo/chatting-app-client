import React, { useEffect } from "react";
import { defer, json } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import ChatScreen from "../components/chat_screen/ChatScreen";
import { useDispatch } from "react-redux";
import { initSocket } from "../Socket";
import { getAuth } from "../utils/helper";
import Cookies from "js-cookie";

const Home = () => {
    const dispatch = useDispatch()

    // var in30Minutes = 1/48;
    // Cookies.set('foo', 'bar', {
    //     expires: in30Minutes
    // });
    console.log(Cookies.get('foo'))

    useEffect(() => {
        let socket = initSocket("http://localhost:5000");
        socket.emit('join-room', getAuth().id);
        return () => {
            socket.on('disconnect')
        }
    }, [dispatch]);

    return (
        <div className="flex h-screen w-screen ">
            <SideBar/>
            <ChatScreen/>
        </div>
    );
};

export default Home;

const chatLoader = async (params) => {
    const id = params.id
    if(!id) {
        const response = {message: 'Select Chat', status: 'INITIAL'}
        throw response
    }
    const response = await fetch('http://localhost:5000/chat/message/' + id, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = await response.json()
    return resData
}

export const loader = ({request, params}) => {
    return defer({
        chat: chatLoader(params)
    })
}