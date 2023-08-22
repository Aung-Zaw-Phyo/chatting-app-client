import React, { Suspense, useEffect, useState } from "react";

import { Await, useAsyncError, useLoaderData } from "react-router-dom";
import Chat from "./Chat";
import { FiMessageSquare } from "react-icons/fi";

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

const ChatScreen = () => {
    const loadedData = useLoaderData()
    return (
        <div className="md:w-8/12 lg:w-9/12 h-[100%] flex flex-col">
            <Suspense fallback={<div className="w-full h-full flex justify-center items-center">Loading</div>}>
                <Await resolve={loadedData.chat} errorElement={<Error/>}>
                    {(data) => <Chat data={data} /> }
                </Await>
            </Suspense>
        </div>
    );
};

export default ChatScreen;
