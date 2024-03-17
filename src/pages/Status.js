import React, { useEffect, useState } from "react";
import {Form, redirect, useActionData} from 'react-router-dom'
import { authFormLoader, isAuthenticated } from "../utils/auth";
import base64 from 'base-64'

const Status = (searchParams) => {
    const [error, setError] = useState(null)
    const queryParameters = new URLSearchParams(window.location.search)
    const email = base64.decode(queryParameters.get('hash'))
    const data = useActionData()
    useEffect(() => {
        if(data && data.status === false) {
            setError(data.message)
        }
    }, [data])
    return (
        <div className="bg-[url('./images/auth_bg.svg')] h-screen w-screen flex justify-center items-center bg-[#383f44]" >
            <div className="w-11/12 sm:w-8/12 lg:w-6/12 p-3 text-center ">
                <div className="mb-3 text-[red] text-center text-[18px]">{error}</div>
                <h3 className="text-xl mb-1">We sent account verification link to your mail address ({email})</h3>
                <h5 className="text-xl mb-2">Please verify that!</h5>
                <div className="text-lg mb-2 flex justify-center items-center gap-2">
                    <p>If you don't get our email, click</p> 
                    <Form method="POST">
                        <button className="p-0 bg-transparent text-yellow-600 hover:bg-transparent border-b-2 rounded-none border-yellow-600">RESEND</button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Status;

export const action = async ({request, params}) => {
    const queryParams = new URL(request.url).searchParams;
    const hashedEmail = queryParams.get('hash');
    let email = base64.decode(hashedEmail)
    const response = await fetch(process.env.REACT_APP_API_URL + '/chat/email/send', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    })
    if(response.status === 422) {
        const resData = await response.json()
        return resData
    }
    if(!response.ok) {
        throw response
    }
    const resDada = await response.json()
    return resDada
}

export const loader = async ({request, params}) => {
    const isNotAuthenticated = authFormLoader();
    const queryParams = new URL(request.url).searchParams;
    const hashedEmail = queryParams.get('hash');
    if(!hashedEmail || isNotAuthenticated !== true ){
        return redirect('/login')
    }
    let email;
    try {
        email = base64.decode(hashedEmail)
    } catch (error) {
        return redirect('/login')
    }
    const response = await fetch(process.env.REACT_APP_API_URL + '/chat/check/account', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    })
    if(!response.ok) {
        throw response
    }
    if(response.status !== 200) {
        return redirect('/login')
    }

    const resDada = await response.json()
    return resDada
}