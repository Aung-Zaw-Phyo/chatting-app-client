import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BiMessageSquareDots} from 'react-icons/bi'
import {FiUser, FiUsers} from 'react-icons/fi'
import {MdLogout} from 'react-icons/md'
import Swal from "sweetalert2";  
import logo_img from '../../assets/images/logo.svg'
import { uiActions } from "../../store/ui-slice";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SideNav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ui = useSelector(state => state.ui)

    const navigateProfile = useCallback(() => {
        dispatch(uiActions.showProfile())
    }, [dispatch])

    const navigateChat = useCallback(() => {
        dispatch(uiActions.showChat())
    }, [dispatch])

    const navigateGroupChat = useCallback(() => {
        dispatch(uiActions.showGroupChat())
    }, [dispatch])

    useEffect(() => {
        const status = Cookies.get('status')
        if(status === 'PROFILE') {
            navigateProfile()
        }
        if(status === 'GROUPCHAT') {
            navigateGroupChat()
        }

        if(status === 'PROFILE' && status === 'GROUPCHAT') {
            navigateChat()
        }
    }, [navigateChat, navigateProfile, navigateGroupChat])
    
    const logoutHandler = () => {
        Swal.fire({
            title: "Are you sure you want to logout ?",
            icon: "warning",
            dangerMode: true,
            confirmButtonText: 'Confirm'
        })
        .then(willDelete => {
            if (willDelete.isConfirmed) {
                console.log('hit')
                navigate('/logout')
            }
        }); 
    }

    return ( // #7269EF
        <div className="w-2/12 bg-[#36404A] py-4 px-2 flex flex-col justify-between">
            <div className=" ">
                <Link to='/'><img src={logo_img} className="w-[80%] mx-auto" alt="" /></Link>
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
                <div onClick={logoutHandler} className="bg-[#3E4A56] group flex justify-center items-center h-[50px] rounded-lg mb-3 cursor-pointer">
                    <MdLogout size={20} className="group-hover:text-[yellow] duration-300"/>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
