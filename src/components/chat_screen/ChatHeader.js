import React from "react";

const ChatHeader = ({user}) => {
    return (
        <>
            <header className="p-5 sticky top-0 z-10 bg-[#262E35] border-b-[0.5px] border-b-gray-600">
                <div className="flex items-center">
                    <img className="w-[45px] h-[45px] rounded-full mr-3" src={user.image} alt="" />
                    <h1 className="text-[18px]">{user.name}</h1>
                </div>
            </header>
        </>
    );
};

export default ChatHeader;
