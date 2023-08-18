import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { defer, json, useLoaderData, useParams } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import ChatScreen from "../components/chat_screen/ChatScreen";

let socket = io("http://192.168.0.113:5000");;
const Home = () => {
    const [msg, setMsg] = useState('')
    const [users, setUsers] = useState([])
    const [toAcc, setToAcc] = useState(null)
    const [time, setTime] = React.useState("fetching");

    const loadedData = useLoaderData()

    useEffect(() => {
        const fetchRequest = async () => {
            const response = await fetch('http://192.168.0.113:5000/chat/users')
            const resData = await response.json()
            setUsers(resData.data.users)
        }
        
        fetchRequest()
    }, [])

    useEffect(() => {
        socket.on("connect", () => console.log(socket.id));
        socket.emit('join-room', JSON.parse(localStorage.getItem('user')).email);

        socket.on("connect_error", () => {
            setTimeout(() => socket.connect(), 5000);
        });

        // socket.on("time", (data) => setTime(data));
        socket.on("disconnect", () => setTime("server disconnected"));
    }, []);

    useEffect(() => {
        socket.on('receive-msg', (data) => {
            console.log(data)
        })
    }, [msg])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!toAcc){
            alert('Select user.')
            return
        }
        socket.emit('send-msg', {message: msg, roomId: toAcc.email})
    }

    const direction = (user) => {
        setToAcc(user)
    }

    return (
        <div className="flex h-screen w-screen ">
            <SideBar/>
            <ChatScreen/>
        </div>
    );
};

export default Home;

const usersLoader = async () => {
    const response = await fetch('http://localhost:5000/chat/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = response.json()
    return resData
}

const messageLoader = async (params) => {
    const id = params.id
    const response = await fetch('http://localhost:5000/chat/message/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = response.json()
    return resData
}

export const loader = ({request, params}) => {
    return defer({
        users: usersLoader(),
        chat: messageLoader(params)
    })
}