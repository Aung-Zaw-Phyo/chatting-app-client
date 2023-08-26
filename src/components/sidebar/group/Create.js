import React, { useState } from "react";
import { createPortal } from "react-dom";
import {BsSearch} from 'react-icons/bs'
import {CgClose} from 'react-icons/cg'
import Input from "../../UI/Input";
import Textarea from "../../UI/Textarea";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const Backdrop = ({onChange}) => {
    return (
      <div onClick={onChange} className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen bg-[#383f4493] z-40"/>
    )
}

const Modal = (props) => {  
    const {
        value: nameValue,
        changeHandler: nameChangeHandler,
    } = useInput( value => value.trim() !== '')
    const {
        value: descrptionValue,
        changeHandler: descrptionChangeHandler,
    } = useInput( value => true)
    const [members, setMembers] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const {
        isLoading: searchIsLoading,
        error: searchError,
        sendRequest: searchSendRequest
    } = useHttp()

    const {
        isLoading: createIsLoading,
        error: createError,
        sendRequest: createSendRequest
    } = useHttp()

    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault()

        if(createIsLoading) {
            return
        }

        const applyData = (data) => {
            if(data.status === true) {
                dispatch(uiActions.addGroup(data.data.group))
                props.onChange()
            }
        }
        createSendRequest({
            url: process.env.REACT_APP_API_URL + '/group/create',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {group_name: nameValue, description: descrptionValue, members: members}
        }, applyData)
    } 

    const searchMember = () => {
        if(searchInput.trim() === '' || searchIsLoading) {
            return
        }
        const email = searchInput.trim()
        let emailExists = false;
        for (const member of members) {
            if (member.email === email) {
                emailExists = true;
                break; 
            }
        }
        if(emailExists) {
            return
        }
        const applyData = (data) => {
            setMembers((prevState) => {
                const cp = [...prevState]
                return cp.concat(data.data.user)
            })
            setSearchInput('')
        }
        searchSendRequest({
            url: process.env.REACT_APP_API_URL + '/group/search/member',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {email: searchInput}
        }, applyData)
    }

    const removeMember = (email) => {
        setMembers(prevState => {
            const cp = [...prevState]
            const resultArr = cp.filter(member => member.email !== email)
            return resultArr
        })
    }

    return (
        <div className="fixed bg-[#272C3B] rounded-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[55%] xl:w-[40%] p-5 left-[50%] top-[50%] z-50" style={{ transform: 'translate(-50%, -50%)' }}>
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-[22px]">Crate New Group</h1>
                <CgClose onClick={props.onChange} size={25} className=" cursor-pointer text-[#ffffff76] hover:text-[white] duration-300"/>
            </div>
            <form onSubmit={submitHandler}>
                <div className="text-[red] text-center mb-3">{ createError }</div>
                <Input type='text' name='name' placeholder='Enter group name' className='w-[100%] h-[50px] border-[1px] border-[#ffffff88] !bg-[#2B3141]' 
                    value={nameValue} onChange={nameChangeHandler}
                />

                <div className="mb-3">
                    <div className="flex w-full">
                        <input type="text" name="members" placeholder="Enter member email" className=" block rounded-tl-lg rounded-bl-lg w-full h-[50px] p-2 outline-none border-[1px] border-[#ffffff88] border-r-0 bg-[#2B3141] text-white duration-300" 
                            value={searchInput} onChange={e => setSearchInput(e.target.value)}
                        />
                        <span onClick={searchMember} className={`${searchIsLoading && ' btn_disable '} bg-[#6159CB] cursor-pointer h-[50px] flex justify-center items-center p-3 px-4 rounded-tr-lg rounded-br-lg border-[1px] border-[#ffffff88]`}>
                            <BsSearch size={20} />
                        </span>
                    </div>
                    {searchError && <div className="m-0 py-0 px-2 text-[red]">{searchError}</div>}
                    {
                        members.length > 0 && (
                            <div className="mb-3 py-2 flex flex-wrap">
                                {
                                    members.map(member => (
                                        <div key={member.id} className="bg-[#36404A] p-2 px-3 rounded-lg m-1 cursor-pointer hover:bg-[red] duration-300"
                                            onClick={removeMember.bind(null, member.email)}
                                        >
                                            {member.name}
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <Textarea name='descrption' className='w-[100%] !bg-[#2B3141] border-[1px] border-[#ffffff88]' 
                    placeholder='Enter description'
                    value={descrptionValue} onChange={descrptionChangeHandler}
                />
                <button className="w-full h-[50px] mt-3 mx-auto">CONFIRM</button>
            </form>


            {/* footer */}
            <div className="">

            </div>
        </div>
    )
}

const portalElement = document.getElementById('create-group-chat')

const Create = (props) => {
    return (
        <>
            {
                createPortal(<Backdrop onChange={props.createFormChangeHandler}/>, portalElement)
            }
            {
                createPortal(<Modal onChange={props.createFormChangeHandler}/>, portalElement)
            }
        </>
    );
};

export default Create;
