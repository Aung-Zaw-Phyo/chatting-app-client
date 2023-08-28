import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import SendAction from "../UI/SendAction";
import { addGroupMessageRequest } from "../../../store/chat-actions";
import { getAuth } from "../../../utils/helper";
import { AiFillDelete } from "react-icons/ai";
import { groupActions } from "../../../store/group-slice";
import { privateActions } from "../../../store/private-slice";

const GroupMessage = (props) => {
    const [page, setPage] = useState(1)
    const chatFeedBottomRef = useRef(null);
    const chatFeedTopRef = useRef(null);
    const [scroll, setScroll] = useState(true)
    const dispatch = useDispatch()
    const chat = useSelector(state => state.group)
    const messages = useSelector(state => state.group.messages)
    const params = useParams()
    const id = params.id
    const totalItems = props.totalItems

    const userId = getAuth().id

    const scrollBottom = useCallback(() => {
        if(scroll === false) {
            if (chatFeedTopRef.current) {
                chatFeedTopRef.current.scrollIntoView();
            }
            return
        }

        if(chat.initial) {
            const el = document.getElementById('chat-feed');
            if (el) {
                el.scrollTop = el.scrollHeight;
            }
            // chatFeedTopRef.current.scrollTop = chatFeedTopRef.current.scrollHeight
        }else {
            if (chatFeedBottomRef.current) {
                chatFeedBottomRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [scroll, chat.initial])

    useEffect(() => {
        setTimeout(() => {
            scrollBottom()
        }, 50);
    }, [messages,scrollBottom])

    const sendMessage = (data) => {
        setScroll(true)
        dispatch(addGroupMessageRequest(data, id))
    }

    // delete message feature
    const {
        isLoading: deleteLoading,
        error: deleteError,
        sendRequest: deleteRequest
    } = useHttp()
    
    const deleteMessage = (msg_id) => {
        setScroll(false)
        const applyData = (data) => {
            const message = data.data.message
            dispatch(groupActions.deleteMessage(message))
        }
        deleteRequest({
            url: 'http://localhost:5000/chat/group/message/' + msg_id ,
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, applyData)
    }


    // paginate feature
    const {
        isLoading: paginateLoading,
        error: paginateError,
        sendRequest: paginateRequest
    } = useHttp()

    const scrollHandler = (event) => {
        if(totalItems === messages.length ) {
            return
        }else {
            const element = event.target;
            if (element.scrollTop < 30 && !paginateLoading ) {
                const pg = page + 1
                const applyData = (data) => {
                    const messages = data.data.messages
                    dispatch(privateActions.paginateMessage(messages))
                }
                setPage((prevState) => pg)
                paginateRequest({
                    url: 'http://localhost:5000/chat/private/' + id + '?page=' + pg,
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }, applyData)
            }
        }

    }

    return (
        <>
            <div className="p-5 overflow-y-auto no-scrollbar relative mt-0" id='chat-feed' style={{ height: 'calc(100vh - 190px)' }}
                ref={chatFeedTopRef} //onScroll={scrollHandler} 
            >

                {
                    paginateLoading && <div className="top-0 sticky text-center">loading ...</div>
                }
                {
                    messages && messages.map((msg, index) => (
                        <div key={msg.id} className={`${userId === msg.user.id ? ' items-end text-end ': ' items-start text-start '} d-inline-block flex flex-col mb-2 `}>
                            { msg.group.id === id  &&
                                <div className={`${userId !== msg.user.id ? ' text-start items-start ' : ' items-end '} relative group flex flex-col max-w-[75%]`}>
                                    {
                                        userId === msg.user.id &&
                                        <div className="
                                            absolute top-0 right-[100%] p-2  text-[#ffffff76]
                                            hover:text-[white] duration-300
                                        ">
                                            <AiFillDelete onClick={deleteMessage.bind(null, msg.id)} size={20} className="cursor-pointer translate-x-[140%] z-0 group-hover:translate-x-0 duration-300"/>
                                        </div>
                                    }

                                    {
                                        userId !== msg.user.id && <span className="text-[#dddddda1] text-[14px] p-1">{msg.user.name}</span>
                                    }
                                    {
                                        msg.image && <img src={msg.image} className="w-[160px] rounded-lg mb-1 z-10" alt="" />
                                    }
                                    {
                                        msg.text && <p className=" bg-[#36404A] rounded-lg py-2 p-2 z-10">{msg.text}</p>
                                    }
                                </div>
                            }
                        </div>
                    ))
                }
                {
                    chat.tempMsg && 
                    <div className="flex  items-end text-end">
                        <p className='mb-3 ms-auto max-w-[75%] text-end text-[#ffffff82] p-2' >{chat.tempMsg}</p>
                    </div>
                }   
                <div ref={chatFeedBottomRef} className="" ></div>
            </div>

            <SendAction onSendMessage={sendMessage} type='group' />
        </>
    );
};

export default GroupMessage;