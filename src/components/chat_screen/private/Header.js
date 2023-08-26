import React from "react";
import ShowSideBar from "../../UI/ShowSideBar";

const Header = ({user}) => {
    return (
        <>  
            <header className="p-5 flex justify-between items-center sticky top-0 z-10 bg-[#262E35] border-b-[0.5px] border-b-gray-600">
                <div className="flex items-center">
                    <img className="w-[45px] h-[45px] rounded-full mr-3" src={user.image} alt="" />
                    <h1 className="text-[18px]">{user.name}</h1>
                </div>
                <ShowSideBar/>
            </header>
        </>
    );
};

export default Header;
