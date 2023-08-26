import React from "react";
import {  AiOutlineSearch } from "react-icons/ai";
import CloseSideBar from "../../UI/CloseSideBar";
import useHttp from "../../../hooks/use-http";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const ChatHeader = () => {
    const {
        isLoading,
        error,
        sendRequest
    } = useHttp()
    const dispatch = useDispatch()

    const searchUsers = (event) => {
        const search = event.target.value

        if(isLoading) {
            return
        }

        const applyData = (data) => {
            dispatch(uiActions.initUsers(data.data.users))
        }

        sendRequest({
            url: process.env.REACT_APP_API_URL + '/users/' + search,
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }, applyData)
    }
    return (
        <header className="p-5 sticky top-0  z-10 bg-[#303841df]">
            <div className="mb-5 flex justify-between items-center">
                <h1 className="text-[22px]">Chats</h1>
                <CloseSideBar/>
            </div>
            <div className="text-[red]">{error}</div>
            <div className="flex w-full">
                <span className="bg-[#36404A] h-[40px] flex justify-center items-center p-3 rounded-tl-lg rounded-bl-lg"><AiOutlineSearch size={20} /></span>
                <input type="text" className="h-[40px] bg-[#36404A] outline-none p-3 w-full rounded-tr-lg rounded-br-lg" placeholder="Search users"
                    onChange={searchUsers}
                />
            </div>
        </header>
    );
};

export default ChatHeader;
