import React, { useCallback, useEffect, useRef, useState } from "react";
import ShowSideBar from "../../UI/ShowSideBar";
import { FiSettings } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { getAuth } from "../../../utils/helper";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const Header = ({group, onSideNavChange}) => {
    const [isSetting, setIsSetting] = useState(false)
    const settingRef = useRef()
    const iconRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isCreator = getAuth().id === group.creator.id
    const {
        isLoading: deleteIsLoading,
        error: deleteError,
        sendRequest: deleteSendRequest
    } = useHttp()

    const deleteGroupHandler = () => {
        Swal.fire({
            title: "Are you sure you want to delete this group ?",
            icon: "warning",
            dangerMode: true,
            confirmButtonText: 'Confirm'
        })
        .then(willDelete => {
            if (willDelete.isConfirmed) {
                const applyData = (data) => {
                    if(data.status === true) {
                        dispatch(uiActions.removeGroup(group.id))
                        navigate('/')
                    }
                }
                deleteSendRequest({
                    url: process.env.REACT_APP_API_URL + '/groups/' + group.id,
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + getAuth().token
                    }
                }, applyData)
            }
        }); 
    }

    const leaveGroupHandler = () => {
        Swal.fire({
            title: "Are you sure you want to leave from this group ?",
            icon: "warning",
            dangerMode: true,
            confirmButtonText: 'Confirm'
        })
        .then(willDelete => {
            if (willDelete.isConfirmed) {
                const applyData = (data) => {
                    if(data.status === true) {
                        dispatch(uiActions.removeGroup(group.id))
                        navigate('/')
                    }
                }
                deleteSendRequest({
                    url: process.env.REACT_APP_API_URL + `/groups/${group.id}/leave/`,
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + getAuth().token
                    }
                }, applyData)
            }
        }); 
    }

    const handleClickOutside = useCallback((event) => {
        if (settingRef.current && !settingRef.current.contains(event.target) && iconRef.current && !iconRef.current.contains(event.target)) {
            setIsSetting((prevState) => false)
        }
    }, []);


    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    const settingChangeHandler = () => {
        setIsSetting((prevState) => true)
    }

    return (
        <>  
            <header className="p-5 flex justify-between items-center sticky top-0 z-10 bg-[#262E35] border-b-[0.5px] border-b-gray-600">
                <div className="flex items-center">
                    <img className="w-[45px] h-[45px] rounded-full mr-3" src={group.image} alt="" />
                    <h1 className="text-[18px]">{group.name}</h1>
                </div>  
                <div className="relative flex items-center cursor-pointer text-[#ffffff76] hover:text-[white] duration-300 z-50">
                    <div ref={iconRef} ><FiSettings size={25} onClick={settingChangeHandler} /></div>
                    <div className={`
                        ${isSetting ? '  ' : ' hidden '} absolute shadow-lg left-[-100%] sm:left-[-170%] md:left-[-450%] top-[140%] sm:top-[20%] text-center rounded-lg text-[#fff]
                    `} ref={settingRef}>
                        <div className="relative group p-2 px-4 rounded-tr-lg rounded-tl-lg bg-[#3E4A56] hover:bg-[#7269EF] duration-200">
                            CREATOR

                            <div className=" 
                                hidden group-hover:flex items-center justify-end  shadow-lg
                                absolute min-w-[170px] sm:min-w-[230px] text-nowrap right-[110%] top-0 p-2 text-[14px] sm:text-[16px] text-[#fff] 
                                bg-[#7269EF] rounded-lg 
                            ">
                                {group.creator.name}
                                <img className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] rounded-full ml-2" src={group.creator.image} alt="" />
                            </div>    
                        </div>
                        <div className={`${!isCreator && ' rounded-br-lg rounded-bl-lg '} relative group p-2 px-4 bg-[#3E4A56] hover:bg-[#7269EF] duration-200`}>
                            MEMBERS
                            <div className=" 
                                hidden group-hover:block absolute right-[105%] sm:right-[110%] top-0
                            ">
                                {
                                    group.members.map(member => (
                                        <div key={member.id} className="
                                            flex items-center justify-end mb-1  shadow-lg
                                            min-w-[170px] sm:min-w-[230px]  p-2 text-[14px] sm:text-[16px] text-[#fff] 
                                            bg-[#7269EF] rounded-lg
                                    ">
                                            {member.name}
                                            <img className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] rounded-full ml-2" src={member.image} alt="" />
                                        </div>
                                    ))
                                }
                            </div> 
                        </div>
                        <div className=" p-2 px-4  bg-[#3E4A56] hover:bg-[#7269EF] duration-200"
                            onClick={leaveGroupHandler}
                        >
                            LEAVE
                        </div>

                        {
                            isCreator &&
                            <div  className=" p-2 px-4 rounded-br-lg rounded-bl-lg bg-[#3E4A56] hover:bg-[#7269EF] duration-200"
                                onClick={deleteGroupHandler}
                            >
                                DELETE
                            </div>
                        }
                    </div>

                    <ShowSideBar/>
                </div>
            </header>
        </>
    );
};

export default Header;
