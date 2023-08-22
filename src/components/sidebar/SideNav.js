import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {BiMessageSquareDots} from 'react-icons/bi'
import {FiUser, FiUsers} from 'react-icons/fi'
import {MdLogout} from 'react-icons/md'
import logo_img from '../../assets/images/logo.svg'
import { uiActions } from "../../store/ui-slice";

const SideNav = () => {
    const dispatch = useDispatch()
    const ui = useSelector(state => state.ui)

    const navigateProfile = () => {
        dispatch(uiActions.showProfile())
    }
    const navigateChat = () => {
        dispatch(uiActions.showChat())
    }
    const navigateGroupChat = () => {
        dispatch(uiActions.showGroupChat())
    }

    return ( // #7269EF
        <div className="w-2/12 bg-[#36404A] py-4 px-2 flex flex-col justify-between">
            <div className=" ">
                <img src={logo_img} className="w-[80%] mx-auto" alt="" />
            </div>
            <div className="text-[#a6b0cf]">
                <div onClick={navigateProfile}
                    className={`${ui.profile && 'text-[#7269EF]'} bg-[#3E4A56] flex justify-center items-center h-[50px] rounded-lg mb-3 cursor-pointer`}
                >
                    <FiUser size={20}/>
                </div>

                <div onClick={navigateChat}
                    className={`${ui.chat && 'text-[#7269EF]'} bg-[#3E4A56] flex justify-center items-center h-[50px] rounded-lg mb-3 cursor-pointer`}
                >
                    <BiMessageSquareDots size={20}/>
                </div>

                <div onClick={navigateGroupChat}
                    className={`${ui.group_chat && 'text-[#7269EF]'} bg-[#3E4A56] flex justify-center items-center h-[50px] rounded-lg mb-3 cursor-pointer`}
                >
                    <FiUsers size={20}/>
                </div>
            </div>
            <div>
                <div className="bg-[#3E4A56] flex justify-center items-center h-[50px] rounded-lg mb-3 cursor-pointer">
                    <MdLogout size={20}/>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
