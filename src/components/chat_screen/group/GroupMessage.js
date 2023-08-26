import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { chatActions } from "../../../store/chat-slice";
import SendAction from "../UI/SendAction";
import { addGroupMessageRequest } from "../../../store/chat-actions";
import { getAuth } from "../../../utils/helper";

const GroupMessage = (props) => {
    const [page, setPage] = useState(1)
    const chatFeedBottomRef = useRef(null);
    const chatFeedTopRef = useRef(null);
    const [pagination, setPagination] = useState(false)
    const dispatch = useDispatch()
    const chat = useSelector(state => state.group)
    const messages = useSelector(state => state.group.messages)
    const params = useParams()
    const id = params.id
    const totalItems = props.totalItems

    const userId = getAuth().id

    const scrollBottom = useCallback(() => {
        if(pagination === true) {
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
    }, [pagination, chat.initial])

    useEffect(() => {
        setTimeout(() => {
            scrollBottom()
        }, 50);
    }, [messages,scrollBottom])

    const sendMessage = (data) => {
        setPagination(false)
        dispatch(addGroupMessageRequest(data, id))
    }

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
                setPagination(true)
                const applyData = (data) => {
                    const messages = data.data.messages
                    dispatch(chatActions.paginateMessage(messages))
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
                                <>
                                    {
                                        userId !== msg.user.id && <span className="text-[#dddddda1] text-[14px] p-1">{msg.user.name}</span>
                                    }
                                    {
                                        msg.image && <img src={msg.image} className="w-[180px] rounded-lg mb-1" alt="" />
                                    }
                                    {
                                        msg.text && <p className="max-w-[75%] bg-[#36404A] rounded-lg py-3 p-2">{msg.text}</p>
                                    }
                                </>
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