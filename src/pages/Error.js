import React from "react";
import { useRouteError } from "react-router-dom";
import {BiSolidMessageRoundedError} from 'react-icons/bi'

const Error = () => {
    const error = useRouteError()
    console.log(error)
    let message = error.message || 'Something wrong.'
    if(error.status === 404) {
        message = error.message || 'Resource or Page not found.'
    }
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center p-4">
            <BiSolidMessageRoundedError size={100} className="mb-3 text-[red]"/>
            <h1 className="text-[30px] mb-3 text-[red]">{message}</h1>
        </div>
    );
};

export default Error;
