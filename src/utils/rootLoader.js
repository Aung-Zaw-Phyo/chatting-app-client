import Cookies from "js-cookie"
import { defer, json } from "react-router-dom"
import CryptoJS from "crypto-js";
const loader = async () => {
    const response = await fetch('http://localhost:5000/chat/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if(response.status === 401) {
        Cookies.remove('auth')
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = await response.json()
    return resData
}

export const usersLoader = () => {
    const encryptedBytes = Cookies.get('auth') 
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedBytes, process.env.REACT_APP_SECRET_KEY);
    const auth = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    if(!auth.id || !auth.email) {
        Cookies.remove('auth')
        throw new Error('Unauthenticated!')
    }
    return defer({
        data: loader(),
    })
}