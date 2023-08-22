import React, { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import SideNav from "./SideNav";
import Chat from "./chat/Chat";
import { useSelector } from "react-redux";
import Profile from "./profile/Profile";
import GroupChat from "./group/GroupChat";
import ComponentLoading from "../UI/ComponentLoading";
import ComponentError from "../UI/ComponentError";

const SideBar = () => {
    const ui = useSelector(state => state.ui)
    const loadedData = useRouteLoaderData('root')
    return ( 
        <div className="md:w-4/12 lg:w-3/12 bg-[#303841] h-[100%] flex">
            <SideNav/>       
            <div className="w-10/12 ">
                {
                    ui.chat &&
                    <Chat loadedData={loadedData}/>
                }
                                {
                    ui.profile &&
                    <Suspense fallback={<ComponentLoading/>}>
                        <Await resolve={loadedData.data} errorElement={<ComponentError/>}>
                            {(data) => <Profile data={data.data} />}
                        </Await>
                    </Suspense>
                }
                {
                    ui.group_chat &&
                    <Suspense fallback={<ComponentLoading/>}>
                        <Await resolve={loadedData.data} errorElement={<ComponentError/>}>
                            {(data) => <GroupChat data={data.data} />}
                        </Await>
                    </Suspense>
                }
            </div>
        </div>
    );
};

export default SideBar;
