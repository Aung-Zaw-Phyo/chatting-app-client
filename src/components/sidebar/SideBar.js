import React, { Suspense, useEffect } from "react";
import { Await, useParams, useRouteLoaderData } from "react-router-dom";
import SideNav from "./SideNav";
import Chat from "./chat/Chat";
import { useSelector } from "react-redux";
import Profile from "./profile/Profile";
import GroupChat from "./group/GroupChat";
import ComponentLoading from "../UI/ComponentLoading";
import ComponentError from "../UI/ComponentError";

let isInitial = true
const SideBar = () => { 
    const ui = useSelector(state => state.ui)
    const loadedData = useRouteLoaderData('root')
    const params = useParams()
    const id = params.id

    let classes = ` ${ !ui.isSideBar  && ' -translate-x-full '}  w-full duration-300 z-30 md:translate-x-0 md:w-4/12 lg:w-3/12 bg-[#303841] h-[100%] flex `
    if(isInitial && !id) {
        classes = ` w-full duration-300 z-30 md:translate-x-0 md:w-4/12 lg:w-3/12 bg-[#303841] h-[100%] flex `
    }

    useEffect(() => {
        isInitial = false
    }, [])
    return ( 
        <div className={classes}>
            <SideNav/>       
            <div className="w-10/12 ">
                {
                    ui.chat &&
                    <Chat loadedData={loadedData} />
                }
                                {
                    ui.group_chat &&
                    <GroupChat loadedData={loadedData} />
                }
                {
                    ui.profile &&
                    <Suspense fallback={<ComponentLoading/>}>
                        <Await resolve={loadedData.data} errorElement={<ComponentError/>}>
                            {(data) => <Profile data={data.data} />}
                        </Await>
                    </Suspense>
                }
            </div>
        </div>
    );
};

export default SideBar;
