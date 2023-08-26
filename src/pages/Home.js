import React, { Suspense, useEffect, useState } from "react";
import { Await, defer, json, useAsyncError, useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiMessageSquare } from "react-icons/fi";
import { privateActions } from "../store/private-slice";
import { groupActions } from "../store/group-slice";
import { initSocket } from "../Socket";
import { getAuth } from "../utils/helper";
import SideBar from "../components/sidebar/SideBar";
import Private from "../components/chat_screen/private/Private";
import Group from "../components/chat_screen/group/Group";
import receive_mp3 from './../assets/mp3/receive.mp3'
import { uiActions } from "../store/ui-slice";

const receive_noti = new Audio(receive_mp3)

const Error = () => {
    const [initial, setInitial] = useState(false)
    const error = useAsyncError()

    useEffect(() => {
        if(error.status === 'INITIAL'){
            setInitial(true)
        }
    }, [error])

    const message = error.message || 'Something wrong.'

    return (
        <div className="flex justify-center items-center w-full h-full">
            {
                !initial && 
                <div className="text-[24px]">{message}</div>
            }
            {
                initial && 
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-[#7A7F9A] flex justify-center items-center w-[140px] h-[140px] mb-8 rounded-full">
                        <FiMessageSquare size={70} className=""/>
                    </div> 
                    <div className="bg-[#7A7F9A] py-2 px-3  rounded-2xl text-[20px]">Start Conversation</div>
                </div>
            }
        </div>
    )
}

const Home = ({ chatType }) => {
    const loadedData = useLoaderData()
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id

    useEffect(() => {
        let socket = initSocket("http://localhost:5000");
        socket.emit('join-room', getAuth().id);

        socket.on('receive-msg', data => {
            receive_noti.play().catch((error) => {
                console.log("Audio playback failed:", error);
            });
            if(data.type === 'PRIVATE') {
                dispatch(privateActions.addMessage(data.message))
            }
            if(data.type === 'GROUP') {
                dispatch(groupActions.addMessage(data.message))
            }
        })

        return () => {
            socket.on('disconnect')
        }
    }, [dispatch]);

    useEffect(() => {
        if(id) {
            dispatch(uiActions.sideBarChangeHandler(false))
            return
        }
        if(chatType === 'private' || chatType === 'group') {
            dispatch(uiActions.sideBarChangeHandler(false))
        }else {
            dispatch(uiActions.sideBarChangeHandler(true))
        }
    }, [chatType, dispatch, id])


    return (
        <div className="flex h-screen w-screen ">
            <SideBar />
            
            <div className="block left-0 right-0 bottom-0 fixed duration-300 md:relative md:w-8/12 lg:w-9/12 h-full md:flex flex-col">

                {chatType === "private" && (
                    <Suspense fallback={<div className="w-full h-full flex justify-center items-center">Loading</div>}>
                        <Await resolve={loadedData.chat} errorElement={<Error/>}>
                            {(data) => <Private data={data.data} /> }
                        </Await>
                    </Suspense>
                )}
                {chatType === "group" && (
                    <Suspense fallback={<div className="w-full h-full flex justify-center items-center">Loading</div>}>
                        <Await resolve={loadedData.chat} errorElement={<Error/>}>
                            {(data) => <Group data={data.data} /> }
                        </Await>
                    </Suspense>
                )}
                {
                    chatType !== "private" && chatType !== "group" && (
                        <div className=" w-full h-full flex flex-col items-center justify-center">
                            <div className="bg-[#7A7F9A] flex justify-center items-center w-[140px] h-[140px] mb-8 rounded-full">
                                <FiMessageSquare size={70} className=""/>
                            </div> 
                            <div className="bg-[#7A7F9A] py-2 px-3  rounded-2xl text-[20px]">Start Conversation</div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Home;

const chatLoader = async (request, params) => {
    const id = params.id
    if(!id) {
        const response = {message: 'Select Chat', status: 'INITIAL'}
        throw response
    }

    const originalUrl = request.url;
    const parsedUrl = new URL(originalUrl)
    const type = parsedUrl.pathname.split("/")[1];

    let url = process.env.REACT_APP_API_URL + '/private/' + id;
    if(type === 'g') {
        url = process.env.REACT_APP_API_URL + '/group/messages/' + id;
    }

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if(response.status === 401) {
        throw await response.json()
    }

    if(response.status === 403) {
        throw await response.json()
    }

    if(response.status === 404) {
        throw await response.json()
    }

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = await response.json()
    return resData
}

export const loader = ({request, params}) => {
    return defer({
        chat: chatLoader(request, params)
    })
}