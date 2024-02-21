import send_mp3 from '../assets/mp3/send.mp3'
import {
    getAuth
} from '../utils/helper'
import {
    groupActions
} from './group-slice'
import {
    privateActions
} from "./private-slice"

const send_noti = new Audio(send_mp3)

export const addPrivateMessageRequest = (data, id) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append('text', data.text)
        formData.append('image', data.image)

        if (data.text) {
            dispatch(privateActions.addTempMsg(data.text))
        }

        let url = process.env.REACT_APP_API_URL + '/chat/private/create/' + id;

        const sendRequest = async () => {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getAuth().token
                },
                body: formData
            })

            if (!response.ok) {
                throw response
            }
            return response
        }

        try {
            const response = await sendRequest()
            const resData = await response.json()
            dispatch(privateActions.addMessage(resData.data.message))
            send_noti.play().catch((error) => {
                console.log("Audio playback failed:", error);
            });
        } catch (error) {
            if (error.status === 422) {
                const resData = await error.json()
                dispatch(privateActions.setError(resData.message || 'Something wrong.'))
            } else {
                dispatch(privateActions.setError(error.message || 'Something wrong.'))
            }
        }
    }
}

export const addGroupMessageRequest = (data, id) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append('text', data.text)
        formData.append('image', data.image)

        if (data.text) {
            dispatch(groupActions.addTempMsg(data.text))
        }

        let url = process.env.REACT_APP_API_URL + '/chat/group/create/' + id;

        const sendRequest = async () => {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getAuth().token
                },
                body: formData
            })

            if (!response.ok) {
                throw response
            }
            return response
        }

        try {
            const response = await sendRequest()
            const resData = await response.json()
            dispatch(groupActions.addMessage(resData.data.message))
            send_noti.play().catch((error) => {
                console.log("Audio playback failed:", error);
            });
        } catch (error) {
            if (error.status === 422) {
                const resData = await error.json()
                dispatch(groupActions.setError(resData.message || 'Something wrong.'))
            } else {
                dispatch(groupActions.setError(error.message || 'Something wrong.'))
            }
        }
    }
}