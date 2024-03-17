import React from "react";
import { Link, redirect, useLoaderData} from 'react-router-dom'
import { authFormLoader } from "../utils/auth";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const Verification = (searchParams) => {
    const data = useLoaderData()
    return (
        <div className="bg-[url('./images/auth_bg.svg')] h-screen w-screen flex justify-center items-center bg-[#383f44]" >
            <div className="w-11/12 sm:w-8/12 lg:w-6/12 p-3 text-center ">
                <h3 className="text-2xl mb-1">{data.message}</h3>
                <h5 className="text-xl mb-2">
                    {
                        data.status && <Link to='/' className="text-yellow-600 p-1 border-b-2 rounded-none border-yellow-600">Go Home</Link>
                    }
                    {
                        !data.status && <Link to='/login' className="text-yellow-600 p-1 border-b-2 rounded-none border-yellow-600">Go Login</Link>
                    }
                </h5>
            </div>
        </div>
    );
};

export default Verification;

export const loader = async ({request, params}) => {
    const key = params.code
    const response = await fetch(process.env.REACT_APP_API_URL + '/chat/verify/account', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({key})
    })

    if(response.status === 422) {
        const resData = await response.json()
        return resData;
    }

    if(!response.ok) {
        throw response
    }

    const resData = await response.json()
    const user = resData.data.user
    let encode = CryptoJS.AES.encrypt(JSON.stringify({
        id: user.id, 
        email: user.email, 
        status: user.status,
        token: resData.data.token
    }), process.env.REACT_APP_SECRET_KEY).toString();
    Cookies.set('auth', encode, {
        expires: 1
    })
    return resData
}