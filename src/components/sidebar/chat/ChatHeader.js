import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const ChatHeader = () => {
    return (
        <header className="p-5 sticky top-0  z-10 bg-[#303841df]">
            <Link to='/'><h1 className="text-[22px] mb-5">Chats</h1></Link>
            <div className="flex w-full">
                <span className="bg-[#36404A] h-[40px] flex justify-center items-center p-3 rounded-tl-lg rounded-bl-lg"><AiOutlineSearch size={20} /></span>
                <input type="text" className="h-[40px] bg-[#36404A] outline-none p-3 w-full rounded-tr-lg rounded-br-lg" placeholder="Search users"/>
            </div>
        </header>
    );
};

export default ChatHeader;
