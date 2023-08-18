import React from "react";
import {Link} from 'react-router-dom'
import Input from "../components/UI/Input";

const Login = () => {
    return (
        <div className="bg-[url('./images/auth_bg.svg')] h-screen w-screen flex justify-center items-center" >
            <div className="w-4/12 p-3">
                <h1 className="text-[22px] mb-1 text-center font-bold">Sign In</h1>
                <p className="text-center mb-6">Stay close to your favourite people.</p>
                <form className="mb-3">
                    <Input type='email' name='email' placeholder='Enter your email' focus='true' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <button className="w-full">SIGN UP</button>
                </form>
                <p className="text-center"> Don't have an account? <Link to='/signup' className="text-[#ffbe33]">Sign up</Link> </p>
            </div>
        </div>
    );
};

export default Login;
