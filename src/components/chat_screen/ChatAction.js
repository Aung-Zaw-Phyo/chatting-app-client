import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import { HiUpload } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { uiActions } from "../../store/ui-slice";
import { generateBase64FromImage } from "../../utils/image";
import { useParams } from "react-router-dom";

const ChatAction = (props) => {
    const [messageInput, setMessageInput] = useState('')
    const [fileInput, setFileInput] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const params = useParams()
    const id = params.id

    const emojiElementRef = useRef()
    const emojiPickerRef = useRef()
    const fileInputRef = useRef()
    const chat = useSelector(state => state.chat)
    const emojiPicker = useSelector(state => state.ui.emojiPicker)
    const dispatch = useDispatch()

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
        <div className="p-5 py-8 border-t-[0.5px] border-t-gray-600 mt-auto  w-full flex relative" >
            <span onClick={filePicker} className="bg-[#36404A] h-[45px] w-[80px] flex justify-center items-center p-3 rounded-lg mr-1 cursor-pointer"> <HiUpload size={20}/> </span>
            <input 
                hidden
                type="file"
                ref={fileInputRef}
                onChange={fileChangeHandler}
            />
            <div className="absolute bottom-[80%]">
                { fileInput && <img src={imagePreview} className=" rounded-lg w-[120px] h-[120px] bg-[#151617] p-3" alt="" /> }
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

export default ChatAction;
