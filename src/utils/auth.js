import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export const authCheckLoader = () => {
    try {
        const encryptedBytes = Cookies.get('auth') 
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedBytes, process.env.REACT_APP_SECRET_KEY);
        const auth = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        return auth
    } catch (error) {
        Cookies.remove('auth')
        return redirect('/login')
    }
}

export const authFormLoader = () => {
    try {
        const encryptedBytes = Cookies.get('auth')
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedBytes, process.env.REACT_APP_SECRET_KEY);
        const auth = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        return redirect('/')
    } catch (error) {
        Cookies.remove('auth')
        return true
    }
}


export const logoutLoader = async () => {
    // const response = fetch(process.env.REACT_APP_API_URL + '/chat/logout', {
    //     method: 'POST',
    //     credentials: 'include'
    // })
    Cookies.remove('auth')
    return redirect('/login')
}
