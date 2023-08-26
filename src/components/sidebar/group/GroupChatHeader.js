import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import Create from "./Create";
import CloseSideBar from "../../UI/CloseSideBar";
import { useDispatch } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { uiActions } from "../../../store/ui-slice";

const GroupChatHeader = () => {
    const [isCreateForm, setIsCreateForm] = useState(false)
    const {
        isLoading,
        error,
        sendRequest
    } = useHttp()
    const dispatch = useDispatch()

    const searchGroups = (event) => {
        const search = event.target.value

        if(isLoading) {
            return
        }

        const applyData = (data) => {
            dispatch(uiActions.initGroups(data.data.groups))
        }

        sendRequest({
            url: process.env.REACT_APP_API_URL + '/group/' + search,
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            // body: {search: search}
        }, applyData)
    }

    const createFormChangeHandler = () => {
        setIsCreateForm((prevState) => !prevState)
    }
    return (
        <>
            {isCreateForm && <Create createFormChangeHandler={createFormChangeHandler} />}
            <header className="p-5 sticky top-0  z-10 bg-[#303841df]">
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center">
                        <FiUsers onClick={createFormChangeHandler} size={25} className="mr-3 md:hidden cursor-pointer"/>
                        <h1 className="text-[22px]">Group Chats</h1>
                    </div>
                    <CloseSideBar className=""/>
                    <FiUsers onClick={createFormChangeHandler} size={25} className=" hidden md:block cursor-pointer"/>
                </div>
                <div className="text-[red]">{error}</div>
                <div className="flex w-full">
                    <span className="bg-[#36404A] h-[40px] flex justify-center items-center p-3 rounded-tl-lg rounded-bl-lg"><AiOutlineSearch size={20} /></span>
                    <input type="text" className="h-[40px] bg-[#36404A] outline-none p-3 w-full rounded-tr-lg rounded-br-lg" placeholder="Search group"
                        onChange={searchGroups}
                    />
                </div>
            </header>
        </>
    );
};

export default GroupChatHeader;
