import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import { HiUpload } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { uiActions } from "../../../store/ui-slice";
import { generateBase64FromImage } from "../../../utils/image";

const SendAction = (props) => {
    const [messageInput, setMessageInput] = useState('')
    const [fileInput, setFileInput] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const emojiElementRef = useRef()
    const emojiPickerRef = useRef()
    const fileInputRef = useRef()
    const emojiPicker = useSelector(state => state.ui.emojiPicker)
    const dispatch = useDispatch()
    const privateChat = useSelector(state => state.private)
    const groupChat = useSelector(state => state.group)
    let chat = privateChat
    if(props.type === 'group') {
        chat = groupChat
    }

    const sendMessageHandler = async () => {
        if(messageInput.trim() === '' && fileInput === null) {
            return
        }
        props.onSendMessage({text: messageInput, image: fileInput})
        setMessageInput('')
        setFileInput(null)
    }
    const onKeyDownInput = (event) => {
        if (event.key === 'Enter') {
            sendMessageHandler()
        }
    }

    //File 
    const filePicker = () => {
        fileInputRef.current.click()
    }
    const fileChangeHandler = (e) => {
        const imageFiles = e.target.files
        if(imageFiles && imageFiles[0]) {
            generateBase64FromImage(imageFiles[0])
            .then(b64 => {
                setFileInput(imageFiles[0])
                setImagePreview(b64)
            })
            .catch(e => {
                setFileInput(null)
            });
        }else {
            setFileInput(null)
        }
    }

    // Emoji
    const handleEmojiSelect = (e) => {
        setMessageInput(prevState => prevState + e.native)
    };
    const handleClickOutside = useCallback((event) => {
        if (emojiElementRef.current && !emojiElementRef.current.contains(event.target) && emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
            if(emojiPicker) {
                dispatch(uiActions.emojiPickerHandler('HIDE'))
            }
        }
    }, [dispatch,emojiPicker]);
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);
    const showPicker = () => {
        dispatch(uiActions.emojiPickerHandler('SHOW'))
    }

    return (
        <div className="p-5 py-8 border-t-[0.5px] border-t-gray-600 mt-auto flex w-full relative" >
            <div className="absolute bottom-[110%] left-[50%] -translate-x-1/2 text-[red] text-center text-[18px]">{chat.error}</div>
            <span onClick={filePicker} className="bg-[#36404A] h-[45px] w-[80px] flex justify-center items-center p-3 rounded-lg mr-1 cursor-pointer"> <HiUpload size={20}/> </span>
            <input 
                hidden
                type="file"
                ref={fileInputRef}
                onChange={fileChangeHandler}
            />
            <div className="absolute bottom-[80%]">
                { fileInput && <div className="bg-[#36404A] p-3 rounded-lg"><img src={imagePreview} className=" rounded-lg w-[110px] h-[110px] " alt="" /></div> }
            </div>

            <div className="absolute bottom-[80%]" ref={emojiElementRef}>
                {emojiPicker && <Picker data={data} onEmojiSelect={handleEmojiSelect} />}
            </div>
            <span ref={emojiPickerRef} onClick={showPicker} className="bg-[#36404A] relative z-50 h-[45px] w-[80px] flex justify-center items-center p-3 rounded-lg mx-1 cursor-pointer"><GrEmoji size={20} /></span>
            
            <input type="text" disabled={chat.isLoading ? true: false} className="h-[45px] w-full bg-[#36404A] outline-none p-3 rounded-lg mx-1" placeholder="Enter message"
                value={messageInput} onChange={ event => setMessageInput(event.target.value) }
                onKeyDown={onKeyDownInput} autoFocus
            />

            <span onClick={sendMessageHandler} 
                className={`${chat.isLoading ? ' bg-[#6159cb3a] ' : ' bg-[#6159CB] cursor-pointer '} h-[45px] w-[80px] flex justify-center items-center p-3 rounded-lg mx-1`}
            >
                <AiOutlineSend size={20} />
            </span>
        </div>
    );
};

export default SendAction;
