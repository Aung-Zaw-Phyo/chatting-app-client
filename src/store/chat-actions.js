import { chatActions } from "./chat-slice"
import send_mp3 from '../assets/mp3/send.mp3'

const send_noti = new Audio(send_mp3)
export const addMessageRequest = (data, id) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append('text', data.text)
        formData.append('image', data.image)

        if(data.text) {
            dispatch(chatActions.addTempMsg(data.text))
        }

        const sendRequest = async () => {
            const response = await fetch('http://localhost:5000/chat/message/create/' +id, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })

            if(!response.ok) {
                throw new Error('Sending Failed!')
            }
            return response
        }

        try {
            const response = await sendRequest()
            const resData = await response.json()
            console.log(resData)
            dispatch(chatActions.addMessage(resData.data.message))
            send_noti.play().catch((error) => {
                console.log("Audio playback failed:", error);
            });
        } catch (error) {
            console.log(error)
            dispatch(chatActions.setError(error.message || 'Something wrong.'))
        }
    } 
}