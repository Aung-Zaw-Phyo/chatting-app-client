import React from "react";
import {Form, Link, json, redirect} from 'react-router-dom'
import Input from "../components/UI/Input";

const Signup = () => {
    return (
        <div className="bg-[url('./images/auth_bg.svg')] h-screen w-screen flex justify-center items-center bg-[#383f44]" >
            <div className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 p-3">
                <h1 className="text-[22px] mb-1 text-center font-bold">Sign Up</h1>
                <p className="text-center mb-6">Stay close to your favourite people.</p>
                <Form method="POST" className="mb-3">
                    <Input type='text' name='name' placeholder='Enter your name' focus={true} />
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <button className="w-full">SIGN IN</button>
                </Form>
                <p className="text-center"> Already have an account? <Link to='/login' className="text-[#ffbe33]">Sign in</Link> </p>
            </div>
        </div>
    );
};

export default Signup;

export const action = async ({request, params}) => {
    const data = await request.formData()
    const formData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password')
    }
    const response = await fetch('http://192.168.0.113:5000/chat/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    if(!response.ok) {
        const resData = await response.json()
        console.log(resData)
        return resData
    }

    const resData = await response.json()
    const user = resData.data.user
    localStorage.setItem('user', JSON.stringify(user))
    return redirect('/')
}
