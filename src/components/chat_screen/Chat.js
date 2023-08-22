import React, {  useEffect, } from "react";
import { getSocket } from "../../Socket";
import receive_mp3 from './../../assets/mp3/receive.mp3'
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat-slice";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";

const receive_noti = new Audio(receive_mp3)

const Chat = (props) => {
    const dispatch = useDispatch()
    const data = props.data
    const user = props.data.data.to_account

    useEffect(() => {
        const socket = getSocket()
        socket.on('receive-msg', data => {
            receive_noti.play().catch((error) => {
                console.log("Audio playback failed:", error);
            });
            dispatch(chatActions.addMessage(data))
        })
    }, [dispatch])

    useEffect(() => {
        dispatch(chatActions.chatInit(data.data.messages))
    }, [data, dispatch])

    return (
            <>
                <ChatHeader user={user}/>

                <ChatMessage totalItems={data.data.totalItems} />
            </>
    );
};

export default Chat;
