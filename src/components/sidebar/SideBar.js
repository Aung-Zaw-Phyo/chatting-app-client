import React, { Suspense } from "react";
import {AiOutlineSearch } from 'react-icons/ai'
import { Await, NavLink, useLoaderData } from "react-router-dom";
import UserList from "./UserList";

const SideBar = () => {
    const loadedData = useLoaderData()
    return (
        <div className="md:w-4/12 xl:w-3/12 bg-[#303841] h-[100%]">
        <header className="p-5 sticky top-0  z-10 bg-[#303841df]">
            <h1 className="text-[22px] mb-5">Chats</h1>
            <div className="flex w-full">
                <span className="bg-[#36404A] h-[40px] flex justify-center items-center p-3 rounded-tl rounded-bl"><AiOutlineSearch size={20} /></span>
                <input type="text" className="h-[40px] bg-[#36404A] outline-none p-3 w-full rounded-tr rounded-br" placeholder="Search users"/>
            </div>
        </header>
        <section className="p-5 overflow-y-scroll no-scrollbar" style={{ height: 'calc(100vh - 140px)' }}>
            <div className="h-full">
                <Suspense fallback={<p className="py-3 text-center">Loading ...</p>}>
                    <Await resolve={loadedData.users}>
                        {(data) => <UserList users={data.data.users}/> }
                    </Await>
                </Suspense>
                
            </div>
        </section>
    </div>
    );
};

export default SideBar;
