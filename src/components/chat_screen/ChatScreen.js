import React from "react";
import {GrEmoji} from 'react-icons/gr'
import {HiUpload} from 'react-icons/hi'
import {AiOutlineSend} from 'react-icons/ai'

const ChatScreen = () => {
    return (
        <div className="md:w-8/12 xl:w-9/12 h-[100%] flex flex-col">
        <header className="p-5 sticky top-0 z-10 border-b-[0.5px] border-b-gray-600">
            <div className="flex items-center">
                <img className="w-[45px] h-[45px] rounded-full mr-3" src="http://chatvia-dark.angular.themesbrand.com/assets/images/users/avatar-4.jpg" alt="" />
                <h1 className="text-[18px]">Mary Brown</h1>
            </div>
        </header>
        <div className="p-5 overflow-y-scroll no-scrollbar " style={{ height: 'calc(100vh - 85px)' }}>
                <p className="mb-16">lorem start</p>
                <p className="mb-16">lorem</p>
                <p className="mb-16">lorem</p>
                <p className="mb-16">lorem</p>
                <p className="mb-16">lorem</p>
                <p className="mb-16">lorem</p>
                <p className="mb-16">lorem</p>
                <p className="mb-16">lorem</p>
                <p className="mb-16">lorem hiihih</p>

        </div>
        <div className="p-5 py-8 border-t-[0.5px] border-t-gray-600 mt-auto  w-full flex">
            <span className="bg-[#36404A] h-[45px] w-[80px] flex justify-center items-center p-3 rounded mr-1 cursor-pointer"><GrEmoji size={20} /></span>
            <span className="bg-[#36404A] h-[45px] w-[80px] flex justify-center items-center p-3 rounded mx-1 cursor-pointer"><HiUpload size={20} /></span>
            <input type="text" className="h-[45px] w-full bg-[#36404A] outline-none p-3 rounded mx-1" placeholder="Enter message"/>
            <span className="bg-[#6159CB] h-[45px] w-[80px] flex justify-center items-center p-3 rounded mx-1 cursor-pointer"><AiOutlineSend size={20} /></span>
        </div>
    </div>
    );
};

export default ChatScreen;
