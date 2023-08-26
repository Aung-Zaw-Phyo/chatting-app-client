import React from "react";
import {TbUsersGroup, TbMessageStar} from 'react-icons/tb'
import {TiMessages} from 'react-icons/ti'
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useHttp from "../../hooks/use-http";

const UserDetail = ({data}) => {
    const navigate = useNavigate()

    const {
        isLoading: deleteIsLoading,
        error: deleteError,
        sendRequest: deleteSendRequest
    } = useHttp()

    const user = data.user
    const groups = data.groups
    const group_messages = data.group_messages
    const private_messages = data.private_messages

    const deleteAccountHandler = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this account ?",
            icon: "warning",
            dangerMode: true,
            confirmButtonText: 'Confirm'
        })
        .then(willDelete => {
            if (willDelete.isConfirmed) {
                const applyData = (data) => {
                    if(data.status === true) {
                        navigate('..')
                    }
                }
                deleteSendRequest({
                    url: process.env.REACT_APP_API_URL + '/admin/user/' + id,
                    method: 'DELETE',
                }, applyData)
            }
        }); 
    }


    return (
        <>
            <div className="mb-4">
                <Link to='..'><button>Back</button></Link>
            </div>
            <div className="flex flex-col justify-center items-center">
                <img className="w-[200px] h-[200px] rounded-full mb-4" src={user.image} alt="" />
                <h1 className="text-[28px]">{user.name}</h1>
                <div className="text-[24px]">{user.email}</div>
                <div className="text-center flex mt-5 text-[18px] mb-4"> 
                    <div className="bg-[#36404A] p-3 rounded-lg m-3 relative">
                        <div className="w-auto h-auto text-[14px] rounded-full flex justify-center items-center absolute top-[-20px] right-[-10px] bg-[red] p-1">{groups}</div>
                        <TbUsersGroup size={30}/>
                    </div>
                    <div className="bg-[#36404A] p-3 rounded-lg m-3 relative">
                        <div className="w-auto h-auto text-[14px] rounded-full flex justify-center items-center absolute top-[-20px] right-[-10px] bg-[red] p-1">{group_messages}</div>
                        <TiMessages size={30}/>
                    </div>
                    <div className="bg-[#36404A] p-3 rounded-lg m-3 relative">
                        <div className="w-auto h-auto text-[14px] rounded-full flex justify-center items-center absolute top-[-20px] right-[-10px] bg-[red] p-1">{private_messages}</div>
                        <TbMessageStar size={30}/>
                    </div>
                </div>
                <div className="">
                    <button onClick={deleteAccountHandler.bind(null, user.id)} className="p-3">DELETE ACCOUNT</button>
                </div>
            </div>
        </>
    );
};

export default UserDetail;
