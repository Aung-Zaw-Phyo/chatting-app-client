import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import {Form, Link, json, redirect, useActionData} from 'react-router-dom'
import Input from "../components/UI/Input";
import Cookies from "js-cookie";

const Login = () => {
    const [error, setError] = useState(null)

    const data = useActionData()
    useEffect(() => {
        if(data && data.status === false) {
            setError(data.message)
        }
    }, [data])

    return (
        <div className="bg-[url('./images/auth_bg.svg')] h-screen w-screen flex justify-center items-center bg-[#383f44]" >
            <div className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 p-3">
                <h1 className="text-[22px] mb-1 text-center font-bold">Sign In</h1>
                <p className="text-center mb-6">Stay close to your favourite people.</p>
                <div className="mb-3 text-[red] text-center text-[18px]">{error}</div>
                <Form method="POST" className="mb-3">
                    <Input type='email' name='email' placeholder='Enter your email' focus={true} />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <button className="w-full ">SIGN UP</button>
                </Form>
                <p className="text-center"> Don't have an account? <Link to='/signup' className="text-[#ffbe33] ml-1">Sign up</Link> </p>
            </div>
        </div>
    );
};

export default Login;

export const action = async ({request, params}) => {
    const data = await request.formData()
    const formData = {
        email: data.get('email'),
        password: data.get('password')
    }
    const response = await fetch('http://localhost:5000/chat/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if(response.status === 422) {
        const resData = await response.json()
        return resData
    }

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = await response.json()
    const user = resData.data.user
    let encode = CryptoJS.AES.encrypt(JSON.stringify({id: user.id, email: user.email, status: user.status}), process.env.REACT_APP_SECRET_KEY).toString();
    Cookies.set('auth', encode, {
        expires: 46 // 48 => 1 day
    }) 
    return redirect('/')
}