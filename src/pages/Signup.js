import React from "react";
import {Link} from 'react-router-dom'
import Input from "../components/UI/Input";

const Signup = () => {
    return (
        <div className="bg-[url('./images/auth_bg.svg')] h-screen w-screen flex justify-center items-center" >
            <div className="w-4/12 p-3">
                <h1 className="text-[22px] mb-1 text-center font-bold">Sign Up</h1>
                <p className="text-center mb-6">Stay close to your favourite people.</p>
                <form className="mb-3">
                    <Input type='text' name='name' placeholder='Enter your name' focus='true' />
                    <Input type='email' name='email' placeholder='Enter your email' />
                    <Input type='password' name='password' placeholder='Enter your password' />
                    <button className="w-full">SIGN IN</button>
                </form>
                <p className="text-center"> Already have an account? <Link to='/login' className="text-[#ffbe33]">Sign in</Link> </p>
            </div>
        </div>
    );
};

export default Signup;
